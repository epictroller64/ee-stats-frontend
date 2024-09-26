import { create } from "zustand"

type SidebarStore = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapsed: true,
    setCollapsed: (collapsed) => set({ collapsed })
}))