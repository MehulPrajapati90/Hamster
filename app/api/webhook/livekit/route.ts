import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { client } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const reciver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headerPayload = await headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new NextResponse("No authorisation header", { status: 400 })
    }

    const event = await reciver.receive(body, authorization);

    if (event.event === "ingress_ended") {
        const ingressId = event?.ingressInfo?.ingressId;
        if (!ingressId) {
            return new NextResponse("No ingressId in event", { status: 400 });
        }
        await client.stream.updateMany({
            where: {
                ingressId: ingressId,
            },
            data: {
                isLive: false,
            },
        });
    }

    if (event.event === "ingress_started") {
        const ingressId = event?.ingressInfo?.ingressId;
        if (!ingressId) {
            return new NextResponse("No ingressId in event", { status: 400 });
        }
        await client.stream.updateMany({
            where: {
                ingressId: ingressId,
            },
            data: {
                isLive: true,
            },
        });
    }

    return new NextResponse("", { status: 200 });
}