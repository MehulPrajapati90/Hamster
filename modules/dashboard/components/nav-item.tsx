"use client";

import { LucideIcon } from "lucide-react";
import { useDashboardStore } from "../store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
    label: string;
    href: string;
    icon: LucideIcon
    isActive: boolean
}

const NavItem = ({ href, icon: Icon, isActive, label }: NavItemProps) => {
    const { collapsed } = useDashboardStore();
    return (
        <Button asChild variant={"ghost"} className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}>
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                    {!collapsed && (
                        <span className="hidden lg:block">
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 py-2">
            <Skeleton className="min-h-12 min-w-12 rounded-md" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}

export default NavItem;