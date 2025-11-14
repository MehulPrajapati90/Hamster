"use client";

import { ChatVariants, useChatSidebarStore } from "@/modules/dashboard/store";
import { useConnectionState, useRemoteParticipant, useChat } from "@livekit/components-react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import ChatHeader, { ChatHeaderSkeleton } from "./chat-header";
import ChatForm, { ChatFormSkeleton } from "./chat-form";
import ChatList, { ChatListSkeleton } from "./chat-list";
import ChatCommunity from "./chat-community";

interface ChatProps {
    viewerName: string
    hostName: string
    hostIdentity: string
    isFollowing: boolean
    isChatEnabled: boolean
    isChatDelayed: boolean
    isChatFollowersOnly: boolean
}

const Chat = ({ hostIdentity, hostName, isChatDelayed, isChatEnabled, isChatFollowersOnly, isFollowing, viewerName }: ChatProps) => {
    const [value, setValue] = useState("");
    const matches = useMediaQuery('(max-width:1024px)')
    const { variant, onExpand } = useChatSidebarStore();
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;
    const { chatMessages: message, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    const reversedMessage = useMemo(() => {
        return message.sort((a, b) => (b.timestamp - a.timestamp))
    }, [message, value]);


    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }

    return (
        <div className="flex flex-col bg-transparent border border-b h-[calc(100vh-80px)] sticky right-0">
            <ChatHeader />
            {variant === ChatVariants.CHAT && (
                <>
                    <ChatList
                        messages={reversedMessage}
                        isHidden={isHidden}
                    />
                    <ChatForm
                        onSubmit={onSubmit}
                        onChange={onChange}
                        value={value}
                        isHidden={isHidden}
                        isfollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariants.COMMUNITY && (
                <>
                    <ChatCommunity
                        viewerName={viewerName}
                        hostName={hostName}
                        isHidden={isHidden}
                    />
                </>
            )}
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}

export default Chat;