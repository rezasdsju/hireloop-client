import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JobCard } from "@/app/components/browse-jobs/JobCard";
import { Button } from "@/components/ui/button";
import { isClosed } from "@/lib/jobs/format";
import type { IJob } from "@/types/jobTypes";

type FeaturedJobsProps = {
    jobs: IJob[];
};

const FEATURED_COUNT = 3;

export const FeaturedJobs = ({ jobs }: FeaturedJobsProps) => {
    // Prefer jobs that are still open; fall back to whatever the API returned.
    const openJobs = jobs.filter((job) => !isClosed(job.deadline));
    const featured = (openJobs.length > 0 ? openJobs : jobs).slice(0, FEATURED_COUNT);

    return (
        <section aria-labelledby="featured-jobs-heading" className="mx-auto w-full max-w-7xl px-4 py-14 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                        Hand-picked
                    </p>
                    <h2
                        id="featured-jobs-heading"
                        className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                    >
                        Featured jobs
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                        A few of the openings recruiters have posted on HireLoop right now.
                    </p>
                </div>

                <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/browse-jobs" />}
                    className="shrink-0"
                >
                    Browse all jobs
                    <ArrowRight aria-hidden="true" />
                </Button>
            </div>

            {featured.length > 0 ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {featured.map((job) => (
                        <JobCard
                            key={job._id ?? `${job.title}-${job.companyName}`}
                            job={job}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
                    <p className="font-medium">No jobs posted yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        New openings will appear here as soon as recruiters publish them.
                    </p>
                </div>
            )}
        </section>
    );
};
