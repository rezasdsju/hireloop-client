import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
    title: string;
    description: string;
    actions?: ReactNode;
    className?: string;
};

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => {
    return (
        <div className={cn(className, "flex flex-wrap items-start justify-between gap-4")}>
            <div className="min-w-0 flex-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            {actions}
        </div>
    );
};
