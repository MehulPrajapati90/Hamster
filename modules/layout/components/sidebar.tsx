import { getFollowedUsers, getRecommended } from "@/modules/browse/actions";
import Recommended, { RecommendedSkeleton } from "./recommended";
import SideBarWrapper from "./sidebar-wrapper";
import ToggleSidebar, { ToggleSideBarSkeleton } from "./toggle-sidebar";
import Following, { FollowingSkeleton } from "./following";

const Sidebar = async () => {
    const { recommend } = await getRecommended();
    const following = await getFollowedUsers();

    return (
        <SideBarWrapper>
            <ToggleSidebar />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended data={recommend!} />
            </div>
        </SideBarWrapper>
    )
}

export const SideBarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r border-[#2D2E35] z-50">
            <ToggleSideBarSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
}

export default Sidebar;