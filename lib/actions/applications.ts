import type { IApplication } from "@/types/applicationType"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export async function ApplyToAJob(data: IApplication) {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export async function getApplications(applicantId:string): Promise<IApplication[]> {
    const res = await fetch(`${BASE_URL}/applications?${applicantId}`)

    if (!res.ok) {
        throw new Error(`Failed to load applications: ${res.status} ${res.statusText}`)
    }

    return res.json()
}