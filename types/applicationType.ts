export type ApplicationStatus = "pending" | "reviewing" | "interview" | "accepted" | "rejected";

export interface IApplication {
    _id?: string;
    jobId: string;
    userId: string;
    userEmail: string;
    jobTitle: string;
    companyName: string;
    companyLogo?: string;
    location: string;
    salary?: string;
    employmentType: string;
    status: ApplicationStatus;
    appliedAt: string;
    updatedAt?: string;
    coverLetter?: string;
    resumeUrl?: string;
}