import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const Banner = () => {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden px-4 pt-10 pb-16 text-center sm:pt-16 sm:pb-24"
        >
            {/* Decorative background: starfield + indigo glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="starfield absolute inset-0 hidden dark:block" />
                <div className="absolute -bottom-56 left-1/2 h-96 w-208 max-w-none -translate-x-1/2 rounded-[100%] bg-indigo-600/25 blur-[110px]" />
                <div className="absolute -bottom-32 left-1/2 h-56 w-lg max-w-none -translate-x-1/2 rounded-[100%] bg-violet-500/20 blur-[80px]" />
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="hidden h-px w-10 bg-linear-to-r from-transparent to-border sm:block sm:w-16" />
                    <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 dark:bg-card/60">
                        <span aria-hidden="true" className="text-sm leading-none">
                            💼
                        </span>
                        <span className="text-xs font-medium text-foreground">
                            Browse the latest openings
                        </span>
                    </div>
                    <span className="hidden h-px w-10 bg-linear-to-l from-transparent to-border sm:block sm:w-16" />
                </div>

                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="mt-6 text-3xl font-bold tracking-tight text-balance sm:mt-8 sm:text-5xl xl:text-6xl"
                >
                    Find Your Dream Job Today
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-balance sm:text-base">
                    HireLoop connects job seekers with the companies hiring on it. Browse the
                    openings recruiters have posted and land your next role — faster.
                </p>

                {/* Search */}
                <form
                    action="/browse-jobs"
                    method="get"
                    className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-muted/50 p-1.5 transition-colors focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:bg-card/60 sm:flex-row sm:items-center"
                >
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3">
                        <IoSearchOutline className="size-5 shrink-0 text-muted-foreground" />
                        <Input
                            type="search"
                            name="search"
                            aria-label="Job title, skill, or company"
                            placeholder="Job title, skill or company"
                            className="h-9 border-none bg-transparent px-0 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="h-10 shrink-0 rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-500 sm:h-9"
                    >
                        <IoSearchOutline className="size-4 sm:hidden" aria-hidden="true" />
                        <span className="sm:hidden">Search jobs</span>
                        <span className="sr-only sm:not-sr-only">Search</span>
                    </Button>
                </form>

                {/* Secondary call to action */}
                <p className="mt-4 text-sm text-muted-foreground">
                    Hiring instead?{" "}
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        Post a job
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                </p>

                {/* Trending */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Trending Position</span>
                    {trending.map((position) => (
                        <Link
                            key={position}
                            href={`/browse-jobs?search=${encodeURIComponent(position)}`}
                            className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {position}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
