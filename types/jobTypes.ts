export interface IJobs {
    _id?: string,
    title: string;
    companyName: string;
    category: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    isRemote: boolean;
    location: string;
    deadline: string;
    salaryMin?: number;
    salaryMax?: number;
    salaryFrequency: "per hour" | "per day" | "per month" | "per year";
    responsibilities: string;
    qualifications: string;
    applicants?: number,
    status?: 'active' | 'expired'
}