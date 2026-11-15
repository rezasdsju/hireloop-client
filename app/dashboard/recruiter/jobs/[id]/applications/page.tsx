import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Clock3, Sparkles, Users } from "lucide-react";

import { ApplicationsTable } from "@/app/components/applications/ApplicationsTable";
import { PageHeader } from "@/app/components/jobs/PageHeader";
import { StatCard } from "@/app/components/jobs/StatCard";
import { Button } from "@/components/ui/button";
import { getApplicationsByJobId } from "@/lib/actions/applications";
import { getJobById } from "@/lib/api/jobs";
import { capitalize, formatLocation } from "@/lib/jobs/format";
import type { IApplication } from "@/types/applicationType";

type JobApplicationsPageProps = {
    params: Promise<{ id: string }>;
};

const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
    const { id } = await params;

    const [job, applications] = await Promise.all([
        getJobById(id).catch(() => null),
        getApplicationsByJobId(id).catch(() => [] as IApplication[]),
    ]);

    if (!job?._id) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <PageHeader
                    title="Job not found"
                    description="This job post may have been deleted, or the link you followed is no longer valid."
                    actions={
                        <Button
                            nativeButton={false}
                            render={<Link href="/dashboard/recruiter/jobs" />}
                        >
                            <ArrowLeft />
                            Back to jobs
                        </Button>
                    }
                />
            </div>
        );
    }

    const totalApplications = applications.length;
    const pendingApplications = applications.filter(
        (application) => application.status === "pending"
    ).length;
    const inProgressApplications = applications.filter(
        (application) =>
            application.status === "reviewing" || application.status === "interview"
    ).length;
    const decidedApplications = applications.filter(
        (application) =>
            application.status === "accepted" || application.status === "rejected"
    ).length;

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
            >
                <Link href="/dashboard/recruiter/jobs" className="hover:text-foreground">
                    Manage Jobs
                </Link>
                <ChevronRight className="size-3" aria-hidden="true" />
                <span className="max-w-40 truncate">{job.title}</span>
                <ChevronRight className="size-3" aria-hidden="true" />
                <span className="text-foreground">Applications</span>
            </nav>

            <PageHeader
                className="mt-3"
                title="Job applications"
                description={`${job.title} · ${job.companyName} · ${formatLocation(job)} · ${capitalize(job.type)}`}
                actions={
                    <Button
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/dashboard/recruiter/jobs" />}
                    >
                        <ArrowLeft />
                        Back to jobs
                    </Button>
                }
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total applicants"
                    value={String(totalApplications)}
                    note="Applications on this job"
                    noteClassName="text-muted-foreground"
                    icon={Users}
                />
                <StatCard
                    label="Pending review"
                    value={String(pendingApplications)}
                    note="Waiting for a decision"
                    noteClassName="text-amber-500"
                    icon={Clock3}
                />
                <StatCard
                    label="In progress"
                    value={String(inProgressApplications)}
                    note="Reviewing or interviewing"
                    noteClassName="text-sky-500"
                    icon={Sparkles}
                />
                <StatCard
                    label="Decided"
                    value={String(decidedApplications)}
                    note="Accepted or rejected"
                    noteClassName="text-emerald-500"
                    icon={CheckCircle2}
                />
            </div>

            <ApplicationsTable applications={applications} />
        </div>
    );
};

export default JobApplicationsPage;
