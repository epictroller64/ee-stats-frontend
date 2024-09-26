import CompanyTable from "@/components/company/CompanyTable";
import { Endpoints } from "@/lib/api/endpoints";

export default async function Page() {
    const companies = await Endpoints.getCompanies(1, 10);
    return <CompanyTable initialPaginatedResponse={companies} />
}


