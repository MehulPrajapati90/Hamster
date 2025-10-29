import { resetIngress } from "@/actions/ingress";
import { client } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("No webhooks!");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return new NextResponse("Invalid signature", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        await client.user.create({
            data: {
                clerkId: payload.data.id,
                username: payload.data.username,
                imageUrl: payload.data.image_url,
                stream: {
                    create: {
                        name: `${payload.data.username}'s stream`,
                    }
                },
            },
        });
    }

    if (eventType === "user.updated") {
        await client.user.update({
            where: {
                clerkId: payload.data.id,
            },
            data: {
                username: payload.data.username,
                imageUrl: payload.data.image_url
            }
        })
    }

    if (eventType === "user.deleted") {
        await resetIngress(payload.data.id);
        await client.user.delete({
            where: {
                clerkId: payload.data.id,
            }
        })
    }


    return new NextResponse('', { status: 200 });
}