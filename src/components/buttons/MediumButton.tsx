'use client'
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    hoverText?: string
}

export default function MediumButton(props: Props) {
    const { className, hoverText, ...rest } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                {...rest}
                className={`${className} bg-primary text-white rounded-full p-2 min-w-[20vw] transition-all duration-300 hover:font-bold hover:bg-[#0056b3]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            ></button>
            {hoverText && isHovered && (
                <div className="absolute z-[1000] left-1/2 bottom-full mb-2 transform -translate-x-1/2">
                    <div className="bg-gray-800 text-white text-sm rounded-md py-1 px-2 shadow-lg">
                        {hoverText}
                    </div>
                    <div className="w-3 h-3 bg-gray-800 transform rotate-45 absolute left-1/2 -bottom-1.5 -translate-x-1/2"></div>
                </div>
            )}
        </div>
    );
}