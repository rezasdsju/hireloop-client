import Link from "next/link";
import {
    Briefcase,
    Building2,
    CalendarClock,
    CheckCircle2,
    Clock3,
    MapPin,
    Search,
    Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IApplication, ApplicationStatus } from "@/types/applicationType";
import { getApplications } from "@/lib/actions/applications";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
const statusStyles: Record<ApplicationStatus, string> = {
    pending: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    reviewing: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    interview: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    accepted: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    rejected: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const statusLabels: Record<ApplicationStatus, string> = {
    pending: "Pending",
    reviewing: "Reviewing",
    interview: "Interview",
    accepted: "Accepted",
    rejected: "Rejected",
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const ApplicationPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session)
    const applications: IApplication[] = await getApplications(`applicantId=${session?.user?.id}`);
    console.log(applications)
    const totalApplications = applications.length;
    const activeApplications = applications.filter(
        (application) => application.status !== "accepted" && application.status !== "rejected"
    ).length;
    const interviews = applications.filter((application) => application.status === "interview").length;

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        My Applications
                    </p>
                    <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                        Job applications
                    </h1>
                </div>

                <Button
                    className="w-full sm:w-auto"
                    size="lg"
                    render={<Link href="/browse-jobs" />}
                >
                    Explore jobs
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="gap-4 p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <Briefcase className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-semibold">{totalApplications}</p>
                    <p className="text-xs text-muted-foreground">Applications submitted</p>
                </Card>

                <Card className="gap-4 p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Active</p>
                        <Clock3 className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-semibold">{activeApplications}</p>
                    <p className="text-xs text-muted-foreground">Still under review</p>
                </Card>

                <Card className="gap-4 p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Interviews</p>
                        <Sparkles className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-semibold">{interviews}</p>
                    <p className="text-xs text-muted-foreground">Interview stage</p>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/30 px-5 py-4">
                    <div>
                        <CardTitle className="text-lg">Applications</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">
                        <Search className="size-3.5" />
                        {totalApplications} total
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="space-y-4 p-4 sm:p-5">
                        {applications.length > 0 ? applications.map((application) => (
                            <Card
                                key={application._id ?? `${application.jobId}-${application.appliedAt}`}
                                className="gap-4 p-4 sm:p-5"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-semibold text-muted-foreground">
                                            {application.companyLogo || application.companyName.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="truncate text-lg font-semibold">
                                                    {application.jobTitle}
                                                </h2>
                                                <Badge
                                                    variant="outline"
                                                    className={statusStyles[application.status]}
                                                >
                                                    {statusLabels[application.status]}
                                                </Badge>
                                            </div>

                                            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Building2 className="size-3.5" />
                                                    {application.companyName}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <MapPin className="size-3.5" />
                                                    {application.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            render={<Link href={`/browse-jobs/${application.jobId}`} />}
                                        >
                                            View role
                                        </Button>
                                        <Button variant="ghost">Withdraw</Button>
                                    </div>
                                </div>

                                <div className="grid gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                                    <div className="inline-flex items-center gap-2">
                                        <CalendarClock className="size-4" />
                                        Applied {formatDate(application.appliedAt)}
                                    </div>
                                    <div className="inline-flex items-center gap-2">
                                        <CheckCircle2 className="size-4" />
                                        {application.employmentType}
                                    </div>
                                    <div className="inline-flex items-center gap-2">
                                        <Briefcase className="size-4" />
                                        {application.salary || "Compensation undisclosed"}
                                    </div>
                                </div>
                            </Card>
                        )) : (
                            <div className="flex flex-col items-center gap-3 py-12 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                    <Briefcase className="size-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">No applications yet</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Explore open roles and track your applications here.
                                    </p>
                                </div>
                                <Button render={<Link href="/browse-jobs" />}>Browse jobs</Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ApplicationPage;