// Header for navigation

import Link from "next/link"

type HeaderProps = {
    buttons: JSX.Element[],
    leftSide?: JSX.Element,
}

export default async function Header({ buttons }: HeaderProps) {
    return <header className="relative flex justify-between items-center flex-row bg-primary text-white h-[70px] px-4 m-2 rounded-full bg-opacity-50">
        <div>
            {buttons}

        </div>
    </header>
}

export function HeaderButton({ text, href }: { text: string, href?: string }) {
    return <button className="text-white hover:text-text hover:bg-white hover:bg-opacity-20 rounded-full px-4 py-2 transition-all duration-300 hover:font-bold">
        {href ? (
            <Link href={href}>
                {text}
            </Link>
        ) : (
            <span>{text}</span>
        )}
    </button>
}
