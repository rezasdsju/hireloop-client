import type { IJob } from "@/types/jobTypes";

export const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

export const isClosed = (deadline: string) => new Date(deadline).getTime() < Date.now();

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const formatCount = (value: number) => value.toLocaleString("en-US");

const formatAmount = (amount: number) =>
    amount >= 1000 ? `$${Math.round(amount / 100) / 10}k` : `$${amount}`;

export const formatSalary = ({
    salaryMin,
    salaryMax,
    salaryFrequency,
}: Pick<IJob, "salaryMin" | "salaryMax" | "salaryFrequency">) => {
    if (salaryMin === undefined && salaryMax === undefined) return null;

    const range =
        salaryMin !== undefined && salaryMax !== undefined
            ? `${formatAmount(salaryMin)} - ${formatAmount(salaryMax)}`
            : formatAmount((salaryMin ?? salaryMax)!);

    return salaryFrequency === "per year" ? range : `${range} ${salaryFrequency}`;
};

export const formatLocation = ({ location, isRemote }: Pick<IJob, "location" | "isRemote">) => {
    if (!isRemote || /remote/i.test(location)) return location;
    return `${location} (Remote)`;
};
