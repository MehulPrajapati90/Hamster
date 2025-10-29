"use client";

import { usePathname } from "next/navigation";
import { useSidebarStore } from "../store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/ui/user-avatar";
import Link from "next/link";
import LiveBadge from "./live-badge";
import { Skeleton } from "@/components/ui/skeleton";


interface UserItemProps {
    username: string;
    imageUrl: string;
    isLive?: boolean
}

const UserItem = ({ imageUrl, username, isLive }: UserItemProps) => {
    const pathname = usePathname();
    const { collapsed } = useSidebarStore((state) => state);

    const href = `/${username}`;
    const isActive = pathname === href;
    return (
        <Button asChild variant={"ghost"} className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}>
            <Link href={href}>
                <div className={cn(
                    "flex items-center w-full gap-x-4", collapsed && "justify-center",
                )}>
                    <UserAvatar
                        username={username}
                        imageUrl={imageUrl}
                        isLive={isLive}
                    />
                    {!collapsed && (
                        <p className="truncate">
                            {username}
                        </p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge className="ml-auto" />
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-0 lg:gap-x-2 px-[10.8px] py-2">
            <Skeleton className="min-h-8 min-w-8 rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}

export default UserItem;