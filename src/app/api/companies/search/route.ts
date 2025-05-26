import { Endpoints } from "@/lib/api/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const name = request.nextUrl.searchParams.get("name");
    const page = request.nextUrl.searchParams.get("page");
    const size = request.nextUrl.searchParams.get("size");
    if (!name || !page || !size) {
        if (!name) {
            // Send back empty response
            return NextResponse.json({ content: [], totalPages: 0, totalElements: 0, pageable: { pageNumber: 0, pageSize: 0, sort: { sorted: false, unsorted: true, empty: true } }, last: true, first: true, numberOfElements: 0, empty: true });
        }
        return NextResponse.json({ error: "Name, page and size are required" }, { status: 400 });
    }
    const result = await Endpoints.searchCompanies(name, Number(page), Number(size));
    return NextResponse.json(result);
}