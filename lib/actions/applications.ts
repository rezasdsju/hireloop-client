"use server"

import type { ApplicationStatus, IApplication } from "@/types/applicationType"
import { authFetch, protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

// Turns a failed response into a readable error, otherwise returns its JSON.
const readResponse = async <T>(response: Response): Promise<T> => {
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(
            data?.message ||
                `Request failed: ${response.status} ${response.statusText}`
        )
    }

    return data as T
}

export type CreateApplicationResult = {
    acknowledged: boolean
    insertedId: string
}

export async function ApplyToAJob(
    data: IApplication
): Promise<CreateApplicationResult> {
    const response = await protectedMutation(
        `${BASE_URL}/applications`,
        "POST",
        data
    )
    return readResponse<CreateApplicationResult>(response)
}

export async function getApplications(query = ""): Promise<IApplication[]> {
    const api = `${BASE_URL}/applications${query ? `?${query}` : ""}`
    const res = await authFetch(api)

    if (!res.ok) {
        throw new Error(
            `Failed to load applications: ${res.status} ${res.statusText}`
        )
    }

    return res.json()
}

export async function getApplicationsByJobId(
    jobId: string
): Promise<IApplication[]> {
    const res = await authFetch(`${BASE_URL}/applications?jobId=${jobId}`)

    if (!res.ok) {
        throw new Error(
            `Failed to load applications: ${res.status} ${res.statusText}`
        )
    }

    return res.json()
}

export type UpdateApplicationStatusResult = {
    acknowledged: boolean
    matchedCount: number
    modifiedCount: number
}

export const updateApplicationStatus = async (
    id: string,
    data: { status: ApplicationStatus }
): Promise<UpdateApplicationStatusResult> => {
    const response = await protectedMutation(
        `${BASE_URL}/applications/${id}`,
        "PATCH",
        data
    )
    return readResponse<UpdateApplicationStatusResult>(response)
}
