"use server";

import { v4 as uuidV4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { currentDbUser } from "@/modules/auth/actions";
import { getUserById, isBlockedByUser } from "@/modules/browse/actions";

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await currentDbUser();
        if (!self.success) {
            throw new Error("/")
        }
    } catch {
        const id = uuidV4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if (!host) {
        throw new Error("User not found!");
    }

    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) {
        throw new Error("User Blocked!");
    }

    const isHost = self.user?.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            // @ts-ignore
            identity: isHost ? `host-${self.user?.id}` : self.user ? self.user?.id : self?.id,
            // @ts-ignore
            name: self.success ? self.user.username : self.username
        }
    )

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    })

    return await Promise.resolve(token.toJwt());
}