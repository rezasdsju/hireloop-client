
import RegisterForm from "@/components/auth/RegisterForm"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Sign up - HireLoop",
  description: "Create a HireLoop account to find jobs or hire talent.",
}

export default function RegisterPage() {

  return (
    <RegisterForm />
  )
}
