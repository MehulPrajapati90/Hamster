"use server";

import { client } from "@/lib/db";
import { currentDbUser } from "@/modules/auth/actions";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

export const getRecommended = async () => {
    let userId;
    try {
        const self = await currentDbUser();

        userId = self.user ? self.user?.id : null;
        let users = [];
        if (userId) {
            users = await client.user.findMany({
                where: {
                    AND: [
                        {
                            NOT: {
                                id: userId
                            }
                        },
                        {
                            NOT: {
                                followedBy: {
                                    some: {
                                        followerId: userId
                                    }
                                }
                            }
                        },
                        {
                            NOT: {
                                blocking: {
                                    some: {
                                        blockedId: userId
                                    }
                                }
                            }
                        }
                    ]
                },
                include: {
                    stream: {
                        select: {
                            isLive: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            users = await client.user.findMany({
                include: {
                    stream: {
                        select: {
                            isLive: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }


        return {
            success: true,
            recommend: users,
            message: "recommendation's fetched successfully!"
        }
    } catch (e) {
        return {
            success: false,
            error: "fetching Error!"
        }
    }
}

export const isFollowingUser = async (id: string) => {
    try {
        const self = await currentDbUser();

        const otherUser = await client.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not exist");
        }

        if (otherUser.id === self.user?.id) {
            throw new Error("Cannot follow Yourself");
        }

        const existingFollow = await client.follow.findFirst({
            where: {
                followerId: self.user?.id,
                followingId: otherUser.id
            }
        })

        return {
            success: !!existingFollow
        }

    } catch (e) {
        console.log(e);
        return {
            success: false,
        }
    }
}

export const getUserByUsername = async (username: string) => {
    const user = await client.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            clerkId: true,
            bio: true,
            imageUrl: true,
            username: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                    name: true
                }
            },
            _count: {
                select: {
                    followedBy: true
                }
            }
        }
    })

    return {
        success: true,
        user: user
    }
}

export const getUserById = async (id: string) => {
    const user = await client.user.findUnique({
        where: {
            id: id
        },
        include: {
            stream: true
        }
    })

    return user;
}

export const followUser = async (id: string) => {
    const self = await currentDbUser();

    const otherUser = await client.user.findUnique({
        where: { id }
    });

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.user?.id) {
        throw new Error("Cannot follow youself!")
    }

    const existingFollow = await client.follow.findFirst({
        where: {
            followerId: self.user?.id,
            followingId: otherUser.id
        }
    })

    if (existingFollow) {
        throw new Error("Already Following");
    }

    const follow = await client.follow.create({
        data: {
            followerId: self.user?.id || '',
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true
        }
    })

    return {
        success: follow
    }
}


export const unFollowUser = async (id: string) => {
    const self = await currentDbUser();

    const otherUser = await client.user.findUnique({
        where: { id }
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.user?.id) {
        throw new Error("Cannot unfollow youself!");
    }

    const existingFollow = await client.follow.findFirst({
        where: {
            followerId: self.user?.id,
            followingId: otherUser.id
        }
    })

    if (!existingFollow) {
        throw new Error("Not Following");
    }

    const follow = await client.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true,
        }
    })

    return {
        success: follow
    }
}

export const onFollow = async (userId: string) => {
    try {
        const { success } = await followUser(userId);

        revalidatePath("/");

        if (success) {
            revalidatePath(`/${success.following.username}`)
        }

        return success;

    } catch (e) {
        throw new Error("Internal Error!")
    }
}
export const onUnFollow = async (userId: string) => {
    try {
        const { success } = await unFollowUser(userId);

        revalidatePath("/");

        if (success) {
            revalidatePath(`/${success.following.username}`)
        }

        return success;
    } catch (e) {
        throw new Error("Internal Error!")
    }
}

export const getFollowedUsers = async () => {
    try {
        const self = await currentDbUser();

        if (!self.success) {
            return [];
        }
        const followedUsers = await client.follow.findMany({
            where: {
                followerId: self.user?.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.user?.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        })
        return followedUsers;
    } catch (e) {
        return [];
    }
}

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await currentDbUser();

        const otherUser = await client.user.findUnique({
            where: {
                id: id
            }
        })

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.user?.id) {
            return false
        }

        const existingBlock = await client.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockedId: self.user?.id || '',
                    blockerId: otherUser.id
                }
            }
        })

        return !!existingBlock

    } catch (e) {
        return false;
    }
}

