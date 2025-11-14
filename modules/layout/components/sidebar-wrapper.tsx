"use client";

import { useIsClient } from "usehooks-ts";
import { useSidebarStore } from "../store"
import { cn } from "@/lib/utils";
import { ToggleSideBarSkeleton } from "./toggle-sidebar";
import { RecommendedSkeleton } from "./recommended";

interface SidebarWrapperProps {
    children: React.ReactNode
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {

    const isClient = useIsClient();
    const { collapsed } = useSidebarStore((state) => state);

    if (!isClient) return (
        <aside className="fixed left-0 flex flex-col lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 ">
            <ToggleSideBarSkeleton />
            <RecommendedSkeleton />
        </aside>
    );

    return (
        <aside className={cn('fixed left-0 flex flex-col w-60 h-full bg-transparent border-r border-[#2D2E35] z-50', collapsed && "w-[70px]")}>
            {children}
        </aside>
    )
}

export default SidebarWrapper;