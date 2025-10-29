"use client";

import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { updateStream } from "../actions";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    field: FieldTypes;
    label: string;
    value: boolean;
}

const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
    const [ispending, startTransition] = useTransition();
    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat Settings updated"))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>

                <div className="space-y-2">
                    <Switch checked={value} onCheckedChange={onChange} disabled={ispending}>
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}

export default ToggleCard;