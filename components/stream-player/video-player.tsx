"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video";
import { useChatSidebarStore } from "@/modules/dashboard/store";
import { cn } from "@/lib/utils";
import Chat, { ChatSkeleton } from "./chat";
import ChatToggle from "./chat-toggle";
import Header, { HeaderSkeleton } from "./header";
import InfoCard from "./info-card";
import AboutCard from "./about-card";

type CustomStream = {
    id: string;
    isLive: boolean;
    isChatDelayed: boolean;
    isChatEnabled: boolean;
    isChatFollowersOnly: boolean;
    thumbnailUrl: string | null;
    name: string;
}

type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    imageUrl: string;
    _count: { followedBy: number }
}

interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean
}

const StreamPlayer = ({ stream, user, isFollowing }: StreamPlayerProps) => {
    const { identity, name, token } = useViewerToken(user.id);
    const { collapsed } = useChatSidebarStore();

    console.log(name, token, identity)

    if (!name || !token || !identity) {
        return (
            <StreamPlayerSkeleton />
        )
    }

    return (

        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}

            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "flex h-full",

                    // collapsed → video full width, hide chat
                    collapsed && "lg:flex-col",

                    // default → side-by-side layout on large screens
                    !collapsed && "lg:flex-row"
                )}
            >
                {/* LEFT SIDE — VIDEO + INFO */}
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto hide-scrollbar pb-10">
                    <Video hostName={user.username} hostIdentity={user.id} />

                    <Header
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />

                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />

                    <AboutCard
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.followedBy}
                    />
                </div>

                {/* RIGHT SIDE — CHAT */}
                <div
                    className={cn(
                        "hidden lg:block overflow-y-auto hide-scrollbar",
                        !collapsed && "w-[350px] xl:w-[380px] 2xl:w-[420px]" // fixed chat width
                    )}
                >
                    {!collapsed && (
                        <Chat
                            viewerName={name}
                            hostName={user.username}
                            hostIdentity={user.id}
                            isFollowing={isFollowing}
                            isChatEnabled={stream.isChatEnabled}
                            isChatDelayed={stream.isChatDelayed}
                            isChatFollowersOnly={stream.isChatFollowersOnly}
                        />
                    )}
                </div>
            </LiveKitRoom>
        </>

    )
}


export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">

            {/* Left section */}
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden lg:block pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>

            {/* Chat section */}
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}

export default StreamPlayer;