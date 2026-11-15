import type { IJob, JobType, SalaryFrequency } from "@/types/jobTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// Some records in the API still use the previous field names. Keep the
// adaptation in one place so pages only deal with the current `IJob` shape.
type JobRecord = IJob & {
    company?: string;
    jobType?: JobType;
    min?: number;
    max?: number;
    frequency?: string;
};

const SALARY_FREQUENCIES: Record<string, SalaryFrequency> = {
    hour: "per hour",
    day: "per day",
    month: "per month",
    year: "per year",
};

const normalizeJob = (record: JobRecord): IJob => ({
    ...record,
    companyName: record.companyName || record.company || "",
    type: record.type || record.jobType || "full-time",
    salaryMin: record.salaryMin ?? record.min,
    salaryMax: record.salaryMax ?? record.max,
    salaryFrequency:
        record.salaryFrequency ??
        (record.frequency ? SALARY_FREQUENCIES[record.frequency] : undefined) ??
        "per month",
});

export const getJobs = async (query = ""): Promise<IJob[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);

    if (!res.ok) {
        throw new Error(`Failed to load jobs: ${res.status} ${res.statusText}`);
    }

    const jobs: JobRecord[] = await res.json();
    return jobs.map(normalizeJob);
};

export const getJobById = async (jobId: string): Promise<IJob | null> => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`);

    if (res.status === 404) return null;

    if (!res.ok) {
        throw new Error(`Failed to load job: ${res.status} ${res.statusText}`);
    }

    const job: JobRecord = await res.json();
    return normalizeJob(job);
};
