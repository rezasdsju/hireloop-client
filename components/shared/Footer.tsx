import Image from "next/image";
import Link from "next/link";

import logo from "@/app/images/logo.png";

const footerSections = [
    {
        title: "For job seekers",
        links: [
            { label: "Browse jobs", href: "/browse-jobs" },
            { label: "My applications", href: "/dashboard/seeker/applications" },
            { label: "Create an account", href: "/register" },
            { label: "Sign in", href: "/sign-in" },
        ],
    },
    {
        title: "For employers",
        links: [
            { label: "Post a job", href: "/register" },
            { label: "Recruiter dashboard", href: "/dashboard/recruiter" },
            { label: "Manage jobs", href: "/dashboard/recruiter/jobs" },
            { label: "Sign in", href: "/sign-in" },
        ],
    },
    {
        title: "HireLoop",
        links: [
            { label: "Home", href: "/" },
            { label: "Browse jobs", href: "/browse-jobs" },
            { label: "Register", href: "/register" },
        ],
    },
];

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src={logo}
                                alt="hireloop"
                                width={154}
                                height={44}
                                className="h-9 w-auto"
                            />
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            A job portal for seekers and recruiters. Browse openings, apply, and
                            manage hiring from one place.
                        </p>
                    </div>

                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-sm font-semibold">{section.title}</h2>
                            <ul className="mt-4 flex flex-col gap-2.5">
                                {section.links.map((link) => (
                                    <li key={`${section.title}-${link.href}-${link.label}`}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>
                    <p>Built with Next.js, Better Auth and MongoDB.</p>
                </div>
            </div>
        </footer>
    );
};
