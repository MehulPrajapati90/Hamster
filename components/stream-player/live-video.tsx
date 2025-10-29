"use client";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { useEffect, useRef, useState } from "react";
import FulScreenControl from "./full-screen";
import { useEventListener } from "usehooks-ts";
import VolumeControls from "./volume-controls";

interface LiveVideoProps {
    participant: Participant
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [volume, setVolume] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<Document>(document);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current)
            }
        })

    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen();
        }
    }

    const handleFullScreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement != null;
        setIsFullScreen(isCurrentlyFullScreen);
    }

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0;

        setVolume(isMuted ? 50 : 0);

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    useEffect(() => {
        onVolumeChange(0);
    }, [])

    useEventListener("fullscreenchange", handleFullScreenChange, documentRef);

    return (
        <div ref={wrapperRef} className="relative h-full flex">
            <video ref={videoRef} width="100%" />

            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-linear-to-r from-neutral-900 px-4">
                    <VolumeControls
                        onChange={onVolumeChange}
                        value={volume}
                        onToggle={toggleMute}
                    />
                    <FulScreenControl isFullScreen={isFullScreen} onToggle={toggleFullScreen} />
                </div>
            </div>
        </div>
    )
}

export default LiveVideo;