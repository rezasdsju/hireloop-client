import Link from "next/link";
import { Clock, Eye, Mail, Plus, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { IJob } from "@/types/jobTypes";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";
import { FormField } from "@/app/components/jobs/FormField";
import { PageHeader } from "@/app/components/jobs/PageHeader";
import { StatCard } from "@/app/components/jobs/StatCard";
import { StatusBadge } from "@/app/components/jobs/StatusBadge";
import { TableHeadCell } from "@/app/components/jobs/TableHeadCell";
import { capitalize, formatDeadline, isClosed } from "@/lib/jobs/format";
import { JOB_CATEGORY_FILTERS, JOB_STATUS_FILTERS } from "@/lib/jobs/options";

const stats = [
    {
        label: "Engagement Rate",
        value: "82.4%",
        note: "+5.2% from last month",
        noteClassName: "text-emerald-500",
        icon: TrendingUp,
    },
    {
        label: "Avg. Time to Fill",
        value: "14 Days",
        note: "Stable performance",
        noteClassName: "text-muted-foreground",
        icon: Clock,
    },
    {
        label: "Total Applications",
        value: "12,840",
        note: "-2.1% across tech sectors",
        noteClassName: "text-amber-500",
        icon: Mail,
    },
];

const ManageJobsPage = async () => {
    const jobs: IJob[] = await getJobs();

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
            <PageHeader
                title="Manage Jobs"
                description="Oversee all active listings and historical job posts across the platform."
                actions={
                    <Button
                        nativeButton={false}
                        render={<Link href="/dashboard/recruiter/jobs/new" />}
                        className="shrink-0 gap-2"
                    >
                        <Plus />
                        Create Job
                    </Button>
                }
            />

            <div className="mt-6 flex flex-wrap items-end gap-4">
                <FormField label="Status">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {JOB_STATUS_FILTERS.map((filter) => (
                                <SelectItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Category">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {JOB_CATEGORY_FILTERS.map((filter) => (
                                <SelectItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <div className="flex items-center gap-2">
                    <Button type="button" size="sm">
                        Active (128)
                    </Button>
                    <Button type="button" size="sm" variant="outline">
                        Closed (45)
                    </Button>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-foreground/10">
                <Table className="min-w-205">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHeadCell>Title</TableHeadCell>
                            <TableHeadCell>Company</TableHeadCell>
                            <TableHeadCell>Category</TableHeadCell>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Deadline</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell className="text-right">Actions</TableHeadCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={`${job._id}-${job.title}`}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-medium">
                                            {job.companyName.charAt(0).toUpperCase()}
                                        </span>
                                        <span>{job.companyName}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{job.category}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {capitalize(job.type)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {formatDeadline(job.deadline)}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge closed={isClosed(job.deadline)} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label={`View ${job.title}`}
                                            className="text-muted-foreground"
                                        >
                                            <Eye />
                                        </Button>
                                        <DeleteJobDialog job={job} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>
        </div>
    );
};

export default ManageJobsPage;
