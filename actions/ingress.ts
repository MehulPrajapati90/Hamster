"use server";

import {
    IngressAudioEncodingPreset,
    IngressAudioOptions,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    IngressVideoOptions,
    TrackSource,
    type CreateIngressOptions,
} from "livekit-server-sdk";

import { client } from "@/lib/db";
import { currentDbUser } from "@/modules/auth/actions";

const ingressClient = new IngressClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export const createIngress = async (ingressType: IngressInput) => {
    const self = await currentDbUser();
    if (!self.success || !self.user?.id) {
        throw new Error("Unauthorized");
    }

    const hostId = self.user.id;

    /* ---------------------------------------------
       1️⃣ RETURN EXISTING INGRESS (IDEMPOTENT)
    ---------------------------------------------- */
    const existing = await client.stream.findUnique({
        where: { userId: hostId },
    });

    if (existing?.ingressId && existing?.serverUrl && existing?.streamKey) {
        return {
            ingressId: existing.ingressId,
            url: existing.serverUrl,
            streamKey: existing.streamKey,
        };
    }

    /* ---------------------------------------------
       2️⃣ BUILD OPTIONS
    ---------------------------------------------- */
    const options: CreateIngressOptions = {
        name: self.user.username,
        roomName: hostId,
        participantName: self.user.username,
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

    /* ---------------------------------------------
       3️⃣ CREATE INGRESS (ONCE)
    ---------------------------------------------- */
    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress?.ingressId || !ingress?.url || !ingress?.streamKey) {
        throw new Error("Ingress creation failed");
    }

    /* ---------------------------------------------
       4️⃣ SAVE IMMEDIATELY (ATOMIC SOURCE OF TRUTH)
    ---------------------------------------------- */
    await client.stream.update({
        where: { userId: hostId },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
        },
    });

    return {
        ingressId: ingress.ingressId,
        url: ingress.url,
        streamKey: ingress.streamKey,
    };
};
