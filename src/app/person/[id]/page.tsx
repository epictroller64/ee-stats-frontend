import { Endpoints } from "@/lib/api/endpoints";
import Card from "@/components/layout/Card";
import { HiUser, HiLocationMarker, HiFlag } from "react-icons/hi";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const person = await Endpoints.getPerson(id);

        return (
            <div className="container mx-auto px-4 py-8 space-y-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {person.firstName} {person.lastName}
                    </h1>
                    <p className="text-gray-600 mt-2">Person Details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiUser className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">Full Name</h2>
                                <p>{person.firstName} {person.lastName}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiLocationMarker className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">Country</h2>
                                <p>{person.country}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiFlag className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">Target Status</h2>
                                <p>{person.target ? "Target Person" : "Regular Person"}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <Card>
                <div className="flex items-center space-x-4">
                    <HiUser className="text-4xl text-red-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Error</h2>
                        <p>Unable to load person details. Please try again later.</p>
                    </div>
                </div>
            </Card>
        );
    }
}