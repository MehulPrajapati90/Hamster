import { User } from "@prisma/client";
import Link from "next/link";
import Thumbnail, { ThumbnailSkeleton } from "./thumbnail";
import UserAvatar, { UserAvatarSkeleton } from "@/components/ui/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";

interface ResultsCardsProps {
    data: {
        user: User,
        isLive: boolean,
        name: string,
        thumbnailUrl: string | null
    }
}

const ResultsCards = async ({ data }: ResultsCardsProps) => {
    const currentuser = await currentUser();

    return (
        <Link href={currentuser?.username === data?.user?.username ? `/u/${data?.user?.username}` : `/${data.user.username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail
                    src={data?.thumbnailUrl!}
                    fallback={data.user?.imageUrl!}
                    isLive={data?.isLive}
                    username={data?.user?.username}
                />
                <div className="flex gap-x-3">
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />

                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibold hover:text-blue-500">
                            {data.name}
                        </p>
                        <p className="text-muted-foreground">
                            {data.user.username}
                        </p>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3 py-2">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    )
}

export default ResultsCards;