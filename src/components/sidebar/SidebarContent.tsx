'use client'
import { motion } from "framer-motion";
import { SidebarItem } from "./SidebarItem";
import { useSidebarStore } from "@/lib/store/sidebarStore";



export default function SidebarContent({ items }: {

    items: {
        icon?: React.ReactNode,
        text: string,
        href: string
    }[]
}) {
    const { collapsed, setCollapsed } = useSidebarStore();
    return (
        <motion.nav
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            initial={{ width: collapsed ? '70px' : '240px' }}
            animate={{ width: collapsed ? '70px' : '240px' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-primary rounded-[30px] ml-2 h-full overflow-hidden">
            <ul className="flex flex-col gap-4 w-[240px] p-2">
                {items.map((item) => <SidebarItem key={item.text} icon={item.icon} text={item.text} href={item.href} />)}
            </ul>
        </motion.nav>
    )

}