export const blockUser = async (id: string) => {
    try {
        const self = await currentDbUser();

        if (self?.user?.id === id) {
            return false
        }

        const otherUser = await client.user.findUnique({
            where: {
                id: id
            }
        })

        if (!otherUser) {
            throw new Error("User not found");
        }

        const existingBlock = await client.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: self.user?.id || '',
                    blockedId: otherUser.id || ''
                }
            }
        })

        if (existingBlock) {
            throw new Error("Already blocked");
        }

        const block = await client.block.create({
            data: {
                blockerId: self.user?.id || '',
                blockedId: otherUser.id || ''
            },
            include: {
                blocked: true
            }
        })

        return block

    } catch (e) {
        throw new Error("block failed");
    }
}


export const unblockUser = async (id: string) => {
    try {
        const self = await currentDbUser();

        if (self?.user?.id === id) {
            throw new Error("Cannot unblock yourself")
        }

        const otherUser = await client.user.findUnique({
            where: {
                id: id
            }
        })

        if (!otherUser) {
            throw new Error("User not found");
        }

        const existingBlock = await client.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: self.user?.id || '',
                    blockedId: otherUser.id
                }
            }
        })

        if (!existingBlock) {
            throw new Error("Not blocked");
        }

        const unblock = await client.block.delete({
            where: {
                id: existingBlock?.id
            },
            include: {
                blocked: true
            }
        })

        return unblock;

    } catch (e) {
        throw new Error("Unblock failed");
    }
}

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    const { user } = await currentDbUser();

    let blockedUser;

    try {
        blockedUser = await blockUser(id);
    } catch {
        // This means user is a guest!
    }

    try {
        await roomService.removeParticipant(user?.id!, id)
    } catch {
        // This means user is not in the room!
    }

    revalidatePath(`/u/${user?.username}/community`);

    return blockedUser;
}

export const onUnBlock = async (id: string) => {
    const { user } = await currentDbUser();
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/u/${user?.username}/community`)

    return unblockedUser;
}

// Feed Service

export const getStreams = async () => {
    let userId;

    try {
        const { user } = await currentDbUser();
        userId = user?.id;
    } catch {
        userId = null;
    }

    let streams = [];

    if (userId) {
        streams = await client.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                name: true,
                isLive: true,
                thumbnailUrl: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    } else {
        streams = await client.stream.findMany({
            select: {
                id: true,
                user: true,
                name: true,
                isLive: true,
                thumbnailUrl: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    }

    return streams;
}


// Search Service

export const getSearch = async (term: string) => {
    let userId;
    try {
        const { user } = await currentDbUser();
        if (user?.id) {
            userId = user?.id;
        } else {
            userId = null
        }

        let streams = [];

        if (userId) {
            streams = await client.stream.findMany({
                where: {
                    user: {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId,
                                }
                            }
                        }
                    },
                    OR: [
                        {
                            name: {
                                contains: term
                            }
                        },
                        {
                            user: {
                                username: {
                                    contains: term
                                }
                            }
                        }
                    ]
                },
                select: {
                    user: true,
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    updatedAt: true
                },
                orderBy: [
                    {
                        isLive: "desc"
                    },
                    {
                        updatedAt: "desc"
                    }
                ]
            })
        } else {
            streams = await client.stream.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: term
                            }
                        },
                        {
                            user: {
                                username: {
                                    contains: term
                                }
                            }
                        }
                    ]
                },
                select: {
                    user: true,
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    updatedAt: true
                },
                orderBy: [
                    {
                        isLive: "desc"
                    },
                    {
                        updatedAt: "desc"
                    }
                ]
            })
        }

        return streams;

    } catch (e) {
        throw new Error("Search Error")
    }
}
