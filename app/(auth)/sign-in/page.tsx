import { SkeletonLoading } from "@/app/components/SkeletonLoading"
import SignInForm from "@/components/auth/SignInForm"
import type { Metadata } from "next"
import { Suspense } from "react"


export const metadata: Metadata = {
  title: "Sign in - HireLoop",
  description: "Sign in to your HireLoop account.",
}

// UI only. No auth logic is wired up yet, so every button is type="button"
// and the form cannot submit.
export default function SignInPage() {
  return (
    <Suspense fallback={<div><SkeletonLoading /></div>}>
      <SignInForm />
    </Suspense>
  )
}
