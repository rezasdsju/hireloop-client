"use server"

import type { IManagedUser, UserRole } from "@/types/userTypes";
import { authFetch, protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export type UpdateUserRoleResult = {
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
};

export const getUsers = async (): Promise<IManagedUser[]> => {
    const response = await authFetch(`${BASE_URL}/users`);

    if (!response.ok) {
        throw new Error(
            `Failed to load users: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};

export const updateUserRole = async (
    userId: string,
    role: UserRole
): Promise<UpdateUserRoleResult> => {
    const response = await protectedMutation(
        `${BASE_URL}/users/${userId}/role`,
        'PATCH',
        { role }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to update user role: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};
