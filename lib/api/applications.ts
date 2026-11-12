
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export async function getApplicationsCount(query=''): Promise<{count:number}> {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)

    if (!res.ok) {
        throw new Error(`Failed to load applications: ${res.status} ${res.statusText}`)
    }

    return res.json()
}