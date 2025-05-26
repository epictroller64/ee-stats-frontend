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

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Search</h1>
                    <p className="text-gray-600">Search and discover companies in our database</p>
                </div>

                <div className="rounded-lgp-6 mb-8">
                    <div className="flex flex-col gap-3">
                        <label className="text-lg font-semibold text-gray-800" htmlFor="search">
                            Search by company name
                        </label>
                        <div className="relative">
                            <Input
                                className="pl-10"
                                placeholder="Enter company name..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {query.isSuccess && (
                    <div className="space-y-6">
                        {search && (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Search Results
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {query.data.totalElements} companies found for &quot;{search}&quot;
                                    </p>
                                </div>
                                {query.isLoading && (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                    </div>
                                )}
                            </div>
                        )}

                        <CompanyList companies={query.data} />

                        {query.data.totalPages > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    currentPage={query.data.number}
                                    totalPages={query.data.totalPages || 0}
                                    onPageChange={(page) => setPage(page)}
                                />
                            </div>
                        )}
                    </div>
                )}

                {query.isSuccess && !search && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
                        <p className="text-gray-600">Enter a company name above to begin searching our database.</p>
                    </div>
                )}
            </div>
        </div>
    );
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
