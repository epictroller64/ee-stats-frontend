import { cookies } from "next/headers";



const baseUrl = 'http://localhost:8080'
// Functions to handle API requests to the backend
// Custom error class for API errors
export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`,
            {
                headers: options?.headers
            }
        )
        if (!response.ok) {
            const json = await response.json()
            throw new ApiError(response.status, json.message)
        }
        const json: T = await response.json()
        return json
    } catch (error) {
        throw error
    }
}

// Send a POST request to the API with JSON body
export async function post<T>(endpoint: string, body: object, options?: RequestInit): Promise<T> {
    try {
        const cookie = cookies()
        const session_token = cookie.get("session_token")
        if (!options) {
            options = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
        if (session_token && session_token.value) {
            options.headers = {
                ...options.headers,
                "Cookie": `session_token=${session_token.value}`,
            }
        }
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: options?.headers,
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            const json = await response.json()
            throw new ApiError(response.status, json.message)
        }
        const json = await response.json() as T
        return json
    } catch (error) {
        if (error instanceof ApiError) {
            console.log(`API Error: ${error.message}`)
        }
        throw error
    }
}

export async function put<T>(endpoint: string, body: object): Promise<T> {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        if (!response.ok) {
            throw new ApiError(response.status, json.message)
        }
        return json
    } catch (error) {
        throw error
    }
}


export async function del<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (!response.ok) {
            throw new ApiError(response.status, json.message)
        }
        return json
    } catch (error) {
        console.error(error)
        throw error
    }
}
