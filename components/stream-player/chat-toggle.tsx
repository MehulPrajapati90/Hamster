"use client";

import { useChatSidebarStore } from "@/modules/dashboard/store";
import { PanelLeft, PanelRight } from "lucide-react";
import Hint from "../ui/hint";
import { Button } from "../ui/button";

const ChatToggle = () => {
    const { collapsed, onExpand, onCollapse } = useChatSidebarStore();

    const Icon = collapsed ? PanelLeft : PanelRight;

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    const label = collapsed ? "Expand" : "Collapse";

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

export default ChatToggle