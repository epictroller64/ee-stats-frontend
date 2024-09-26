
export interface CompanyDetails {
    registryCode: string;
    businessArea: string;
    county: string;
    name: string;
    type: string;
    isVat: boolean;
}

export interface CompanyFullDetails extends CompanyDetails {
    historyYears: HistoryYear[];
}

export interface HistoryYear {
    year: number;
    quarters: Quarter[];
}

export interface Quarter {
    quarter: number;
    year: number;
    revenue: number;
    stateTaxes: number;
    laborTaxes: number;
    employees: number;
}
