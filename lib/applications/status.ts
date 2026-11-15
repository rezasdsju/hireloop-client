import type { ApplicationStatus } from "@/types/applicationType";

export type ApplicationStatusOption = {
    value: ApplicationStatus;
    label: string;
    /** Tailwind classes used by status badges and the status picker */
    className: string;
};

export const APPLICATION_STATUS_OPTIONS: ApplicationStatusOption[] = [
    {
        value: "pending",
        label: "Pending",
        className:
            "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
        value: "reviewing",
        label: "Reviewing",
        className:
            "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    },
    {
        value: "interview",
        label: "Interview",
        className:
            "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
        value: "accepted",
        label: "Accepted",
        className:
            "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
        value: "rejected",
        label: "Rejected",
        className:
            "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
];

export const APPLICATION_STATUS_META = Object.fromEntries(
    APPLICATION_STATUS_OPTIONS.map(({ value, label, className }) => [value, { label, className }])
) as Record<ApplicationStatus, { label: string; className: string }>;
