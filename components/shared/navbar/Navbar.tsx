'use client'
import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { MobileMenu } from "./MobileMenu"
import ThemeToggle from "./ThemeToggle"
import { authClient } from "@/lib/auth-client"
import UserAvatar from "./UserAvatar"
import { SkeletonAvatar } from "./SkeletonAvatar"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const Navbar = () => {

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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {
              isPending ? <SkeletonAvatar /> :
                user ? <div className="flex items-center gap-2">
                  <UserAvatar user={user} />
                  <button className="hidden min-[400px]:flex">Sign Out</button>
                </div> :
                  <div className="flex items-center gap-2">
                    <Link
                      href="/sign-in"
                      className="hidden text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 md:inline dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "hidden h-10 rounded-lg bg-indigo-600 px-5 text-white hover:bg-indigo-500 md:inline-flex"
                      )}
                    >
                      Get Started
                    </Link>
                  </div>

            }


            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
