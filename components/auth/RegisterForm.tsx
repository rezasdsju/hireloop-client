'use client'
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { IoLogoGithub } from "react-icons/io5"
import { Building2, Search, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "../ui/toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const roles = [
    { value: "seeker", label: "Job Seeker", icon: Search },
    { value: "recruiter", label: "Recruiter", icon: Building2 },
    { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

type Role = (typeof roles)[number]["value"]


const RegisterForm = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [role, setRole] = useState<Role>("seeker")
    const router = useRouter()
    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsRegistered(true)
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())
        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            password: userData.password as string,
            role
        })
        if (error) {
            toast.add({
                type: 'error',
                description: `${error.message}`,
                priority: 'high'
            })
            setIsRegistered(false)

        }
        if (data) {
            toast.add({
                type: 'success',
                description: 'You have successfully Registered!',
                priority: 'high'
            })
            setIsRegistered(true)
            setTimeout(()=>router.replace('/'),1500)
        }

    }
    return (
        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    Find your next role or hire your next teammate.
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

            <form onSubmit={handleRegister} className="grid gap-4">
                <fieldset className="grid gap-2">
                    <legend className="mb-2 text-sm font-medium">I am a</legend>
                    <div className="grid grid-cols-3 gap-2">
                        {roles.map(({ value, label, icon: Icon }) => (
                            <label
                                key={value}
                                className={cn(
                                    "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-center text-xs font-medium transition-colors has-focus-visible:ring-2 has-focus-visible:ring-indigo-500/40",
                                    role === value
                                        ? "border-indigo-600 bg-indigo-600/10 text-foreground"
                                        : "border-border text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={value}
                                    checked={role === value}
                                    onChange={() => setRole(value)}
                                    className="sr-only"
                                />
                                <Icon className="size-4" />
                                {label}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        className="h-10"
                    />
                </div>

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
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                        Use at least 8 characters.
                    </p>
                </div>

                <Button
                    disabled={isRegistered}
                    type="submit"
                    className="h-10 w-full bg-indigo-600 text-white hover:bg-indigo-500"
                >
                    Create account
                </Button>
            </form>

            <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                    Privacy Policy
                </Link>
                .
            </p>

            <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;