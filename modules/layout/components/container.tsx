"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "../store"
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)")
    const { collapsed, onCollapse, onExpand } = useSidebarStore((state) => state);

    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches]);
    return (
        <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>
    )
}

export default Container;