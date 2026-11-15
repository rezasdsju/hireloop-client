"use client";

import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type JobSearchBarProps = {
    defaultValue?: string;
};

/**
 * Presentational search card. Submitting only prevents the native form submit;
 * read the form value and update the browse-jobs query when the search
 * behaviour is implemented.
 */
export const JobSearchBar = ({ defaultValue = "" }: JobSearchBarProps) => {
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSearch} role="search" className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        name="search"
                        type="search"
                        defaultValue={defaultValue}
                        placeholder="Search by job title, keywords..."
                        aria-label="Search jobs"
                        className="h-14 rounded-lg pl-11 text-sm"
                    />
                </div>

                <Button type="submit" className="h-14 px-8">
                    Search Jobs
                </Button>
            </form>
        </Card>
    );
};
