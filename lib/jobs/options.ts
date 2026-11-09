import type { JobType, SalaryFrequency } from "@/types/jobTypes";

export type JobOption<T extends string> = {
    value: T;
    label: string;
};

export const JOB_TYPES: JobOption<JobType>[] = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
];

export const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Marketing",
    "Sales",
    "Finance & Accounting",
    "Operations",
    "Customer Support",
] as const;

export const SALARY_FREQUENCIES: JobOption<SalaryFrequency>[] = [
    { value: "per hour", label: "per hour" },
    { value: "per day", label: "per day" },
    { value: "per month", label: "per month" },
    { value: "per year", label: "per year" },
];

export const JOB_STATUS_FILTERS = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "closed", label: "Closed" },
];

export const JOB_CATEGORY_FILTERS = [
    { value: "all", label: "All Categories" },
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
];
