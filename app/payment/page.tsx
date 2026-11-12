import type { Metadata } from "next"
import Link from "next/link"
import {
    ArrowLeft,
    CreditCard,
    Link2,
    Lock,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Checkout · HireLoop",
    description: "Complete your HireLoop Pro payment securely.",
}

const plan = {
    name: "Hireloop Pro Plan",
    description: "Access to all features",
    priceBdt: "BDT 2,553.33",
    priceUsd: "$20.00",
    rate: "1 USD = 127.6665 BDT",
}

const countries = [
    { label: "Bangladesh", value: "bd" },
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "India", value: "in" },
    { label: "Australia", value: "au" },
]

const fieldLabelClassName =
    "text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase"

const groupInputClassName =
    "h-8 rounded-none border-0 bg-transparent px-0 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"

function CurrencyOption({
    label,
    dotClassName,
    selected = false,
}: {
    label: string
    dotClassName: string
    selected?: boolean
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            className={cn(
                "flex items-center gap-2.5 rounded-lg border border-border px-3 py-3 text-left text-sm transition-colors",
                selected
                    ? "border-b-2 border-b-foreground bg-muted/40 font-medium"
                    : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "size-4 shrink-0 rounded-full ring-1 ring-foreground/10 ring-inset",
                    dotClassName
                )}
            />
            {label}
        </button>
    )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    )
}

const PaymentPage = () => {
    return (
        <main className="min-h-svh bg-background dark:bg-neutral-950">
            <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 lg:py-12">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Back"
                            nativeButton={false}
                            render={<Link href="/browse-jobs" />}
                        >
                            <ArrowLeft />
                        </Button>
                        <span className="flex size-7 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                            <Lock className="size-3.5" aria-hidden="true" />
                        </span>
                    </div>

                    <Badge
                        variant="outline"
                        className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
                    >
                        Sandbox
                    </Badge>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
                    {/* Order summary */}
                    <aside className="flex flex-col gap-6 lg:sticky lg:top-10 lg:self-start">
                        <div className="flex flex-col gap-3">
                            <p className={fieldLabelClassName}>Choose a currency</p>
                            <div className="grid grid-cols-2 gap-3">
                                <CurrencyOption
                                    label={plan.priceBdt}
                                    dotClassName="bg-rose-500"
                                    selected
                                />
                                <CurrencyOption
                                    label={plan.priceUsd}
                                    dotClassName="bg-sky-500"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">{plan.rate}</p>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-1">
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-sm font-medium">{plan.name}</p>
                                <p className="text-sm font-medium">{plan.priceBdt}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {plan.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Separator />
                            <SummaryRow label="Subtotal" value={plan.priceBdt} />
                            <SummaryRow label="Tax" value="Included" />
                            <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                                <span className="text-sm font-medium">Total due today</span>
                                <span className="text-sm font-semibold">{plan.priceBdt}</span>
                            </div>
                        </div>

                        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                            <ShieldCheck
                                className="mt-0.5 size-3.5 shrink-0"
                                aria-hidden="true"
                            />
                            Cancel anytime. Your plan starts immediately after payment.
                        </p>
                    </aside>

                    {/* Checkout */}
                    <section className="flex flex-col gap-6">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#00d66f] text-sm font-semibold text-black transition-opacity hover:opacity-90"
                            >
                                <Link2 className="size-4" aria-hidden="true" />
                                Link
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-28 items-center justify-center gap-2 rounded-lg bg-[#5f2ee5] text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            >
                                <CreditCard className="size-4" aria-hidden="true" />
                                4242
                            </button>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                            <Separator className="flex-1" />
                            or
                            <Separator className="flex-1" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-semibold">Contact information</h2>
                            <div className="flex flex-col gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-10 bg-muted/30 dark:bg-white/3"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-semibold">Payment method</h2>

                            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/40 px-3.5 py-3 text-sm font-medium dark:bg-white/2">
                                <CreditCard
                                    className="size-4 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                Card
                            </div>

                            <div className="overflow-hidden rounded-xl border border-border bg-card/40 dark:bg-white/2">
                                <div className="border-b border-border px-3.5 py-2.5">
                                    <p className={fieldLabelClassName}>Card information</p>
                                    <div className="relative">
                                        <Input
                                            aria-label="Card number"
                                            inputMode="numeric"
                                            autoComplete="cc-number"
                                            placeholder="1234 1234 1234 1234"
                                            className={cn(
                                                groupInputClassName,
                                                "pr-10 text-base tracking-wide md:text-sm"
                                            )}
                                        />
                                        <CreditCard
                                            className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-muted-foreground/70"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                                    <div className="px-3.5 py-2.5">
                                        <Input
                                            aria-label="Expiry date"
                                            inputMode="numeric"
                                            autoComplete="cc-exp"
                                            placeholder="MM / YY"
                                            className={groupInputClassName}
                                        />
                                    </div>
                                    <div className="relative px-3.5 py-2.5">
                                        <Input
                                            aria-label="CVC"
                                            inputMode="numeric"
                                            autoComplete="cc-csc"
                                            placeholder="CVC"
                                            className={cn(groupInputClassName, "pr-8")}
                                        />
                                        <LockKeyhole
                                            className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-muted-foreground/70"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="border-b border-border px-3.5 py-2.5">
                                    <p className={fieldLabelClassName}>Cardholder name</p>
                                    <Input
                                        aria-label="Cardholder name"
                                        autoComplete="cc-name"
                                        placeholder="Full name on card"
                                        className={groupInputClassName}
                                    />
                                </div>

                                <div className="px-3.5 py-2.5">
                                    <p className={fieldLabelClassName}>Country or region</p>
                                    <Select items={countries} defaultValue="bd" name="country">
                                        <SelectTrigger
                                            id="country"
                                            className="h-8 w-full rounded-none border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 data-[size=default]:h-8 dark:bg-transparent"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.value} value={country.value}>
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card/40 p-3.5 dark:bg-white/2">
                            <Checkbox
                                defaultChecked
                                className="mt-0.5"
                                aria-label="Save my information for faster checkout"
                            />
                            <span className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium">
                                    Save my information for faster checkout
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Pay securely on this site and everywhere Link is accepted.
                                </span>
                            </span>
                        </label>

                        <div className="flex flex-col gap-3">
                            <Button
                                type="button"
                                className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-500 focus-visible:ring-blue-500/40"
                            >
                                Pay
                            </Button>
                            <p className="text-center text-xs text-muted-foreground">
                                You will be redirected to Stripe to complete this payment
                                securely.
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="mt-12 flex flex-col items-center gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                        Powered by
                        <span className="font-semibold text-foreground/80">Stripe</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-foreground">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-foreground">
                            Privacy
                        </Link>
                    </div>
                </footer>
            </div>
        </main>
    )
}

export default PaymentPage
