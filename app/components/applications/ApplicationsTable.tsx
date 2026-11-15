"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Search, UserRoundSearch } from "lucide-react";

import { ApplicationStatusSelect } from "@/app/components/applications/ApplicationStatusSelect";
import { TableHeadCell } from "@/app/components/jobs/TableHeadCell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
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
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatApplicantInitial, formatApplicationDate } from "@/lib/applications/format";
import { APPLICATION_STATUS_OPTIONS } from "@/lib/applications/status";
import type { ApplicationStatus, IApplication } from "@/types/applicationType";
import { updateApplicationStatus } from "@/lib/actions/applications";

type StatusFilter = ApplicationStatus | "all";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All statuses" },
    ...APPLICATION_STATUS_OPTIONS.map(({ value, label }) => ({ value, label })),
];

const getApplicationKey = (application: IApplication) =>
    application._id ?? `${application.userId}-${application.appliedAt}`;

type ApplicationsTableProps = {
    applications: IApplication[];
};

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [statusOverrides, setStatusOverrides] = useState<Record<string, ApplicationStatus>>({});
    const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});

    const getStatus = (application: IApplication) =>
        statusOverrides[getApplicationKey(application)] ?? application.status;

    const filteredApplications = useMemo(() => {
        const term = query.trim().toLowerCase();

        return applications.filter((application) => {
            const status = statusOverrides[getApplicationKey(application)] ?? application.status;
            const matchesStatus = statusFilter === "all" || status === statusFilter;
            const matchesQuery =
                term.length === 0 || application.userEmail.toLowerCase().includes(term);

            return matchesStatus && matchesQuery;
        });
    }, [applications, query, statusFilter, statusOverrides]);

    const handleStatusChange = async (application: IApplication, status: ApplicationStatus) => {
        if (!application._id) return;

        const key = getApplicationKey(application);
        const previousStatus = statusOverrides[key] ?? application.status;
        if (previousStatus === status) return;

        // Optimistically show the new status, then keep it only if the API accepts it.
        setStatusOverrides((current) => ({ ...current, [key]: status }));
        setPendingIds((current) => ({ ...current, [key]: true }));

        try {
            const { matchedCount } = await updateApplicationStatus(application._id, { status });

            if (matchedCount === 0) {
                throw new Error("This application no longer exists.");
            }

            toast.add({
                type: "success",
                description: "Application status updated",
                priority: "high",
            });
            router.refresh();
        } catch (error) {
            setStatusOverrides((current) => {
                const next = { ...current };

                if (previousStatus === application.status) delete next[key];
                else next[key] = previousStatus;

                return next;
            });

            toast.add({
                type: "error",
                description:
                    error instanceof Error ? error.message : "Failed to update status",
                priority: "high",
            });
        } finally {
            setPendingIds((current) => {
                const next = { ...current };
                delete next[key];
                return next;
            });
        }
    };

    const resetFilters = () => {
        setQuery("");
        setStatusFilter("all");
    };

    return (
        <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/30 px-4 py-3">
                <div className="relative min-w-0 flex-1 sm:max-w-xs">
                    <Search
                        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <Input
                        type="search"
                        value={query}
                        onInput={(event) => setQuery(event.currentTarget.value)}
                        placeholder="Search by applicant email"
                        aria-label="Search applications by applicant email"
                        className="pl-8"
                    />
                </div>

                <Select
                    value={statusFilter}
                    onValueChange={(nextValue) => {
                        if (nextValue) setStatusFilter(nextValue);
                    }}
                >
                    <SelectTrigger
                        className="w-full sm:w-44"
                        aria-label="Filter applications by status"
                    >
                        <SelectValue>
                            {(currentValue) =>
                                STATUS_FILTERS.find(
                                    (filter) => filter.value === currentValue
                                )?.label ?? "All statuses"
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                        {STATUS_FILTERS.map((filter) => (
                            <SelectItem key={filter.value} value={filter.value}>
                                {filter.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <p className="ml-auto text-xs text-muted-foreground">
                    Showing {filteredApplications.length} of {applications.length}
                </p>
            </div>

            {filteredApplications.length === 0 ? (
                <ApplicationsEmptyState
                    hasApplications={applications.length > 0}
                    onResetFilters={resetFilters}
                />
            ) : (
                <Table className="min-w-175">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHeadCell>Applicant</TableHeadCell>
                            <TableHeadCell>Applied</TableHeadCell>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Expected salary</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell className="text-right">Actions</TableHeadCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplications.map((application) => {
                            const key = getApplicationKey(application);

                            return (
                                <TableRow key={key}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium">
                                                {formatApplicantInitial(application.userEmail)}
                                            </span>
                                            <span className="font-medium">{application.userEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatApplicationDate(application.appliedAt)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {application.employmentType}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {application.salary || "Not disclosed"}
                                    </TableCell>
                                    <TableCell>
                                        <ApplicationStatusSelect
                                            applicationId={key}
                                            value={getStatus(application)}
                                            disabled={Boolean(pendingIds[key])}
                                            onValueChange={(status) =>
                                                void handleStatusChange(application, status)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                nativeButton={false}
                                                render={<a href={`mailto:${application.userEmail}`} />}
                                            >
                                                <Mail aria-hidden="true" />
                                                Email
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

type ApplicationsEmptyStateProps = {
    hasApplications: boolean;
    onResetFilters: () => void;
};

const ApplicationsEmptyState = ({ hasApplications, onResetFilters }: ApplicationsEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <UserRoundSearch className="size-5" aria-hidden="true" />
            </span>
            <div>
                <h2 className="font-medium">
                    {hasApplications ? "No applications match your filters" : "No applications yet"}
                </h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {hasApplications
                        ? "Try a different email or clear the status filter."
                        : "Applications will show up here as soon as candidates apply to this job."}
                </p>
            </div>
            {hasApplications && (
                <Button variant="outline" size="sm" onClick={onResetFilters}>
                    Clear filters
                </Button>
            )}
        </div>
    );
};
