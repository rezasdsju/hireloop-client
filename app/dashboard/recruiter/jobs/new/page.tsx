"use client";

import Link from "next/link";
import { Building2, Calendar, Globe, MapPin, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import { createJob } from "@/lib/actions/jobs";
import { IJobs } from "@/types/jobTypes";

const Required = () => <span className="text-destructive">*</span>;

const SectionHeading = ({ number, title }: { number: number; title: string }) => (
    <div className="flex items-center gap-2">
        <span className="flex size-5 items-center justify-center rounded-md bg-orange-500 text-[11px] font-semibold text-white">
            {number}
        </span>
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
    </div>
);

const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
];

const jobCategories = [
    "Engineering & Tech",
    "Design & Creative",
    "Marketing",
    "Sales",
    "Finance & Accounting",
    "Operations",
    "Customer Support",
];

const salaryFrequencies = [
    { value: "per hour", label: "per hour" },
    { value: "per day", label: "per day" },
    { value: "per month", label: "per month" },
    { value: "per year", label: "per year" },
];

const NewJobPage = () => {
    const [form, setForm] = useState<IJobs>({
        title: "",
        companyName: "",
        category: "Engineering & Tech",
        type: "full-time",
        isRemote: true,
        location: "",
        deadline: "",
        salaryMin: undefined,
        salaryMax: undefined,
        salaryFrequency: "per hour",
        responsibilities: "",
        qualifications: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? undefined : Number(value)) : value,
        }))
    }

    // ✅ CHANGED (১): React.SubmitEvent -> React.FormEvent
    const handleAddJob = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const result = await createJob(form)
            console.log(result)
        } catch (error) {
            console.error("Failed to create job:", error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/dashboard/recruiter/jobs" />}>
                            Manage Jobs
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create New Listing</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="font-heading text-2xl font-semibold tracking-tight">
                        Post a New Job
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Fill in the position specifications to attract qualified talent across our
                        network.
                    </p>
                </div>
            </div>

            <form onSubmit={handleAddJob} className="mt-6 flex flex-col gap-6">
                {/* 1. Basic Information */}
                <Card>
                    <CardHeader>
                        <SectionHeading number={1} title="Basic Information" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="job-title">
                                Job Title <Required />
                            </Label>
                            <Input
                                id="job-title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Frontend Developer"
                                required
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="company-name">
                                    Company Name <Required />
                                </Label>
                                <div className="relative">
                                    <Building2 className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={form.companyName}
                                        onChange={handleChange}
                                        id="company-name"
                                        name="companyName"
                                        className="pl-8"
                                        placeholder="HirePulse Network"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="job-category">
                                    Job Category <Required />
                                </Label>
                                <Select
                                    value={form.category}
                                    onValueChange={(v) => setForm((prev) => ({ ...prev, category: v ?? prev.category }))}
                                >
                                    <SelectTrigger id="job-category" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jobCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label>
                                Job Type <Required />
                            </Label>
                            <ToggleGroup
                                value={[form.type]}
                                onValueChange={(v) => v[0] && setForm((prev) => ({ ...prev, type: v[0] as IJobs["type"] }))}
                                variant="outline"
                                className="w-full"
                            >
                                {jobTypes.map((type) => (
                                    <ToggleGroupItem
                                        key={type.value}
                                        value={type.value}
                                        className="h-9 flex-1"
                                    >
                                        {type.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Location, Compensation & Timeline */}
                <Card>
                    <CardHeader>
                        <SectionHeading
                            number={2}
                            title="Location, Compensation & Timeline"
                        />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <Globe />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">
                                        Remote Work Allowed{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (isRemote)
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Enable worldwide or distributed candidate applications
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={form.isRemote}
                                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isRemote: checked }))}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                                    <Label htmlFor="location" className="whitespace-nowrap">
                                        Job Location{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (location)
                                        </span>
                                    </Label>
                                    <Badge variant="outline">Required</Badge>
                                </div>
                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        className="pl-8"
                                        placeholder="New York, USA"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="deadline">
                                    Application Deadline{" "}
                                    <span className="font-normal text-muted-foreground">
                                        (deadline)
                                    </span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        value={form.deadline}
                                        onChange={handleChange}
                                        className="pl-8 "
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="salary-min">Min Salary / Rate</Label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                                        €
                                    </span>
                                    <Input
                                        id="salary-min"
                                        name="salaryMin"
                                        type="number"
                                        value={form.salaryMin ?? ""}
                                        onChange={handleChange}
                                        className="pl-7"
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="salary-max">Max Salary / Rate</Label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                                        €
                                    </span>
                                    <Input
                                        id="salary-max"
                                        name="salaryMax"
                                        type="number"
                                        value={form.salaryMax ?? ""}
                                        onChange={handleChange}
                                        className="pl-7"
                                        placeholder="40"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="salary-frequency">Frequency</Label>
                                {/* ✅ CHANGED (২): name="salaryFrequency" বাদ দেওয়া হয়েছে */}
                                <Select
                                    value={form.salaryFrequency}
                                    onValueChange={(v) => setForm((prev) => ({ ...prev, salaryFrequency: v ?? prev.salaryFrequency }))}
                                >
                                    <SelectTrigger id="salary-frequency" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {salaryFrequencies.map((frequency) => (
                                            <SelectItem
                                                key={frequency.value}
                                                value={frequency.value}
                                            >
                                                {frequency.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Responsibilities & Requirements */}
                <Card>
                    <CardHeader>
                        <SectionHeading
                            number={3}
                            title="Responsibilities & Requirements"
                        />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="responsibilities">
                                Key Responsibilities <Required />
                            </Label>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                value={form.responsibilities}
                                onChange={handleChange}
                                className="min-h-24"
                                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="qualifications">
                                Qualifications &amp; Requirements <Required />
                            </Label>
                            <Textarea
                                id="qualifications"
                                name="qualifications"
                                value={form.qualifications}
                                onChange={handleChange}
                                className="min-h-24"
                                placeholder={
                                    "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UX/UI designers"
                                }
                                required
                            />
                        </div>
                    </CardContent>
                </Card>
                <section>
                    <Button type="submit" className="shrink-0 gap-2">
                        Publish Job
                        <Send />
                    </Button>
                </section>
            </form>
        </div>
    );
};

export default NewJobPage;