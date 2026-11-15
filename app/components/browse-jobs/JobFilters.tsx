import { Card } from "@/components/ui/card";
import type { JobFilterGroup } from "@/lib/jobs/filters";

import { FilterOption } from "./FilterOption";

type JobFiltersProps = {
    groups: JobFilterGroup[];
};

/**
 * Filter sidebar, rendered from the groups built by `buildJobFilterGroups`.
 *
 * The checkboxes are uncontrolled and purely visual for now: ticking one does
 * not change the query string. Add an `onCheckedChange` handler here when the
 * filter behaviour is implemented.
 */
export const JobFilters = ({ groups }: JobFiltersProps) => {
    return (
        <aside className="h-fit min-w-0 md:sticky md:top-20">
            <Card className="gap-5 p-5">
                <h2 className="font-heading text-lg font-semibold tracking-tight">Filters</h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-col md:gap-6">
                    {groups
                        .filter((group) => group.options.length > 0)
                        .map((group) => (
                            <section key={group.name} className="flex flex-col gap-2.5">
                                <h3 className="text-sm font-semibold">{group.title}</h3>
                                <div className="flex flex-col gap-2.5">
                                    {group.options.map((option) => (
                                        <FilterOption
                                            key={option.value}
                                            name={group.name}
                                            value={option.value}
                                            label={option.label}
                                            count={option.count}
                                            defaultChecked={option.checked}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                </div>
            </Card>
        </aside>
    );
};
