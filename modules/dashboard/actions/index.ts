"use server";

import { client } from "@/lib/db";
import { currentDbUser } from "@/modules/auth/actions";
import { Stream, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getSelfByUsername = async (username: string) => {
    const self = await currentDbUser();

    if (!self.success || !self.user?.username) {
        throw new Error("UnAuthorized!");
    }

    const user = await client.user.findUnique({
        where: { username: username }
    });

    if (!user) {
        throw new Error("User not found!");
    }


    if (!self.user.username || !user?.username) {
        throw new Error("UnAuthorized!");
    }

    return user;
};

export const getStreamByUserId = async (userId: string) => {
    const stream = await client.stream.findUnique({
        where: { userId: userId }
    });

    return stream;
}

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await currentDbUser();
        const selfStream = await client.stream.findUnique({
            where: { userId: self.user?.id }
        })

        if (!selfStream) {
            throw new Error("Stream not found!");
        }

        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        };

        const stream = await client.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        })

        // revalidatePath(`/u/${self.user?.username}/chat`);
        // revalidatePath(`/u/${self.user?.username}`);
        // revalidatePath(`/${self.user?.username}`);

        return stream;
    } catch {
        throw new Error("Internal Error!");
    }
}


export const updateUser = async (values: Partial<User>) => {
    try {
        const { user } = await currentDbUser();

        const validData = {
            bio: values.bio,
        };

        const updatedData = await client.user.update({
            where: {
                id: user?.id
            },
            data: {
                ...validData
            }
        })

        // revalidatePath(`/${user?.username}`);
        // revalidatePath(`/u/${user?.username}`);

        return user;
    } catch (e) {
        throw new Error("Internal Error");
    }
}

export const getBockedUser = async () => {
    try {
        const { user } = await currentDbUser();

        const blockedUser = await client.block.findMany({
            where: {
                blockerId: user?.id
            },
            include: {
                blocked: true
            }
        })

        return blockedUser;
    } catch (e) {
        throw new Error("Issue fetching");
    }
};

export const getStreamOfUser = async () => {
    const { user } = await currentDbUser();
    const stream = await client.stream.findUnique({
        where: { userId: user?.id }
    });

    if (user?.username) {
        revalidatePath(`/u/${user?.username}`);
    }

    return stream;
}