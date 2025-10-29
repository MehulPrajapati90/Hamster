"use client";

import { Button } from "@/components/ui/button";
import { onUnBlock } from "@/modules/browse/actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnBlockButtonProps {
    userId: string;
}

const UnBlockButton = ({ userId }: UnBlockButtonProps) => {
    const [isPending, startTrnasition] = useTransition();

    const onClick = () => {
        startTrnasition(() => {
            onUnBlock(userId)
                .then((data) => toast.success(`You have Unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <Button disabled={isPending} onClick={onClick} variant={"link"} size={"sm"} className="text-blue-500 w-full">
            Unblock
        </Button>
    )
}

export default UnBlockButton;