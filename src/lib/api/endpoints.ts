import { CompanyDetails, CompanyFullDetails } from "../types/responses"
import { get } from "./api"

export const Endpoints = {
    getCompanyDetails: async (registryCode: string) => {
        return await get<CompanyDetails>(`/companies/${registryCode}`)
    },
    getCompanyFullDetails: async (registryCode: string) => {
        return await get<CompanyFullDetails>(`/companies/${registryCode}/full`)
    }
}