import { useMemo } from "react";
import Hint from "../ui/hint";
import { Info } from "lucide-react";

interface ChatInfoProsp {
    isDelayed: boolean;
    isFollowerOnly: boolean;
}

const ChatInfo = ({ isDelayed, isFollowerOnly }: ChatInfoProsp) => {
    const hint = useMemo(() => {
        if (isFollowerOnly && isDelayed) {
            return "Only followers can Chat"
        }

        if (!isFollowerOnly && isDelayed) {
            return "Message are delayed by 3 seconds!"
        }

        if (isDelayed && isFollowerOnly) {
            return "Only followers can chat. Message are delayed by 3 seconds"
        }

        return "";
    }, [isDelayed, isFollowerOnly]);

    const label = useMemo(() => {
        if (isFollowerOnly && !isDelayed) {
            return "Followers only"
        }

        if (!isFollowerOnly && isDelayed) {
            return "Slow mode"
        }

        if (isDelayed && isFollowerOnly) {
            return "Followers only and slow mode"
        }

        return "";
    }, [isDelayed, isFollowerOnly]);
    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}

export default ChatInfo;