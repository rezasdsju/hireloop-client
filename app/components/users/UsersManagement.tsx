"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Ban,
    BriefcaseBusiness,
    CheckCircle2,
    Download,
    Search,
    Users,
} from "lucide-react";

import { PageHeader } from "@/app/components/jobs/PageHeader";
import { StatCard } from "@/app/components/jobs/StatCard";
import { UsersTable, type UsersTableRow } from "@/app/components/users/UsersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { formatJoinDate, formatUserCount } from "@/lib/users/format";
import {
    resolveUserRole,
    USER_ROLE_FILTERS,
    USER_ROLE_META,
    type UserRoleFilter,
} from "@/lib/users/roles";
import { USER_STATUS_META } from "@/lib/users/status";
import type { IManagedUser, UserRole, UserStatus } from "@/types/userTypes";
import { updateUserRole } from "@/lib/actions/users";

type UsersManagementProps = {
    users: IManagedUser[];
};

export const UsersManagement = ({ users }: UsersManagementProps) => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<UserRoleFilter>("all");
    const [roleOverrides, setRoleOverrides] = useState<Record<string, UserRole>>({});
    const [statusOverrides, setStatusOverrides] = useState<Record<string, UserStatus>>({});
    const [deletedIds, setDeletedIds] = useState<Record<string, boolean>>({});
    const [pendingRoleIds, setPendingRoleIds] = useState<Record<string, boolean>>({});

    const rows = useMemo<UsersTableRow[]>(() => {
        return users
            .filter((user) => !deletedIds[user._id])
            .map((user) => ({
                user,
                role: roleOverrides[user._id] ?? resolveUserRole(user.role),
                status: statusOverrides[user._id] ?? (user.banned ? "suspended" : "active"),
            }));
    }, [users, deletedIds, roleOverrides, statusOverrides]);

    const filteredRows = useMemo(() => {
        const term = query.trim().toLowerCase();

        return rows.filter((row) => {
            const matchesRole = roleFilter === "all" || row.role === roleFilter;
            const matchesQuery =
                term.length === 0 ||
                row.user.name.toLowerCase().includes(term) ||
                row.user.email.toLowerCase().includes(term);

            return matchesRole && matchesQuery;
        });
    }, [rows, query, roleFilter]);

    const stats = useMemo(() => {
        return {
            total: rows.length,
            active: rows.filter((row) => row.status === "active").length,
            recruiters: rows.filter((row) => row.role === "recruiter").length,
            suspended: rows.filter((row) => row.status === "suspended").length,
        };
    }, [rows]);

    const activeShare =
        stats.total === 0 ? 0 : Math.round((stats.active / stats.total) * 100);

    const handleRoleChange = async (row: UsersTableRow, role: UserRole) => {
        if (row.role === role) return;

        const userId = row.user._id;
        const previousRole = row.role;

        // Optimistically show the new role, then keep it only if the API accepts it.
        setRoleOverrides((current) => ({ ...current, [userId]: role }));
        setPendingRoleIds((current) => ({ ...current, [userId]: true }));

        try {
            const { matchedCount } = await updateUserRole(userId, role);

            if (matchedCount === 0) {
                throw new Error("This user no longer exists.");
            }

            toast.add({
                type: "success",
                description: `Role updated to ${USER_ROLE_META[role].label}`,
                priority: "high",
            });
            router.refresh();
        } catch (error) {
            setRoleOverrides((current) => {
                const next = { ...current };

                if (previousRole === resolveUserRole(row.user.role)) delete next[userId];
                else next[userId] = previousRole;

                return next;
            });

            toast.add({
                type: "error",
                description:
                    error instanceof Error ? error.message : "Failed to update role",
                priority: "high",
            });
        } finally {
            setPendingRoleIds((current) => {
                const next = { ...current };
                delete next[userId];
                return next;
            });
        }
    };

    const handleToggleStatus = (row: UsersTableRow) => {
        const nextStatus: UserStatus = row.status === "active" ? "suspended" : "active";

        setStatusOverrides((current) => ({ ...current, [row.user._id]: nextStatus }));
        // TODO: persist the status change once the users API exposes a status endpoint.
    };

    const handleDelete = (row: UsersTableRow) => {
        setDeletedIds((current) => ({ ...current, [row.user._id]: true }));
        // TODO: call the delete user endpoint once it is available.
    };

    const handleClearFilters = () => {
        setQuery("");
        setRoleFilter("all");
    };

    const handleExport = () => {
        const header = ["Name", "Email", "Role", "Status", "Join date"];
        const data = filteredRows.map((row) => [
            row.user.name,
            row.user.email,
            USER_ROLE_META[row.role].label,
            USER_STATUS_META[row.status].label,
            formatJoinDate(row.user.createdAt),
        ]);

        const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
        const csv = [header, ...data]
            .map((cells) => cells.map(escapeCell).join(","))
            .join("\r\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `hireloop-users-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const isFiltered = query.trim().length > 0 || roleFilter !== "all";

    return (
        <>
            <PageHeader
                title="Users"
                description="Manage everyone on HireLoop, review their roles, and keep access under control."
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <Select<UserRoleFilter>
                            value={roleFilter}
                            onValueChange={(nextValue) => {
                                if (nextValue) setRoleFilter(nextValue);
                            }}
                        >
                            <SelectTrigger
                                className="w-40"
                                aria-label="Filter users by role"
                            >
                                <SelectValue>
                                    {(currentValue) =>
                                        USER_ROLE_FILTERS.find(
                                            (filter) => filter.value === currentValue
                                        )?.label ?? "All roles"
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent align="start">
                                {USER_ROLE_FILTERS.map((filter) => (
                                    <SelectItem key={filter.value} value={filter.value}>
                                        {filter.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleExport}
                            disabled={filteredRows.length === 0}
                        >
                            <Download aria-hidden="true" />
                            Export list
                        </Button>
                    </div>
                }
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total users"
                    value={formatUserCount(stats.total)}
                    note="All registered accounts"
                    noteClassName="text-muted-foreground"
                    icon={Users}
                />
                <StatCard
                    label="Active users"
                    value={formatUserCount(stats.active)}
                    note={`${activeShare}% of all users`}
                    noteClassName="text-emerald-500"
                    icon={CheckCircle2}
                />
                <StatCard
                    label="Recruiters"
                    value={formatUserCount(stats.recruiters)}
                    note="Hiring accounts"
                    noteClassName="text-sky-500"
                    icon={BriefcaseBusiness}
                />
                <StatCard
                    label="Suspended"
                    value={formatUserCount(stats.suspended)}
                    note="Access disabled"
                    noteClassName="text-rose-500"
                    icon={Ban}
                />
            </div>

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
                            placeholder="Search by name or email"
                            aria-label="Search users by name or email"
                            autoComplete="off"
                            className="pl-8"
                        />
                    </div>

                    <p className="ml-auto text-xs text-muted-foreground">
                        Showing {filteredRows.length} of {rows.length} users
                    </p>
                </div>

                <UsersTable
                    rows={filteredRows}
                    hasUsers={rows.length > 0}
                    isFiltered={isFiltered}
                    pendingRoleIds={pendingRoleIds}
                    onRoleChange={handleRoleChange}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                    onClearFilters={handleClearFilters}
                />
            </div>
        </>
    );
};
