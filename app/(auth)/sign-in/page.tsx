import type { Metadata } from "next"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { IoLogoGithub } from "react-icons/io5"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Sign in - HireLoop",
  description: "Sign in to your HireLoop account.",
}

// UI only. No auth logic is wired up yet, so every button is type="button"
// and the form cannot submit.
export default function SignInPage() {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to continue your job search.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <Button type="button" variant="outline" className="h-10 w-full">
          <FcGoogle className="size-4" />
          Continue with Google
        </Button>
        <Button type="button" variant="outline" className="h-10 w-full">
          <IoLogoGithub className="size-4" />
          Continue with GitHub
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs whitespace-nowrap text-muted-foreground">
          or continue with email
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-10"
          />
        </div>

        <Button
          type="button"
          className="h-10 w-full bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
