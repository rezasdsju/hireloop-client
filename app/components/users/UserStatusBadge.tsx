import { Badge } from "@/components/ui/badge";
import { USER_STATUS_META } from "@/lib/users/status";
import { cn } from "@/lib/utils";
import type { UserStatus } from "@/types/userTypes";

type UserStatusBadgeProps = {
    status: UserStatus;
    className?: string;
};

export const UserStatusBadge = ({ status, className }: UserStatusBadgeProps) => {
    const meta = USER_STATUS_META[status];

    return (
        <Badge variant="outline" className={cn(meta.className, className)}>
            <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
            {meta.label}
        </Badge>
    );
};
