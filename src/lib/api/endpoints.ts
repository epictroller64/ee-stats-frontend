import { CompanyDetails, CompanyFullDetails, PaginatedResponse } from "../types/responses"
import { get } from "./api"

export const Endpoints = {
    getCompanyDetails: async (registryCode: string) => {
        return await get<CompanyDetails>(`/companies/${registryCode}`)
    },
    getCompanyFullDetails: async (registryCode: string) => {
        return await get<CompanyFullDetails>(`/companies/${registryCode}/full`)
    },
    getCompanies: async (page: number, pageSize: number) => {
        return await get<PaginatedResponse<CompanyDetails>>(`/companies/${page}/${pageSize}`)
    },
    searchCompanies: async (name: string, page: number, pageSize: number) => {
        return await get<PaginatedResponse<CompanyDetails>>(`/companies/search/${name}?page=${page}&size=${pageSize}`)
    }
}