export type JobType = "full-time" | "part-time" | "contract" | "internship";

export type SalaryFrequency = "per hour" | "per day" | "per month" | "per year";

export type JobStatus = "active" | "expired";

export interface IJob {
    _id?: string,
    title: string;
    companyName: string;
    category: string;
    type: JobType;
    isRemote: boolean;
    location: string;
    deadline: string;
    salaryMin?: number;
    salaryMax?: number;
    salaryFrequency: SalaryFrequency;
    responsibilities: string;
    qualifications: string;
    applicants?: number,
    status?: JobStatus
}
