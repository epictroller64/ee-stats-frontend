'use client'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'


export default function Table<T>({ data, columns }: { data: T[], columns: ColumnDef<T>[] }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    if (data.length === 0) return <div className='text-text'>No data</div>
    return <table className='text-white w-full bg-primary rounded-lg'>
        <thead >
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='border-b border-white'>
                    {headerGroup.headers.map((header) => (
                        <th className='text-left px-2' style={{ width: `${header.column.columnDef.size}%` }} key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody>
            {
                table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td className='px-2 bg-secondary text-black text-sm font-bold' style={{ width: `${cell.column.columnDef.size}%` }} key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))
            }
        </tbody>
    </table>
}

export function getStatusCellHoverText(value: "pending" | "processing" | "completed" | "failed"): string {
    switch (value) {
        case "pending":
            return "Pending"
        case "processing":
            return "Processing"
        case "completed":
            return "Completed"
        case "failed":
            return "Failed"
    }
}

export function getStatusCell(value: string): JSX.Element {
    return <div className='flex justify-start'>
        <p className="text-black text-sm">{value}</p>
    </div>
}

export function getBooleanCell(value: boolean): JSX.Element {
    return (
        <div className="flex justify-start">
            {value ? <div className="bg-green-500 w-[10px] h-[10px] rounded-full"></div> : <div className="bg-red-500 w-[10px] h-[10px] rounded-full"></div>}
        </div>
    )
}

export function getCopyableCell(value: string): JSX.Element {
    return (
        <div className="flex justify-start">
            <p className="cursor-pointer hover:underline hover:scale-[101%] hover:text-green-500 transition-all duration-300" onClick={() => { navigator.clipboard.writeText(value); toast.success("Copied to clipboard") }}>{value}</p>
        </div>
    )
}


export function HoverableCell({ children, hoverText }: { children: React.ReactNode, hoverText: string }) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative">
            {isHovered &&
                <AnimatePresence>
                    <motion.div className={`absolute top-0 left-0 bg-primary p-2 transition-all duration-300 flex items-center justify-center rounded z-[100]`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}>
                        <p className="text-white text-sm">{hoverText}</p>
                    </motion.div>
                </AnimatePresence>
            }
            {children}
        </div>
    )
}
