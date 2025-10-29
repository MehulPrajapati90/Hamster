"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    }

    const filterParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[])

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debounceValue[0].toLowerCase())
        })
    }, [participants, debounceValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="flex-sm text-muted-foreground">
                    Community is disable
                </p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search Community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No Result
                </p>

                {filterParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name || ''}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}

export default ChatCommunity;