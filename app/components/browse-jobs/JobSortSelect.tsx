import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { JOB_SORT_OPTIONS } from "@/lib/jobs/options";

const DEFAULT_SORT = "recent";

type JobSortSelectProps = {
    defaultValue?: string;
};

export const JobSortSelect = ({ defaultValue }: JobSortSelectProps) => {
    const isKnownSort = JOB_SORT_OPTIONS.some((option) => option.value === defaultValue);

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue={isKnownSort ? defaultValue : DEFAULT_SORT} items={JOB_SORT_OPTIONS}>
                <SelectTrigger className="w-36" aria-label="Sort jobs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {JOB_SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
