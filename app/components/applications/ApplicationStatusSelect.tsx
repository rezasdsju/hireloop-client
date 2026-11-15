"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { APPLICATION_STATUS_META, APPLICATION_STATUS_OPTIONS } from "@/lib/applications/status";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/applicationType";

type ApplicationStatusSelectProps = {
    applicationId: string;
    value: ApplicationStatus;
    onValueChange: (value: ApplicationStatus) => void;
    disabled?: boolean;
    className?: string;
};

/**
 * Status picker shown in the recruiter applications table.
 *
 * Purely presentational: the parent owns the state, so persisting the change
 * only has to be wired once in the caller.
 */
export const ApplicationStatusSelect = ({
    applicationId,
    value,
    onValueChange,
    disabled,
    className,
}: ApplicationStatusSelectProps) => {
    const meta = APPLICATION_STATUS_META[value];

    return (
        <Select<ApplicationStatus>
            value={value}
            disabled={disabled}
            onValueChange={(nextValue) => {
                if (nextValue) onValueChange(nextValue);
            }}
        >
            <SelectTrigger
                size="sm"
                aria-label={`Update status for application ${applicationId}`}
                className={cn("h-7 gap-1.5 text-xs font-medium", meta?.className, className)}
            >
                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                <SelectValue>{(currentValue: ApplicationStatus) => APPLICATION_STATUS_META[currentValue]?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
                {APPLICATION_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
