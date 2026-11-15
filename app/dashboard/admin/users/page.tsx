import { UsersManagement } from "@/app/components/users/UsersManagement";
import { getUsers } from "@/lib/actions/users";
import type { IManagedUser } from "@/types/userTypes";

const AdminUsersPage = async () => {
    const users: IManagedUser[] = await getUsers();

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
            <UsersManagement users={users} />
        </div>
    );
};

export default AdminUsersPage;
