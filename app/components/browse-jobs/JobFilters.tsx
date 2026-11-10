"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import type { JobFilterGroup } from "@/lib/jobs/filters";

import { FilterOption } from "./FilterOption";
import { useRouter } from "next/navigation";

type JobFiltersProps = {
    groups: JobFilterGroup[];
};

// Only one option per group can be ticked: picking another one replaces the
// previous selection, and ticking the selected one again clears the group.
// Keep this in sync with the URL (router.push) when the filter behaviour is
// implemented, and read the initial value from the search params instead.
const getInitialSelection = (groups: JobFilterGroup[]) => {
    return Object.fromEntries(
        groups.map((group) => [
            group.name,
            group.options.find((option) => option.checked)?.value,
        ])
    ) as Record<string, string | undefined>;
};

export const JobFilters = ({ groups }: JobFiltersProps) => {
    const [selected, setSelected] = useState(() => getInitialSelection(groups));
    const router = useRouter()
    const handleCheckedChange = (name: string, value: string, checked: boolean) => {
        // setSelected((previous) => ({ ...previous, [name]: checked ? value : undefined }));
        // console.log(name, value)
        const nextSelected = {
            ...selected,
            [name]:checked?value:undefined
        }
        setSelected(nextSelected)
        const params = new URLSearchParams()
        Object.entries(nextSelected).forEach(([key,val])=>{
            if (val){
                params.set(key,val)
            }
        })
        router.push(`/browse-jobs?${params.toString()}`)
    };

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
                                    <FilterOption
                                        key={option.value}
                                        name={group.name}
                                        value={option.value}
                                        label={option.label}
                                        count={option.count}
                                        checked={selected[group.name] === option.value}
                                        onCheckedChange={(checked) =>
                                            handleCheckedChange(group.name, option.value, checked)
                                        }
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
