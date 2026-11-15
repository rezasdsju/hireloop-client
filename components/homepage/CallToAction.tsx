import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

import ctaBackground from "@/app/images/cta-bg.png";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
    return (
        <section aria-labelledby="cta-heading" className="mx-auto w-full max-w-7xl px-4 py-14 sm:py-20">
            <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-10 sm:py-20">
                <Image
                    src={ctaBackground}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="-z-10 object-cover object-top opacity-15 mix-blend-luminosity dark:opacity-10"
                />

                <div className="mx-auto max-w-2xl">
                    <h2
                        id="cta-heading"
                        className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-4xl"
                    >
                        Hire smarter. Get hired faster.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
                        Create a free account to apply for jobs and follow every application, or
                        post your first job as a recruiter.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            nativeButton={false}
                            render={<Link href="/register" />}
                            size="lg"
                            className="h-11 bg-indigo-600 px-6 text-white hover:bg-indigo-500"
                        >
                            Create a free account
                            <ArrowRight aria-hidden="true" />
                        </Button>
                        <Button
                            nativeButton={false}
                            render={<Link href="/browse-jobs" />}
                            variant="outline"
                            size="lg"
                            className="h-11 px-6"
                        >
                            <Briefcase aria-hidden="true" />
                            Browse jobs
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
