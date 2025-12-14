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
    const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });
    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
};

export const createIngress = async (ingressType: IngressInput) => {
    const self = await currentDbUser();

    await resetIngress(self.user?.id!);

    const options: CreateIngressOptions = {
        name: self.user?.username,
        roomName: self.user?.id,
        participantName: self.user?.username,
        participantIdentity: self.user?.id!,
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

                return ingress;
            } catch (err) {
                lastError = err;

                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        }

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
