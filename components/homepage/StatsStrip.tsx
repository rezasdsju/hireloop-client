import { Briefcase, Building2, Globe2, Layers } from "lucide-react";

import { formatCount, isClosed } from "@/lib/jobs/format";
import type { IJob } from "@/types/jobTypes";

type StatsStripProps = {
    jobs: IJob[];
};

/**
 * Numbers are calculated from the jobs returned by the API, so nothing here is
 * hard coded and the strip stays empty when there is no data.
 */
export const StatsStrip = ({ jobs }: StatsStripProps) => {
    const activeJobs = jobs.filter((job) => !isClosed(job.deadline)).length;
    const companies = new Set(jobs.map((job) => job.companyName).filter(Boolean)).size;
    const remoteJobs = jobs.filter((job) => job.isRemote).length;
    const categories = new Set(jobs.map((job) => job.category).filter(Boolean)).size;

    const stats = [
        { label: "Active jobs", value: activeJobs, icon: Briefcase },
        { label: "Companies hiring", value: companies, icon: Building2 },
        { label: "Remote roles", value: remoteJobs, icon: Globe2 },
        { label: "Categories", value: categories, icon: Layers },
    ];

    return (
        <section aria-label="HireLoop in numbers" className="border-y border-border bg-muted/30">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-1 bg-background px-4 py-6 text-center"
                    >
                        <Icon className="size-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                        <span className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                            {formatCount(value)}
                        </span>
                        <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
