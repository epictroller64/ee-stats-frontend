'use client'
import { CompanyDetails, PaginatedResponse } from "@/lib/types/responses";
import Link from "next/link";
import Card from "../layout/Card";
import Pagination from "../layout/Pagination";
import { useState } from "react";


async function fetchCompanies(page: number, size: number) {
    const response = await fetch(`/api/companies?page=${page}&size=${size}`);
    return await response.json();
}

export default function CompanyTable({ initialPaginatedResponse }: { initialPaginatedResponse: PaginatedResponse<CompanyDetails> }) {
    const [paginatedResponse, setPaginatedResponse] = useState(initialPaginatedResponse);
    return <div className="flex flex-col gap-4">
        <CompanyList companies={paginatedResponse} />
        <Pagination currentPage={paginatedResponse.number} totalPages={paginatedResponse.totalPages} onPageChange={(page) => {
            fetchCompanies(page, paginatedResponse.size).then((response) => setPaginatedResponse(response));
        }} />
    </div>
}



export function CompanyList({ companies }: { companies: PaginatedResponse<CompanyDetails> }) {
    if (!companies.content) return <div>No companies found</div>
    return <ul className="flex flex-col gap-4">
        {companies.content.map((company) => <li key={company.registryCode} className="flex-1"><CompanyItem company={company} /></li>)}
    </ul>
}

function CompanyItem({ company }: { company: CompanyDetails }) {
    return (
        <Card contentClassName="flex flex-col transition-all duration-300 group">
            <Link href={`/company/${company.registryCode}`} className="p-4 block">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{company.name}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <p>Registry Code: {company.registryCode}</p>
                </div>
                {company.businessArea && (
                    <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">{company.businessArea}</p>
                )}
            </Link>
        </Card>
    );
}