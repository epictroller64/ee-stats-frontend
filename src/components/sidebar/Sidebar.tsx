'use client'
import { HiDatabase, HiSearch } from "react-icons/hi";
import SidebarContent from "./SidebarContent"
import { SidebarItemType } from "./SidebarItem";

export default function Sidebar() {

    const sidebarItems: SidebarItemType[] = [
        { icon: <HiSearch />, text: "Search company", href: "/search" },
        { icon: <HiDatabase />, text: "All companies", href: "/companies" },
        { icon: <HiDatabase />, text: "All persons", href: "/persons" },
    ];
    return <SidebarContent items={sidebarItems} />
}
