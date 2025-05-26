import { Directorship } from "@/lib/types/responses"
import Card from "../layout/Card"
import { HiUserGroup, HiUser } from "react-icons/hi"
import Link from "next/link"

export default function CompanyDirectors({ directorships }: { directorships: Directorship[] }) {
    if (!directorships || directorships.length === 0) {
        return (
            <Card>
                <div className="flex items-center space-x-4">
                    <HiUserGroup className="text-4xl text-gray-400" />
                    <div>
                        <h2 className="text-2xl font-semibold">Directors</h2>
                        <p className="text-gray-600">No directors found</p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card>
            <div className="flex items-center space-x-4 mb-6">
                <HiUserGroup className="text-4xl text-primary" />
                <div>
                    <h2 className="text-2xl font-semibold">Directors</h2>
                    <p className="text-gray-600">{directorships.length} director{directorships.length !== 1 ? 's' : ''}</p>
                </div>
            </div>
            <div className="space-y-4">
                {directorships.map((directorship) => (
                    <DirectorItem key={directorship.id} directorship={directorship} />
                ))}
            </div>
        </Card>
    )
}


function DirectorItem({ directorship }: { directorship: Directorship }) {
    if (!directorship.directorId) {
        return null
    }
    return <div key={directorship.id} className="bg-secondary p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link href={`/person/${directorship.directorId.id}`}>
            <div className="flex items-center space-x-3">
                <HiUser className="text-2xl text-primary" />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                        {directorship.directorId.firstName} {directorship.directorId.lastName}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <p>
                            <span className="font-medium">Role:</span> {directorship.role}
                        </p>
                        <p>
                            <span className="font-medium">Country:</span> {directorship.directorId.country}
                        </p>
                        <p>
                            <span className="font-medium">Start Date:</span> {new Date(directorship.startDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
}
