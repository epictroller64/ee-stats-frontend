import { Ownership } from "@/lib/types/responses"
import Link from "next/link"

export default function CompanyOwnerships({ ownerships }: { ownerships: Ownership[] }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Company Owners</h2>
            {ownerships.length === 0 ? (
                <p className="text-gray-500 italic">No ownership information available</p>
            ) : (
                <div className="space-y-4">
                    {ownerships.map((ownership) => (
                        <OwnershipItem key={ownership.id} ownership={ownership} />
                    ))}
                </div>
            )}
        </div>
    )
}


function OwnershipItem({ ownership }: { ownership: Ownership }) {
    if (!ownership.ownerId) {
        return <div>Ownership was found but no further information is provided.</div>
    }
    return (
        <div key={ownership.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <Link href={`/person/${ownership.ownerId.id}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-gray-900">
                            {ownership.ownerId.firstName} {ownership.ownerId.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">Role: {ownership.role}</p>
                        <p className="text-sm text-gray-600">Country: {ownership.ownerId.country}</p>
                        <p className="text-sm text-gray-600">Start Date: {new Date(ownership.startDate).toLocaleDateString()}</p>
                    </div>
                    {ownership.ownerId.target && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Target
                        </span>
                    )}
                </div>
            </Link>
        </div>
    )
}
