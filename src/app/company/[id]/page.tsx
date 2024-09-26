import { Endpoints } from "@/lib/api/endpoints";

import Card from "@/components/layout/Card";
import { HiOfficeBuilding, HiLocationMarker, HiCurrencyDollar, HiUserGroup, HiIdentification } from "react-icons/hi";
import CompanyCharts from "@/components/company/CompanyCharts";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const company = await Endpoints.getCompanyFullDetails(params.id);
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold mb-6">{company.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiIdentification className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">Registry Code</h2>
                                <p>{company.registryCode}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiOfficeBuilding className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">Business Area</h2>
                                <p>{company.businessArea}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiLocationMarker className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">County</h2>
                                <p>{company.county}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center space-x-4">
                            <HiCurrencyDollar className="text-4xl text-primary" />
                            <div>
                                <h2 className="text-xl font-semibold">VAT Status</h2>
                                <p>{company.isVat ? "VAT Registered" : "Not VAT Registered"}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card>
                    <h2 className="text-2xl font-semibold mb-6">Financial History</h2>
                    <div className="space-y-8">
                        {company.historyYears.map((year) => (
                            <div key={year.year} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <h3 className="text-xl font-medium mb-4">{year.year}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {year.quarters.map((quarter) => (
                                        <div key={`${year.year}-Q${quarter.quarter}`} className="bg-secondary p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <h4 className="font-semibold text-lg mb-2">Q{quarter.quarter}</h4>
                                            <div className="space-y-2">
                                                <p className="flex justify-between">
                                                    <span className="text-gray-600">Revenue:</span>
                                                    <span className="font-medium">€{quarter.revenue.toLocaleString()}</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span className="text-gray-600">Employees:</span>
                                                    <span className="font-medium">{quarter.employees}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <CompanyCharts company={company} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <Card>
                <div className="flex items-center space-x-4">
                    <HiUserGroup className="text-4xl text-red-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Error</h2>
                        <p>Unable to load company details. Please try again later.</p>
                    </div>
                </div>
            </Card>
        );
    }
}
