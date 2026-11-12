import { Briefcase, Building2, Tag } from "lucide-react"

export const navLinks = [
  { label: "Browse Jobs", href: "/browse-jobs", icon: Briefcase },
  { label: "Company", href: "/company", icon: Building2 },
  { label: "Pricing", href: "/pricing", icon: Tag },
]

export const dashboardByRole: Record<string, string> = {
  admin: "/dashboard/admin",
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
}

export const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`)
