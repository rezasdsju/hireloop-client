import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";

import type { UserRole } from "@/types/userTypes";

const ROLE_ICONS: Record<UserRole, LucideIcon> = {
    seeker: UserRound,
    recruiter: BriefcaseBusiness,
    admin: ShieldCheck,
};

type UserRoleIconProps = {
    role: UserRole;
    className?: string;
};

export const UserRoleIcon = ({ role, className }: UserRoleIconProps) => {
    const Icon = ROLE_ICONS[role];

    return <Icon className={className} aria-hidden="true" />;
};
