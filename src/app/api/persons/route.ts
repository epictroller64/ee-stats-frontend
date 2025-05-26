import { NextResponse } from "next/server";
import { Endpoints } from "@/lib/api/endpoints";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page")
    const size = searchParams.get("size")
    const persons = await Endpoints.getPersons(Number(page), Number(size))
    return NextResponse.json(persons)
}