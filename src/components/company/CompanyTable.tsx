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
    return <div>
        <CompanyList companies={paginatedResponse} />
        <Pagination currentPage={paginatedResponse.number} totalPages={paginatedResponse.totalPages} onPageChange={(page) => {
            fetchCompanies(page, paginatedResponse.size).then((response) => setPaginatedResponse(response));
        }} />
    </div>
}



function CompanyList({ companies }: { companies: PaginatedResponse<CompanyDetails> }) {
    return <ul className="flex flex-col gap-4">
        {companies.content.map((company) => <li key={company.registryCode} className="flex-1"><CompanyItem company={company} /></li>)}
    </ul>
}

function CompanyItem({ company }: { company: CompanyDetails }) {
    return <Card contentClassName="flex flex-col hover:cursor-pointer hover:shadow-md transition-all duration-300">
        <Link href={`/company/${company.registryCode}`}>
            <h2>{company.name}</h2>
            <p>{company.registryCode}</p>
        </Link>
    </Card>
}