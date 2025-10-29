"use server";

import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const currentDbUser = async () => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "Unauthorized!"
        }
    }

    try {
        const dbUser = await client.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        if (!dbUser) {
            return {
                success: false,
                error: "User Not-found"
            }
        }

        return {
            success: true,
            user: dbUser,
            error: "fetched Successfully!"
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Fetch Error!"
        }
    }
}