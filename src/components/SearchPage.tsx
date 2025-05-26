'use client'
import { useState } from "react";
import Input from "./input/Input";
import { PaginatedResponse, CompanyDetails } from "@/lib/types/responses";
import { CompanyList } from "./company/CompanyTable";
import Pagination from "./layout/Pagination";
import { useQuery } from "@tanstack/react-query";

async function searchCompanies(name: string, page: number, pageSize: number) {
    const response = await fetch(`/api/companies/search?name=${name}&page=${page}&size=${pageSize}`);
    return await response.json();
}

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const query = useQuery({
        queryKey: ["companies", search, page],
        queryFn: () => searchCompanies(search, page, 10),
        initialData: getDefaultPaginatedResponse()
    });
    if (query.isSuccess) {
        return <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-lg font-bold" htmlFor="search">Search by name</label>
                <Input onChange={(e) => setSearch(e.target.value)} />
            </div>
            <CompanyList companies={query.data} />
            <Pagination currentPage={query.data.number} totalPages={query.data.totalPages || 0} onPageChange={(page) => setPage(page)} />
        </div>
    }
}

function getDefaultPaginatedResponse(): PaginatedResponse<CompanyDetails> {
    return {
        content: [],
        pageable: {
            pageNumber: 1,
            pageSize: 10,
            sort: {
                sorted: false,
                empty: false,
                unsorted: false
            },
            offset: 0,
            paged: false,
            unpaged: false
        },
        last: false,
        totalElements: 0,
        totalPages: 0,
        first: false,
        numberOfElements: 0,
        size: 0,
        number: 0,
        sort: {
            sorted: false,
            empty: false,
            unsorted: false
        },
        empty: false
    }
}
