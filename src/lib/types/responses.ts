
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



export interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
}

