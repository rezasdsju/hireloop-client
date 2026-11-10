import { Checkbox } from "@/components/ui/checkbox";

export type FilterOptionProps = {
    name: string;
    value: string;
    label: string;
    count: number;
    checked: boolean;
};

export const FilterOption = ({ name, value, label, count, checked }: FilterOptionProps) => {
    const id = `${name}-${value}`;

    return (
        <div className="flex items-center gap-2.5">
            <Checkbox id={id} name={name} value={value} defaultChecked={checked} />
            <label htmlFor={id} className="flex-1 cursor-pointer text-sm text-muted-foreground">
                {label}
            </label>
            <span className="text-xs text-muted-foreground">{count}</span>
        </div>
    );
};
