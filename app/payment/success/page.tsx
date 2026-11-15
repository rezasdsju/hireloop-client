import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ReceiptText,
  ShieldCheck,
} from "lucide-react"

import { CopyButton } from "./CopyButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { checkoutVerify } from "@/lib/actions/payment"
import { getStripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Payment successful · HireLoop",
  description: "Your HireLoop Pro payment has been received.",
}

const formatAmount = (amount: number | null, currency: string | null) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format((amount ?? 0) / 100)

const formatPaidOn = (created: number) =>
  `${new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(created * 1000))} UTC`

function DetailRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium break-all sm:text-right">
        {children}
      </dd>
    </div>
  )
}

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) => {
  const { session_id } = await searchParams
  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const session = await getStripe().checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  const {
    status,
    payment_status,
    customer_email,
    customer_details,
    line_items,
    payment_intent,
    amount_total,
    currency,
    created,
  } = session

  if (status === "open") redirect("/")
  if (status !== "complete" || payment_status !== "paid") redirect("/payment")

  await checkoutVerify(session_id)

  const intent =
    payment_intent && typeof payment_intent !== "string" ? payment_intent : null
  const transactionId = intent?.id ?? session.id
  const planName = line_items?.data[0]?.description ?? "Hireloop Pro Plan"
  const email =
    customer_details?.email ?? customer_email ?? "your email address"
  const method = intent?.payment_method_types?.[0] ?? "card"
  const paymentMethod =
    method === "card"
      ? "Card"
      : method.charAt(0).toUpperCase() + method.slice(1)

  return (
    <main className="min-h-svh bg-background dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 lg:py-14">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to jobs"
            nativeButton={false}
            render={<Link href="/browse-jobs" />}
          >
            <ArrowLeft />
          </Button>
          <Badge
            variant="outline"
            className="gap-1.5 text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
          >
            <ReceiptText className="size-3" aria-hidden="true" />
            Receipt
          </Badge>
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/25 ring-inset dark:text-emerald-400">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Payment successful
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            Thanks for subscribing to {planName}. We&apos;ve emailed your
            receipt to{" "}
            <span className="font-medium break-all text-foreground">
              {email}
            </span>
            .
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/40 dark:bg-white/2">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Amount paid
              </span>
              <span className="text-2xl font-semibold tracking-tight">
                {formatAmount(amount_total, currency)}
              </span>
            </div>
            <Badge className="gap-1.5 border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3" aria-hidden="true" />
              Paid
            </Badge>
          </div>

          <dl className="divide-y divide-border">
            <DetailRow label="Plan">{planName}</DetailRow>
            <DetailRow label="Billed to">{email}</DetailRow>
            <DetailRow label="Payment method">
              <span className="inline-flex items-center gap-1.5">
                <CreditCard
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                {paymentMethod}
              </span>
            </DetailRow>
            <DetailRow label="Paid on">{formatPaidOn(created)}</DetailRow>

            <div className="flex flex-col gap-2 px-5 py-4 sm:px-6">
              <dt className="text-xs text-muted-foreground">Transaction ID</dt>
              <dd className="flex items-center gap-2">
                <code className="min-w-0 flex-1 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 font-mono text-xs break-all dark:bg-white/2">
                  {transactionId}
                </code>
                <CopyButton value={transactionId} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            className="h-10"
            nativeButton={false}
            render={<Link href="/dashboard/seeker" />}
          >
            Go to dashboard
          </Button>
          <Button
            variant="outline"
            className="h-10"
            nativeButton={false}
            render={<Link href="/browse-jobs" />}
          >
            Browse jobs
          </Button>
        </div>

        <footer className="mt-10 flex flex-col items-center gap-2 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Payment processed securely by
            <span className="font-semibold text-foreground/80">Stripe</span>
          </p>
          <p>
            Keep this receipt for your records. Need help? Reply to your
            confirmation email.
          </p>
        </footer>
      </div>
    </main>
  )
}

export default PaymentSuccessPage
