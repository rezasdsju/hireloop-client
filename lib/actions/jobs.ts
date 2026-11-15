"use server"

import { IJob } from "@/types/jobTypes"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const createJob = async (data: IJob) => {
    const api = `${BASE_URL}/jobs`
    const res = await protectedMutation(api, 'POST', data)
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Request failed: ${res.status}`)
    }
    return res.json()
}

export const deleteJob = async (jobId: string) => {
    const api = `${BASE_URL}/jobs/${jobId}`
    const res = await protectedMutation(api, 'DELETE')
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Request failed: ${res.status}`)
    }
    return res.json()
}
