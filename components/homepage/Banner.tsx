import Link from "next/link"
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const Banner = () => {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden px-4 pt-12 pb-28 text-center sm:pt-16 sm:pb-32"
        >
            {/* Decorative background: starfield + indigo glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="starfield absolute inset-0 hidden dark:block" />
                <div className="absolute -bottom-56 left-1/2 h-96 w-208 -translate-x-1/2 rounded-[100%] bg-indigo-600/25 blur-[110px]" />
                <div className="absolute -bottom-32 left-1/2 h-56 w-lg -translate-x-1/2 rounded-[100%] bg-violet-500/20 blur-[80px]" />
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-linear-to-r from-transparent to-border sm:w-16" />
                    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 dark:bg-card/60">
                        <span aria-hidden="true" className="text-sm leading-none">
                            💼
                        </span>
                        <span className="text-xs font-medium text-foreground">50,000+</span>
                        <span className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                            New jobs this month
                        </span>
                    </div>
                    <span className="h-px w-10 bg-linear-to-l from-transparent to-border sm:w-16" />
                </div>

                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="mt-8 text-4xl font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl"
                >
                    Find Your Dream Job Today
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-balance sm:text-base">
                    HireLoop connects top talent with world-class companies. Browse
                    thousands of curated opportunities and land your next role — faster.
                </p>

                {/* Search */}
                <form
                    action="/jobs"
                    method="get"
                    className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-muted/50 p-1.5 transition-colors focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:bg-card/60 sm:flex-row sm:items-center"
                >
                    <div className="flex min-w-0 items-center gap-2 rounded-xl px-3 sm:flex-1">
                        <IoSearchOutline className="size-5 shrink-0 text-muted-foreground" />
                        <Input
                            type="search"
                            name="q"
                            aria-label="Job title, skill, or company"
                            placeholder="Job title, skill or company"
                            className="h-9 border-none bg-transparent px-0 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                        />
                    </div>

                    <span aria-hidden="true" className="hidden h-6 w-px shrink-0 bg-border sm:block" />

                    <div className="flex min-w-0 items-center gap-2 rounded-xl px-3 sm:flex-1">
                        <IoLocationOutline className="size-5 shrink-0 text-muted-foreground" />
                        <Input
                            type="search"
                            name="location"
                            aria-label="Location or Remote"
                            placeholder="Location or Remote"
                            className="h-9 border-none bg-transparent px-0 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                        />
                    </div>

                    <div className="flex shrink-0 items-center">
                        <Button
                            type="submit"
                            size="icon"
                            className="h-9 w-full shrink-0 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 sm:w-9 "
                        >
                            <IoSearchOutline className="size-5" />
                            <span className="sr-only">Search jobs</span>
                        </Button>
                    </div>
                </form>

                {/* Trending */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Trending Position</span>
                    {trending.map((position) => (
                        <Link
                            key={position}
                            href={`/jobs?q=${encodeURIComponent(position)}`}
                            className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {position}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Banner
