import { CompanyDetails, CompanyFullDetails, Directorship, Ownership, PaginatedResponse, Person } from "../types/responses"
import { get } from "./api"

export const Endpoints = {
    getCompanyDetails: async (registryCode: string) => {
        return await get<CompanyDetails>(`/companies/${registryCode}`)
    },
    getCompanyFullDetails: async (registryCode: string) => {
        return await get<CompanyFullDetails>(`/companies/${registryCode}/full`)
    },
    getCompanies: async (page: number, pageSize: number) => {
        return await get<PaginatedResponse<CompanyDetails>>(`/companies/all/${page}/${pageSize}`)
    },
    searchCompanies: async (name: string, page: number, pageSize: number) => {
        return await get<PaginatedResponse<CompanyDetails>>(`/companies/search/${name}?page=${page}&size=${pageSize}`)
    },
    getCompaniesByOwnerId: async (ownerId: string) => {
        return await get<CompanyDetails[]>(`/companies/owner/${ownerId}`)
    },
    getDirectorships: async (registryCode: string) => {
        return await get<Directorship[]>(`/directorships/find/${registryCode}`)
    },
    getPerson: async (id: string) => {
        return await get<Person>(`/persons/${id}`)
    },
    getPersons: async (page: number, pageSize: number) => {
        return await get<PaginatedResponse<Person>>(`/persons/all/${page}/${pageSize}`)
    },
    getOwnerships: async (registryCode: string) => {
        return await get<Ownership[]>(`/ownerships/find/${registryCode}`)
    }
}