"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { formatCount } from "@/lib/jobs/format";

export type FilterOptionProps = {
    name: string;
    value: string;
    label: string;
    count: number;
    defaultChecked?: boolean;
};

export const FilterOption = ({
    name,
    value,
    label,
    count,
    defaultChecked,
}: FilterOptionProps) => {
    const id = `${name}-${value}`;

    return (
        <div className="flex items-center gap-2.5">
            <Checkbox id={id} name={name} value={value} defaultChecked={defaultChecked} />
            <label
                htmlFor={id}
                className="flex-1 cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                {label}
            </label>
            <span className="text-xs tabular-nums text-muted-foreground">
                {formatCount(count)}
            </span>
        </div>
    );
};
