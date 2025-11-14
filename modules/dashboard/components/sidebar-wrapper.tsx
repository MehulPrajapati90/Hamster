import { cn } from "@/lib/utils";
import { useDashboardStore } from "../store";

interface WrapperSidebarProps {
    children: React.ReactNode
}

const SidebarWrapper = ({ children }: WrapperSidebarProps) => {
    const { collapsed } = useDashboardStore();
    return (
        <aside className={cn("fixed left-0 flex-col w-[70px] lg:w-60 h-full bg-transparent border-r border-[#2D2E35] z-50", collapsed && "lg:w-[70px]")}>
            {children}
        </aside>
    )
}

export default SidebarWrapper;