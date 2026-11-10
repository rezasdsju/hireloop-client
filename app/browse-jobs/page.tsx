import Navbar from "@/components/shared/navbar/Navbar";
import { Card } from "@/components/ui/card";
import { JobCard } from "@/app/components/browse-jobs/JobCard";
import { JobFilters } from "@/app/components/browse-jobs/JobFilters";
import { JobPagination } from "@/app/components/browse-jobs/JobPagination";
import { JobSearchBar } from "@/app/components/browse-jobs/JobSearchBar";
import { JobSortSelect } from "@/app/components/browse-jobs/JobSortSelect";
import { getJobs } from "@/lib/api/jobs";
import { buildJobFilterGroups } from "@/lib/jobs/filters";
import { formatCount } from "@/lib/jobs/format";
import { getParam, toQueryString } from "@/lib/search-params";
import type { SearchParams } from "@/lib/search-params";

const PAGE_SIZE = 6;

const BrowseJobsPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const params = await searchParams;
    // Facet counts come from the whole catalogue, so they stay stable while filtering.
    const [jobs, allJobs] = await Promise.all([getJobs(toQueryString(params)), getJobs()]);

    const filterGroups = buildJobFilterGroups(allJobs, params);
    const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
    const requestedPage = Math.trunc(Number(getParam(params, "page"))) || 1;
    const page = Math.min(Math.max(requestedPage, 1), totalPages);
    const visibleJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8">
                <JobSearchBar defaultValue={getParam(params, "search")} />

                <div className="mt-6 grid gap-8 lg:grid-cols-[296px_1fr]">
                    <JobFilters groups={filterGroups} />

                    <section>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h1 className="font-heading text-xl font-semibold tracking-tight">
                                Found {formatCount(jobs.length)}{" "}
                                {jobs.length === 1 ? "Job" : "Jobs"}
                            </h1>
                            <JobSortSelect defaultValue={getParam(params, "sort")} />
                        </div>

                        {visibleJobs.length > 0 ? (
                            <div className="mt-6 flex flex-col gap-3">
                                {visibleJobs.map((job) => (
                                    <JobCard key={job._id ?? `${job.title}-${job.companyName}`} job={job} />
                                ))}
                            </div>
                        ) : (
                            <Card className="mt-6 gap-1 p-10 text-center">
                                <p className="font-medium">No jobs found</p>
                                <p className="text-sm text-muted-foreground">
                                    Try adjusting your search or filters.
                                </p>
                            </Card>
                        )}

                        <JobPagination page={page} totalPages={totalPages} />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default BrowseJobsPage;
