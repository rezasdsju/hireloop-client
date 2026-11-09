import type { ComponentProps } from "react";

import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TableHeadCell = ({ className, ...props }: ComponentProps<typeof TableHead>) => {
    return (
        <TableHead
            className={cn("text-xs uppercase tracking-wider text-muted-foreground", className)}
            {...props}
        />
    );
};
