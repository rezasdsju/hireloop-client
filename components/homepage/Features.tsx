import type { LucideIcon } from "lucide-react";
import { Building2, ClipboardCheck, Search, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const features: Feature[] = [
    {
        title: "Smart search",
        description:
            "Find roles by title, company, responsibilities or requirements, then narrow the list down by type, category and work mode.",
        icon: Search,
    },
    {
        title: "Salary insights",
        description:
            "Every job card shows the salary range and pay frequency the recruiter posted, so you know the numbers before you apply.",
        icon: Wallet,
    },
    {
        title: "Company overview",
        description:
            "See who is hiring, where the role is based, and how the company and job type are classified — all on the job page.",
        icon: Building2,
    },
    {
        title: "Application tracking",
        description:
            "Follow every application from your dashboard as recruiters move it from pending through review and interview to a decision.",
        icon: ClipboardCheck,
    },
];

export const Features = () => {
    return (
        <section
            aria-labelledby="features-heading"
            className="border-y border-border bg-muted/30"
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                        Why HireLoop
                    </p>
                    <h2
                        id="features-heading"
                        className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                    >
                        Everything you need to move faster
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground text-pretty">
                        Job seekers get a focused search and a clear view of every application.
                        Recruiters get their listings and applicants in one dashboard.
                    </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ title, description, icon: Icon }) => (
                        <Card key={title} className="h-full">
                            <CardContent className="flex flex-col gap-3">
                                <span className="flex size-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                                    <Icon className="size-5" aria-hidden="true" />
                                </span>
                                <h3 className="font-heading text-base font-semibold tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
