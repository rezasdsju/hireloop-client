

import Link from "next/link";
import { Clock, Eye, Mail, Plus, Trash, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { IJobs } from "@/types/jobTypes";
import { getJobs } from "@/lib/api/jobs";

// const jobs: IJobs[] = [
//     {
//         title: "Senior Product Designer",
//         companyName: "Nexus Lab",
//         category: "Design",
//         type: "full-time",
//         isRemote: false,
//         location: "London, UK",
//         deadline: "2026-12-24",
//         salaryMin: 90000,
//         salaryMax: 115000,
//         salaryFrequency: "per year",
//         responsibilities: "Lead product design for the core hiring experience.",
//         qualifications: "5+ years designing B2B SaaS products.",
//     },
//     {
//         title: "Full-stack Engineer",
//         companyName: "Quantum",
//         category: "Engineering",
//         type: "contract",
//         isRemote: true,
//         location: "Berlin, Germany",
//         deadline: "2027-01-22",
//         salaryMin: 70,
//         salaryMax: 95,
//         salaryFrequency: "per hour",
//         responsibilities: "Ship end-to-end features across the platform.",
//         qualifications: "Strong TypeScript and Node.js background.",
//     },
//     {
//         title: "Marketing Director",
//         companyName: "Vanguard",
//         category: "Marketing",
//         type: "full-time",
//         isRemote: false,
//         location: "New York, USA",
//         deadline: "2026-10-15",
//         salaryMin: 120000,
//         salaryMax: 150000,
//         salaryFrequency: "per year",
//         responsibilities: "Own brand strategy and demand generation.",
//         qualifications: "10+ years in B2B marketing leadership.",
//     },
//     {
//         title: "Backend Architect",
//         companyName: "CloudScale",
//         category: "Engineering",
//         type: "full-time",
//         isRemote: true,
//         location: "EU / US",
//         deadline: "2027-02-20",
//         salaryMin: 130000,
//         salaryMax: 165000,
//         salaryFrequency: "per year",
//         responsibilities: "Design distributed services and data models.",
//         qualifications: "Deep experience with distributed systems.",
//     },
//     {
//         title: "UX Research Lead",
//         companyName: "Humanize",
//         category: "Design",
//         type: "part-time",
//         isRemote: true,
//         location: "Dublin, Ireland",
//         deadline: "2027-03-19",
//         salaryMin: 45,
//         salaryMax: 60,
//         salaryFrequency: "per hour",
//         responsibilities: "Run discovery studies and usability testing.",
//         qualifications: "Mixed-methods research experience.",
//     },
// ];

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

const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

const isClosed = (deadline: string) => new Date(deadline).getTime() < Date.now();

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const ManageJobsPage = async() => {
    const jobs:IJobs[] = await getJobs()
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="font-heading text-2xl font-semibold tracking-tight">
                        Manage Jobs
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Oversee all active listings and historical job posts across the platform.
                    </p>
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href="/dashboard/recruiter/jobs/new" />}
                    className="shrink-0 gap-2"
                >
                    <Plus />
                    Create Job
                </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label>Status</Label>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Category</Label>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Title
                            </TableHead>
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Company
                            </TableHead>
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Category
                            </TableHead>
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Type
                            </TableHead>
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Deadline
                            </TableHead>
                            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                                Status
                            </TableHead>
                            <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => {
                            const closed = isClosed(job.deadline);

                            return (
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
                                        <Badge
                                            variant="outline"
                                            className={
                                                closed
                                                    ? "text-muted-foreground"
                                                    : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                                            }
                                        >
                                            <span className="size-1.5 rounded-full bg-current" />
                                            {closed ? "Closed" : "Active"}
                                        </Badge>
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
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Delete ${job.title}`}
                                                className="text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <stat.icon className="size-3.5" />
                                <span>{stat.label}</span>
                            </div>
                            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                            <div className={`text-xs ${stat.noteClassName}`}>{stat.note}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageJobsPage;
