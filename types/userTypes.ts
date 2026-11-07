export interface IUser {
  name: string,
  email: string,
  image?: string | null | undefined,
  role: "seeker"| "recruiter"| "admin"
}