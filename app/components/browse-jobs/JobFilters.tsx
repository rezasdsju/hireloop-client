import { Card } from "@/components/ui/card";
import type { JobFilterGroup } from "@/lib/jobs/filters";

import { FilterOption } from "./FilterOption";

type JobFiltersProps = {
    groups: JobFilterGroup[];
};

// The options are rendered as uncontrolled inputs, so checking a box updates the
// UI on its own. Wire the URL/query updates in FilterOption (onCheckedChange)
// when the filter behaviour is implemented.
export const JobFilters = ({ groups }: JobFiltersProps) => {
    return (
        <aside className="h-fit">
            <Card className="gap-5 p-6">
                <h2 className="font-heading text-xl font-semibold tracking-tight">Filters</h2>

                <div className="flex flex-col gap-6">
                    {groups.map((group) => (
                        <section key={group.name} className="flex flex-col gap-3">
                            <h3 className="text-sm font-medium">{group.title}</h3>
                            <div className="flex flex-col gap-2.5">
                                {group.options.map((option) => (
                                    <FilterOption key={option.value} name={group.name} {...option} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Card>
        </aside>
    );
};
