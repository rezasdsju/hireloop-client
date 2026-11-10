import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bookmark, Briefcase, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { capitalize, formatLocation, formatSalary, isClosed } from "@/lib/jobs/format";
import { cn } from "@/lib/utils";
import type { IJob } from "@/types/jobTypes";

type JobTagProps = {
    icon?: LucideIcon;
    tone?: "default" | "warning";
    children: ReactNode;
};

const tagTones = {
    default: "bg-muted text-foreground",
    warning: "border border-amber-500/40 bg-amber-500/10 text-amber-500",
};

const JobTag = ({ icon: Icon, tone = "default", children }: JobTagProps) => {
    return (
        <span
            className={cn(
                "inline-flex h-7.5 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium",
                tagTones[tone]
            )}
        >
            {Icon && <Icon className="size-3.5" />}
            {children}
        </span>
    );
};

export const JobCard = ({ job }: { job: IJob }) => {
    const salary = formatSalary(job);
    const closed = isClosed(job.deadline);

    return (
        <Card className="p-6">
            <div className="flex items-start gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-xl font-semibold">
                    {job.companyName.charAt(0).toUpperCase()}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h3 className="truncate font-heading text-xl font-semibold tracking-tight">
                                {job.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {job.companyName} • {formatLocation(job)}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Save ${job.title}`}
                            className="shrink-0 text-muted-foreground"
                        >
                            <Bookmark />
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {salary && <JobTag icon={DollarSign}>{salary}</JobTag>}
                        <JobTag icon={Briefcase}>{capitalize(job.type)}</JobTag>
                        {closed && <JobTag tone="warning">Closed</JobTag>}
                    </div>
                </div>
            </div>
        </Card>
    );
};
