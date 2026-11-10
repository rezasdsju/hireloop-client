import { IJob } from "@/types/jobTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL


export const getJobs = async(query:string=""):Promise<IJob[]>=>{
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}


// The API has no single job endpoint yet, so the list is used to find the job.
export const getJobById = async(jobId:string):Promise<IJob>=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
    return res.json()
    
}


export const deleteJob = async(jobId:string)=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: 'DELETE'
    })
    return await res.json()
}