import type { UserStatus } from "@/types/userTypes";

export type UserStatusMeta = {
    label: string;
    /** Tailwind classes shared by status badges and status actions */
    className: string;
};

export const USER_STATUS_META: Record<UserStatus, UserStatusMeta> = {
    active: {
        label: "Active",
        className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    suspended: {
        label: "Suspended",
        className: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
};
