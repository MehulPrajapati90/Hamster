"use client";

import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from "@livekit/components-react";
import OfflineVideo from "./offline-video";
import LoadingState from "./loading-video";
import LiveVideo from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

const Video = ({ hostIdentity, hostName }: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />
    } else if (!participant || tracks.length === 0) {
        content = <LoadingState label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }

    return (
        <div className="aspect-video border-b group relative">
            {content}
        </div>
    )
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    )
}

export default Video;