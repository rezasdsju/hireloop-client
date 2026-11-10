'use client'
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Bookmark,
    Briefcase,
    CalendarClock,
    MapPin,
    Wallet,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { capitalize, formatDeadline, formatLocation, formatSalary, isClosed } from "@/lib/jobs/format";
import type { IJob } from "@/types/jobTypes";
import { authClient } from "@/lib/auth-client";
import { SkeletonLoading } from "../SkeletonLoading";
import { useRouter } from "next/navigation";
import { ApplyToAJob } from "@/lib/actions/applications";
import type { IApplication } from "@/types/applicationType";

type InfoCardProps = {
    icon: LucideIcon;
    label: string;
    value: string;
};

const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => {
    return (
        <Card className="gap-2 p-5">
            <Icon className="size-5 text-muted-foreground" />
            <p className="text-xs tracking-wider text-muted-foreground uppercase">{label}</p>
            <p className="text-base font-medium">{value}</p>
        </Card>
    );
};

type ContentSectionProps = {
    title: string;
    children: ReactNode;
};

const ContentSection = ({ title, children }: ContentSectionProps) => {
    return (
        <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
            <h2 className="font-heading text-xl font-semibold tracking-tight">{title}</h2>
            <div className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {children}
            </div>
        </section>
    );
};

type DetailRowProps = {
    label: string;
    value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0 last:pb-0">
            <span className="text-xs tracking-wider text-muted-foreground uppercase">{label}</span>
            <span className="text-right text-sm font-medium">{value}</span>
        </div>
    );
};

const CompanyOverview = ({ job }: { job: IJob }) => {

    return (
        <Card className="h-fit gap-5 p-6">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Company Overview</h2>

            <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-muted to-muted/40 text-4xl font-semibold text-muted-foreground">
                {job.companyName.charAt(0).toUpperCase()}
            </div>

            <div>
                <p className="font-medium">{job.companyName}</p>
                <div className="mt-3 flex flex-col">
                    <DetailRow label="Category" value={job.category} />
                    <DetailRow label="Work Mode" value={job.isRemote ? "Remote" : "On-site"} />
                    <DetailRow label="Job Type" value={capitalize(job.type)} />
                </div>
            </div>

            <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/browse-jobs" />}
                className="w-full"
            >
                Browse all jobs
            </Button>
        </Card>
    );
};

export const JobDetails = ({ job }: { job: IJob }) => {
    const closed = isClosed(job.deadline);
    const salary = formatSalary(job);
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    const handleApplyNow = async () => {
        if (isPending) {
            return <SkeletonLoading />
        }
        if (!user) {
            router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
            return
        } else if(user.role==='seeker'){
            // console.log('save the application to the database')
            const jobId = job._id
            if (jobId === undefined) return

            const application: IApplication = {
                jobId,
                userId: user.id,
                userEmail: user.email,
                jobTitle: job.title,
                companyName: job.companyName,
                companyLogo: "",
                location: job.location,
                salary: job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax} / ${job.salaryFrequency}` : "Not disclosed",
                employmentType: capitalize(job.type),
                status: "pending",
                appliedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            const result = await ApplyToAJob(application)
            console.log(result)
            if (result.insertedId){
               router.push('/browse-jobs') 
            }

        } else {
            console.log('User is not a seeker')
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <Card className="gap-6 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-5">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl font-semibold">
                        {job.companyName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                            {job.title}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-2.5">
                            <span className="text-lg text-muted-foreground">{job.companyName}</span>
                            <span
                                aria-hidden
                                className="size-1 rounded-full bg-muted-foreground/60"
                            />
                            <Badge variant="outline">{job.category}</Badge>
                            {closed && (
                                <Badge
                                    variant="outline"
                                    className="border-amber-500/40 bg-amber-500/10 text-amber-500"
                                >
                                    Closed
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        aria-label={`Save ${job.title}`}
                        className="size-12 rounded-lg"
                    >
                        <Bookmark />
                    </Button>
                    <Button
                        onClick={handleApplyNow}
                        type="button" className="h-12 px-7" disabled={closed}>
                        {closed ? "Applications Closed" : "Apply Now"}
                    </Button>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[1fr_397px]">
                <div className="flex flex-col gap-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <InfoCard
                            icon={Wallet}
                            label="Salary Range"
                            value={salary ?? "Not disclosed"}
                        />
                        <InfoCard icon={MapPin} label="Location" value={formatLocation(job)} />
                        <InfoCard icon={Briefcase} label="Job Type" value={capitalize(job.type)} />
                        <InfoCard
                            icon={CalendarClock}
                            label="Deadline"
                            value={formatDeadline(job.deadline)}
                        />
                    </div>

                    <Card className="gap-6 p-6">
                        <ContentSection title="Job Description">
                            {job.responsibilities}
                        </ContentSection>
                        <ContentSection title="Qualifications & Requirements">
                            {job.qualifications}
                        </ContentSection>
                    </Card>
                </div>

                <CompanyOverview job={job} />
            </div>
        </div>
    );
};
