import type { UserRole } from "@/types/userTypes";

export type UserRoleOption = {
    value: UserRole;
    label: string;
    /** Tailwind classes shared by role badges and the role menu items */
    className: string;
};

export const USER_ROLE_OPTIONS: UserRoleOption[] = [
    {
        value: "seeker",
        label: "Seeker",
        className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        value: "recruiter",
        label: "Recruiter",
        className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
        value: "admin",
        label: "Admin",
        className: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
];

export const USER_ROLE_META = Object.fromEntries(
    USER_ROLE_OPTIONS.map(({ value, label, className }) => [value, { label, className }])
) as Record<UserRole, { label: string; className: string }>;

export const DEFAULT_USER_ROLE: UserRole = "seeker";

export const resolveUserRole = (role?: UserRole): UserRole => role ?? DEFAULT_USER_ROLE;

export type UserRoleFilter = UserRole | "all";

export const USER_ROLE_FILTERS: { value: UserRoleFilter; label: string }[] = [
    { value: "all", label: "All roles" },
    ...USER_ROLE_OPTIONS.map(({ value, label }) => ({ value, label })),
];
