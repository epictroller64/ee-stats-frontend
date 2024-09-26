import { useSidebarStore } from "@/lib/store/sidebarStore";
import { motion } from "framer-motion"
import Link from "next/link"

export function SidebarItem({ icon, text, href }: { icon: React.ReactNode, text: string, href: string }) {
    const { collapsed } = useSidebarStore();
    return (
        <motion.li>
            <Link href={href} className={`flex items-center gap-2 text-white text-xl py-2 px-4 hover:cursor-pointer hover:font-bold hover:bg-white rounded-full hover:bg-opacity-20`}>
                <div className="flex items-center w-full">{icon}</div>
                <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -10 : 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 whitespace-nowrap"
                >{text}</motion.p>
            </Link>
        </motion.li>
    )
}


export type SidebarItemType = {
    icon: React.ReactNode,
    text: string,
    href: string
}