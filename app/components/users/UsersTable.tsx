"use client";

import { Ban, CheckCircle2, UserRoundSearch } from "lucide-react";

import { DeleteUserDialog } from "@/app/components/users/DeleteUserDialog";
import { UserRoleBadge } from "@/app/components/users/UserRoleBadge";
import { UserRoleSelect } from "@/app/components/users/UserRoleSelect";
import { UserStatusBadge } from "@/app/components/users/UserStatusBadge";
import { TableHeadCell } from "@/app/components/jobs/TableHeadCell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatJoinDate, getUserInitials } from "@/lib/users/format";
import type { IManagedUser, UserRole, UserStatus } from "@/types/userTypes";

export type UsersTableRow = {
    user: IManagedUser;
    role: UserRole;
    status: UserStatus;
};

type UsersTableProps = {
    rows: UsersTableRow[];
    hasUsers: boolean;
    isFiltered: boolean;
    pendingRoleIds: Record<string, boolean>;
    onRoleChange: (row: UsersTableRow, role: UserRole) => void;
    onToggleStatus: (row: UsersTableRow) => void;
    onDelete: (row: UsersTableRow) => void;
    onClearFilters: () => void;
};

export const UsersTable = ({
    rows,
    hasUsers,
    isFiltered,
    pendingRoleIds,
    onRoleChange,
    onToggleStatus,
    onDelete,
    onClearFilters,
}: UsersTableProps) => {
    if (rows.length === 0) {
        return (
            <UsersEmptyState
                hasUsers={hasUsers}
                isFiltered={isFiltered}
                onClearFilters={onClearFilters}
            />
        );
    }

    return (
        <Table className="min-w-225">
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHeadCell>User name</TableHeadCell>
                    <TableHeadCell>Email address</TableHeadCell>
                    <TableHeadCell>Role</TableHeadCell>
                    <TableHeadCell>Join date</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell className="text-right">Actions</TableHeadCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.user._id}>
                        <TableCell>
                            <div className="flex items-center gap-2.5">
                                <Avatar size="sm">
                                    {row.user.image && (
                                        <AvatarImage src={row.user.image} alt="" />
                                    )}
                                    <AvatarFallback className="text-[11px] font-medium">
                                        {getUserInitials(row.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{row.user.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="max-w-56 truncate text-muted-foreground">
                            {row.user.email}
                        </TableCell>
                        <TableCell>
                            <UserRoleBadge role={row.role} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {formatJoinDate(row.user.createdAt)}
                        </TableCell>
                        <TableCell>
                            <UserStatusBadge status={row.status} />
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center justify-end gap-1">
                                <UserRoleSelect
                                    userName={row.user.name}
                                    disabled={Boolean(pendingRoleIds[row.user._id])}
                                    onValueChange={(role) => onRoleChange(row, role)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onToggleStatus(row)}
                                    className={
                                        row.status === "active"
                                            ? "text-muted-foreground hover:text-destructive"
                                            : "text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                                    }
                                >
                                    {row.status === "active" ? (
                                        <Ban aria-hidden="true" />
                                    ) : (
                                        <CheckCircle2 aria-hidden="true" />
                                    )}
                                    {row.status === "active" ? "Suspend" : "Activate"}
                                </Button>
                                <DeleteUserDialog
                                    user={row.user}
                                    onConfirm={() => onDelete(row)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

type UsersEmptyStateProps = {
    hasUsers: boolean;
    isFiltered: boolean;
    onClearFilters: () => void;
};

const UsersEmptyState = ({
    hasUsers,
    isFiltered,
    onClearFilters,
}: UsersEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <UserRoundSearch className="size-5" aria-hidden="true" />
            </span>
            <div>
                <h2 className="font-medium">
                    {hasUsers && isFiltered
                        ? "No users match your filters"
                        : "No users yet"}
                </h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {hasUsers && isFiltered
                        ? "Try a different name, email, or role."
                        : "Users will show up here as soon as they create an account."}
                </p>
            </div>
            {hasUsers && isFiltered && (
                <Button variant="outline" size="sm" onClick={onClearFilters}>
                    Clear filters
                </Button>
            )}
        </div>
    );
};
