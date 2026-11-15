import { Badge } from "@/components/ui/badge";
import { UserRoleIcon } from "@/app/components/users/UserRoleIcon";
import { USER_ROLE_META } from "@/lib/users/roles";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/userTypes";

type UserRoleBadgeProps = {
    role: UserRole;
    className?: string;
};

export const UserRoleBadge = ({ role, className }: UserRoleBadgeProps) => {
    const meta = USER_ROLE_META[role];

    return (
        <Badge variant="outline" className={cn(meta.className, className)}>
            <UserRoleIcon role={role} className="size-3" />
            {meta.label}
        </Badge>
    );
};
