import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type JobPaginationProps = {
    page: number;
    totalPages: number;
    hrefForPage: (page: number) => string;
};

/**
 * Page links keep the current query string, so search and filters survive when
 * the visitor moves to another page.
 */
export const JobPagination = ({ page, totalPages, hrefForPage }: JobPaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav aria-label="Job pagination" className="mt-6 flex flex-wrap items-center justify-center gap-1">
            {page > 1 ? (
                <Link
                    href={hrefForPage(page - 1)}
                    aria-label="Previous page"
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                >
                    <ChevronLeft />
                </Link>
            ) : (
                <span
                    aria-label="Previous page"
                    aria-disabled="true"
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "pointer-events-none opacity-50")}
                >
                    <ChevronLeft />
                </span>
            )}

            {pages.map((item) => (
                <Link
                    key={item}
                    href={hrefForPage(item)}
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                    className={buttonVariants({ variant: item === page ? "default" : "ghost", size: "icon" })}
                >
                    {item}
                </Link>
            ))}

            {page < totalPages ? (
                <Link
                    href={hrefForPage(page + 1)}
                    aria-label="Next page"
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                >
                    <ChevronRight />
                </Link>
            ) : (
                <span
                    aria-label="Next page"
                    aria-disabled="true"
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "pointer-events-none opacity-50")}
                >
                    <ChevronRight />
                </span>
            )}
        </nav>
    );
};
