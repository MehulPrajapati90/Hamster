"use client";

import { ChatVariants, useChatSidebarStore } from "@/modules/dashboard/store";
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react";
import Hint from "../ui/hint";
import { Button } from "../ui/button";

const VariantToggle = () => {
    const { variant, onChangeVariants } = useChatSidebarStore();

    const isChat = variant === ChatVariants.CHAT;

    const Icon = isChat? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVariants.COMMUNITY : ChatVariants.CHAT;
        onChangeVariants(newVariant);
    }

    const label = isChat ? "Community" : "Go back to chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant={"ghost"}
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    )
}

export default VariantToggle;