export type UserRole = "seeker" | "recruiter" | "admin";

export type UserStatus = "active" | "suspended";

export interface IUser {
  name: string,
  email: string,
  image?: string | null | undefined,
  role: UserRole
}

export interface IManagedUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role?: UserRole;
  premium?: boolean;
  banned?: boolean;
  image?: string | null;
}
