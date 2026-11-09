import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithAdornmentProps = ComponentProps<"input"> & {
    icon?: LucideIcon;
    prefix?: ReactNode;
};

export const InputWithAdornment = ({
    icon: Icon,
    prefix,
    className,
    ...props
}: InputWithAdornmentProps) => {
    if (!Icon && prefix === undefined) {
        return <Input className={className} {...props} />;
    }

    return (
        <div className="relative">
            {Icon ? (
                <Icon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            ) : (
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                    {prefix}
                </span>
            )}
            <Input className={cn(Icon ? "pl-8" : "pl-7", className)} {...props} />
        </div>
    );
};
