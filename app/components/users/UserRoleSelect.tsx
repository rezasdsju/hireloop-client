"use client";

import { UserCog } from "lucide-react";

import { UserRoleIcon } from "@/app/components/users/UserRoleIcon";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { USER_ROLE_OPTIONS } from "@/lib/users/roles";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/userTypes";

type UserRoleSelectProps = {
    userName: string;
    onValueChange: (role: UserRole) => void;
    disabled?: boolean;
    className?: string;
};

/**
 * Compact role picker shown in the users table actions.
 *
 * The select is intentionally controlled with a `null` value, so the trigger always
 * reads "Change role" instead of duplicating the role badge already shown in the row.
 */
export const UserRoleSelect = ({
    userName,
    onValueChange,
    disabled,
    className,
}: UserRoleSelectProps) => {
    return (
        <Select<UserRole>
            value={null}
            disabled={disabled}
            onValueChange={(nextValue) => {
                if (nextValue) onValueChange(nextValue);
            }}
        >
            <SelectTrigger
                size="sm"
                aria-label={`Change role for ${userName}`}
                className={cn(
                    "h-7 gap-1.5 border-transparent bg-transparent px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground dark:bg-transparent dark:hover:bg-muted/50",
                    className
                )}
            >
                <UserCog aria-hidden="true" />
                <SelectValue placeholder="Change role" />
            </SelectTrigger>
            <SelectContent align="end">
                {USER_ROLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        <UserRoleIcon
                            role={option.value}
                            className="size-3.5 text-muted-foreground"
                        />
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
