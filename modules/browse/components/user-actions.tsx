"use client";

import { Button } from "@/components/ui/button";
import { onBlock, onFollow, onUnBlock, onUnFollow } from "../actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface FollowActionsProps {
    isFollowing: boolean;
    isBlocked: boolean;
    userId: string;
}

const FollowActions = ({ isFollowing, userId, isBlocked }: FollowActionsProps) => {
    const [ispending, startTransitions] = useTransition();

    const HandleFollow = () => {
        startTransitions(() => {
            onFollow(userId).then(
                () => toast.success("Followed!")
            ).catch(
                () => toast.error("Something went wrong!")
            );
        })
    }

    const HandleUnFollow = () => {
        startTransitions(() => {
            onUnFollow(userId).then(
                () => toast.success("UnFollowed!")
            ).catch(
                () => toast.error("Something went wrong!")
            );
        })
    }

    const HandleUnBlock = () => {
        startTransitions(() => {
            onUnBlock(userId)
                .then(() => toast.success("UnBlocked"))
                .catch(() => toast.error("Something went wrong!"))
        })
    }

    const HandleBlock = () => {
        startTransitions(() => {
            onBlock(userId)
                .then(() => toast.success("Blocked"))
                .catch(() => toast.error("Something went wrong!"))
        })
    }

    const onClickFollow = () => {
        if (isFollowing) {
            HandleUnFollow();
        } else {
            HandleFollow();
        }
    }

    const onClickBlock = () => {
        if (isBlocked) {
            HandleUnBlock();
        } else {
            HandleBlock();
        }
    }

    return (
        <>
            <Button disabled={ispending} onClick={onClickFollow} variant={"default"}>
                {isFollowing ? "Unfollow" : "follow"}
            </Button>
            <Button disabled={ispending} onClick={onClickBlock} variant={"default"}>
                {isBlocked ? "UnBlock" : "Block"}
            </Button>
        </>
    )
}

export default FollowActions;