'use client'
import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { MobileMenu } from "./MobileMenu"
import ThemeToggle from "./ThemeToggle"
import { authClient } from "@/lib/auth-client"
import { SkeletonAvatar } from "./SkeletonAvatar"
import { ProfileMenu } from "./ProfileMenu"
import useSignOut from "@/hooks/use-sign-out"
import { SkeletonForDashboardNavLink } from "./SkeletonForDashboardNavLink"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const Navbar = () => {
  const { handleSignOut, isSignedOut } = useSignOut()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  return (
    <header className="sticky -top-3 z-50 bg-background px-4 pt-3">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-8 rounded-2xl border border-border bg-card/95 px-5 shadow-sm backdrop-blur-md"
      >
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="hireloop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {
              isPending ? <SkeletonForDashboardNavLink></SkeletonForDashboardNavLink> : user && (user?.role && user?.role === 'admin' ? <Link href={`/dashboard/admin`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link> :
                user?.role === 'seeker' ? <Link href={`/dashboard/seeker`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link> :
                  <Link href={`/dashboard/seeker`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>)
            }
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="hidden h-5 w-px bg-border md:block" />

          <div className="flex items-center gap-5">
            <div>
              <ThemeToggle />
            </div>
            <div>
              {
                isPending ? <SkeletonAvatar /> :
                  user ?
                    <div className="flex items-center  gap-8">
                      <span><ProfileMenu user={user} /></span>
                      <button
                        disabled={isSignedOut}
                        onClick={handleSignOut}
                        className="hidden h-9 items-center justify-center rounded-lg border border-border px-3.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none min-[500px]:flex cursor-pointer">
                        Sign Out
                      </button>
                    </div> :
                    <div >
                      <div className="hidden md:flex">
                        <div className="flex items-center gap-2">
                          <Link
                            href="/sign-in"
                            className="hidden text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 md:inline dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                          >
                            Sign In
                          </Link>

                          <Link
                            href="/register"
                            className={cn(
                              buttonVariants({ size: "lg" }),
                              "hidden h-10 rounded-lg bg-indigo-600 px-5 text-white hover:bg-indigo-500 md:inline-flex ccursor-pointer"
                            )}
                          >
                            Get Started
                          </Link>
                        </div>
                      </div>
                      <div className="flex md:hidden">
                        <MobileMenu />
                      </div>
                    </div>


              }
            </div>



          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
