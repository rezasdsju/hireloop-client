"use client";

import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";

type JobSearchBarProps = {
    defaultValue?: string;
};

export const JobSearchBar = ({ defaultValue = "" }: JobSearchBarProps) => {
    const router = useRouter()
    const handleSearch = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: read the search value and update the query string, e.g.
        // router.push(`/browse-jobs?${new URLSearchParams({ q: value })}`)
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        const search = data.search 
        console.log(search)

        const params = new URLSearchParams()
        params.set('search',search as string)
        router.push(`/browse-jobs/${params.toString()}`)
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
