"use server";

import {
    IngressAudioEncodingPreset,
    IngressAudioOptions,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    IngressVideoOptions,
    RoomServiceClient,
    TrackSource,
    type CreateIngressOptions,
} from "livekit-server-sdk";

import { client } from "@/lib/db";
import { currentDbUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const resetIngress = async (hostIdentity: string) => {
    // Clean up any room belonging to this host
    const rooms = await roomService.listRooms([hostIdentity]);
    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    // Clean up any ingress associated with this host.
    // Using an unfiltered list + host-based filters ensures we delete stale entries
    // even if they were created with different options or without roomName set.
    const ingresses = await ingressClient.listIngress();
    const hostIngresses = ingresses.filter((ingress) =>
        ingress.roomName === hostIdentity ||
        ingress.participantIdentity === hostIdentity
    );

    for (const ingress of hostIngresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
};

export const createIngress = async (ingressType: IngressInput) => {
    const self = await currentDbUser();
    if (!self.success || !self.user?.id) {
        throw new Error("Unauthorized");
    }

    const hostId = self.user.id;

    await resetIngress(hostId);

    const options: CreateIngressOptions = {
        name: self.user?.username,
        roomName: hostId,
        participantName: self.user?.username,
        participantIdentity: hostId,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true;
    } else {
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: "preset",
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
        });

        options.audio = new IngressAudioOptions({
            encodingOptions: {
                case: "preset",
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
            },
        });
    }

    // const ingress = await ingressClient.createIngress(ingressType, options);

    // if (!ingress || !ingress.url || !ingress.streamKey) {
    //     throw new Error("Failed to create ingress!");
    // }

    async function createIngressWithRetry(
        retries: number,
        delayMs: number
    ) {
        let lastError;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const ingress = await ingressClient.createIngress(ingressType, options);

                // if (!ingress || !ingress.url || !ingress.streamKey) {
                //     throw new Error("Ingress created but missing url or streamKey");
                // }
                console.log(ingress);
                return ingress;
            } catch (err) {
                lastError = err;

                const message =
                    err instanceof Error ? err.message : typeof err === "string" ? err : "";
                if (message?.toLowerCase().includes("ingress object limit exceeded")) {
                    // Try another cleanup pass for this host before the next retry
                    await resetIngress(hostId);
                }

                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        }
        console.log(`Failed to create ingress after ${retries} attempts. Last error: ${lastError}`);
        throw new Error(
            `Failed to create ingress after ${retries} attempts. Last error: ${lastError}`
        );
    }


    const ingress = await createIngressWithRetry(
        10,      // retries
        1000    // delay in ms
    );

    await client.stream.update({
        where: { userId: self.user?.id },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
        },
    });

    // revalidatePath(`/u/${self.user?.username}/keys`);

    return {
        ingressId: ingress.ingressId,
        url: ingress.url,
        streamKey: ingress.streamKey,
    };
};
