import { User } from "@prisma/client"
import Link from "next/link"
import Thumbnail, { ThumbnailSkeleton } from "./thumbnail"
import VerifiedMark from "@/components/ui/verified-mark"
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsCardsProps {
    data: {
        id: string;
        updatedAt: Date;
        thumbnailUrl: string | null;
        isLive: boolean;
        name: string;
    } & { user: User }
};

const SearchResultCards = ({ data }: ResultsCardsProps) => {
    return (
        <Link href={`/${data.user.username}`} className="w-64 md:w-100">
            <div className="w-full flex flex-col md:flex-row gap-x-4">
                <div className="relative h-36 w-64">
                    <Thumbnail
                        src={data.thumbnailUrl!}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>

                <div className="space-y-1 hidden md:block">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                            {data.user.username}
                        </p>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-[12px] md:text-[13px] text-muted-foreground leading-2">{formatDistanceToNow(new Date(data.updatedAt), {
                        addSuffix: true
                    })}
                    </p>
                </div>

                <div className="space-y-1 block md:hidden px-1">
                    <div className="flex items-center justify-between gap-x-2">
                        <div className="flex items-center gap-1">
                            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                                {data.user.username}
                            </p>
                            <VerifiedMark />
                        </div>

                        <p className="text-[12px] md:text-[13px] text-muted-foreground leading-2">{formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true
                        })}
                        </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                </div>
            </div>
        </Link>
    )
}

export const SearchResultCardsSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-36 w-64">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}

export default SearchResultCards;