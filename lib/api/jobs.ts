const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL


export const getJobs = async()=>{
    const res = await fetch(`${BASE_URL}/jobs`)
    return res.json()
}


export const deleteJob = async(jobId:string)=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: 'DELETE'
    })
    return await res.json()
}