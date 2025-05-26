'use client'
import { PaginatedResponse, Person } from "@/lib/types/responses";
import Link from "next/link";
import Card from "../layout/Card";
import Pagination from "../layout/Pagination";
import { useState } from "react";


async function fetchPersons(page: number, size: number) {
    const response = await fetch(`/api/persons?page=${page}&size=${size}`);
    return await response.json();
}

export default function PersonTable({ initialPaginatedResponse }: { initialPaginatedResponse: PaginatedResponse<Person> }) {
    const [paginatedResponse, setPaginatedResponse] = useState(initialPaginatedResponse);
    return <div className="flex flex-col gap-4">
        <PersonList persons={paginatedResponse} />
        <Pagination currentPage={paginatedResponse.number} totalPages={paginatedResponse.totalPages} onPageChange={(page) => {
            fetchPersons(page, paginatedResponse.size).then((response) => setPaginatedResponse(response));
        }} />
    </div>
}



export function PersonList({ persons }: { persons: PaginatedResponse<Person> }) {
    if (!persons.content) return <div>No persons found</div>
    return <ul className="flex flex-col gap-4">
        {persons.content.map((person) => <li key={person.id} className="flex-1"><PersonItem person={person} /></li>)}
    </ul>
}

function PersonItem({ person }: { person: Person }) {
    return (
        <Card contentClassName="flex flex-col transition-all duration-300 group hover:shadow-lg">
            <Link href={`/person/${person.id}`} className="p-6 block">
                <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
                        {person.firstName || 'Unknown'} {person.lastName || 'Person'}
                    </h2>
                    {person.target && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Target
                        </span>
                    )}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Country:</span>
                        <span>{person.country || 'Not specified'}</span>
                    </div>

                    {person.name && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Company:</span>
                            <span>{person.name}</span>
                        </div>
                    )}

                    {person.email && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Email:</span>
                            <span className="text-blue-600">{person.email}</span>
                        </div>
                    )}

                    {person.phone && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Phone:</span>
                            <span>{person.phone}</span>
                        </div>
                    )}

                    {person.incorporationDate && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Incorporated:</span>
                            <span>{new Date(person.incorporationDate).toLocaleDateString()}</span>
                        </div>
                    )}

                    {person.address && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Address:</span>
                            <span className="text-gray-500 truncate">{person.address}</span>
                        </div>
                    )}
                </div>
            </Link>
        </Card>
    );
}