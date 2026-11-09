import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const RequiredMark = () => <span className="text-destructive">*</span>;

type FormFieldProps = {
    label: ReactNode;
    htmlFor?: string;
    required?: boolean;
    annotation?: string;
    labelClassName?: string;
    badge?: ReactNode;
    className?: string;
    children: ReactNode;
};

export const FormField = ({
    label,
    htmlFor,
    required,
    annotation,
    labelClassName,
    badge,
    className,
    children,
}: FormFieldProps) => {
    const labelNode = (
        <Label htmlFor={htmlFor} className={labelClassName}>
            {label}
            {required && (
                <>
                    {" "}
                    <RequiredMark />
                </>
            )}
            {annotation && (
                <>
                    {" "}
                    <span className="font-normal text-muted-foreground">{annotation}</span>
                </>
            )}
        </Label>
    );

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {badge ? (
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    {labelNode}
                    {badge}
                </div>
            ) : (
                labelNode
            )}
            {children}
        </div>
    );
};
