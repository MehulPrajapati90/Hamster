import { create } from "zustand";

interface DashboardStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

interface ChatVariantsStore {
    collapsed: boolean;
    variant: ChatVariants;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariants: (variant: ChatVariants) => void;
}

export enum ChatVariants {
    CHAT = "cHAT",
    COMMUNITY = "COMMUNITY"
}

export const useDashboardStore = create<DashboardStore>()((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}))

export const useChatSidebarStore = create<ChatVariantsStore>()((set) => ({
    collapsed: false,
    variant: ChatVariants.CHAT,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariants: (variant: ChatVariants) => set(() => ({ variant: variant }))
}))