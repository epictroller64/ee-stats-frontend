import Link from "next/link";
import { CompanyDetails } from "../../lib/types/responses";



export default function OwnedCompanies({ ownedCompanies }: { ownedCompanies: CompanyDetails[] }) {
    if (ownedCompanies.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Owned Companies</h2>
                <p className="text-gray-500 text-center py-8">No companies owned by this person.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Owned Companies</h2>
            <div className="grid gap-4">
                {ownedCompanies.map((company) => (
                    <div
                        key={company.registryCode}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                        <Link href={`/company/${company.registryCode}`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {company.name}
                                    </h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p><span className="font-medium">Registry Code:</span> {company.registryCode}</p>
                                        {company.businessArea && (
                                            <p><span className="font-medium">Business Area:</span> {company.businessArea}</p>
                                        )}
                                        {company.county && (
                                            <p><span className="font-medium">County:</span> {company.county}</p>
                                        )}
                                        {company.type && (
                                            <p><span className="font-medium">Type:</span> {company.type}</p>
                                        )}
                                    </div>
                                </div>
                                {company.isVat && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        VAT Registered
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}