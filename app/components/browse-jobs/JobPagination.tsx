import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type JobPaginationProps = {
    page: number;
    totalPages: number;
};

// Presentational only: the buttons do not navigate yet. Add the page update
// (link or onClick) when the pagination behaviour is implemented.
export const JobPagination = ({ page, totalPages }: JobPaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav aria-label="Job pagination" className="mt-6 flex items-center justify-center gap-1">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Previous page"
                disabled={page === 1}
            >
                <ChevronLeft />
            </Button>

            {pages.map((item) => (
                <Button
                    key={item}
                    type="button"
                    variant={item === page ? "default" : "ghost"}
                    size="icon"
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                >
                    {item}
                </Button>
            ))}

            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Next page"
                disabled={page === totalPages}
            >
                <ChevronRight />
            </Button>
        </nav>
    );
};
