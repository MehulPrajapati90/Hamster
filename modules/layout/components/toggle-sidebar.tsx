"use client";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "../store";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "@/components/ui/hint";
import { Skeleton } from "@/components/ui/skeleton";

const ToggleSidebar = () => {
    const { collapsed, onCollapse, onExpand } = useSidebarStore();
    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed ? (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onExpand}
                            variant="ghost"
                            className="h-auto p-2"
                            aria-label={label}
                        >
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            ) : (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">For you</p>
                    <Hint label={label} side={"right"} asChild>
                        <Button
                            onClick={onCollapse}
                            variant="ghost"
                            className="h-auto p-2 ml-auto"
                            aria-label={label}
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};

export const ToggleSideBarSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    )
}

export default ToggleSidebar;
