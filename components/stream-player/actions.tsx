"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnFollow } from "@/modules/browse/actions";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActiosnProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean
}

const Actions = ({ hostIdentity, isFollowing, isHost }: ActiosnProps) => {
    const user = useUser();
    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(hostIdentity)
                .then((data) => toast.success(`You have Unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const toggleFollow = () => {
        if (!userId) {
            return router.push('/sign-in');
        }

        if (isHost) return;

        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }

    return (
        <>
            {user?.isSignedIn ? (
                <Button disabled={isPending || isHost} onClick={toggleFollow} variant={"primary"} size={"sm"} className="w-full md:w-auto">
                    <Heart className={cn("h-4 w-4", isFollowing ? "fill-white" : "fill-none")} />
                    {isFollowing ? "Unfollow" : "follow"}
                </Button>
            ) : (
                <Button disabled={isPending || isHost} onClick={toggleFollow} variant={"primary"} size={"sm"} className="w-full md:w-auto">
                    <Heart className={cn("h-4 w-4", "fill-none")} />
                    {"follow"}
                </Button>
            )}
        </>
    )
}

export const ActionSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}

export default Actions;