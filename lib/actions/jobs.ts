import { IJobs } from "@/types/jobTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const createJob = async (data: IJobs) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Request failed: ${res.status}`)
    }
    return res.json()
}
