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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";
import type { IJob, JobType } from "@/types/jobTypes";
import { toast } from "@/components/ui/toast";
import { FormField } from "@/app/components/jobs/FormField";
import { InputWithAdornment } from "@/app/components/jobs/InputWithAdornment";
import { PageHeader } from "@/app/components/jobs/PageHeader";
import { SectionHeading } from "@/app/components/jobs/SectionHeading";
import { JOB_CATEGORIES, JOB_TYPES, SALARY_FREQUENCIES } from "@/lib/jobs/options";

const NewJobPage = () => {
    const router = useRouter()
    const [form, setForm] = useState<IJob>({
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

    const handleAddJob = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const result = await createJob(form)
            if (result.acknowledged) {
                toast.add({
                    type: 'success',
                    description: 'Successfully Created Job',
                    priority: 'high'
                })
                router.push("/dashboard/recruiter/jobs")
            }
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            toast.add({
                type: 'error',
                description: `${errorMessage}`,
                priority: 'high'
            })
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

            <PageHeader
                className="mt-2"
                title="Post a New Job"
                description="Fill in the position specifications to attract qualified talent across our network."
            />

            <form onSubmit={handleAddJob} className="mt-6 flex flex-col gap-6">
                {/* 1. Basic Information */}
                <Card>
                    <CardHeader>
                        <SectionHeading number={1} title="Basic Information" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <FormField label="Job Title" htmlFor="job-title" required>
                            <Input
                                id="job-title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Frontend Developer"
                                required
                            />
                        </FormField>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="Company Name" htmlFor="company-name" required>
                                <InputWithAdornment
                                    icon={Building2}
                                    value={form.companyName}
                                    onChange={handleChange}
                                    id="company-name"
                                    name="companyName"
                                    placeholder="HirePulse Network"
                                    required
                                />
                            </FormField>

                            <FormField label="Job Category" htmlFor="job-category" required>
                                <Select
                                    value={form.category}
                                    onValueChange={(v) => setForm((prev) => ({ ...prev, category: v ?? prev.category }))}
                                >
                                    <SelectTrigger id="job-category" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {JOB_CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormField>
                        </div>

                        <FormField label="Job Type" required>
                            <ToggleGroup
                                value={[form.type]}
                                onValueChange={(v) => v[0] && setForm((prev) => ({ ...prev, type: v[0] as JobType }))}
                                variant="outline"
                                className="w-full"
                            >
                                {JOB_TYPES.map((type) => (
                                    <ToggleGroupItem
                                        key={type.value}
                                        value={type.value}
                                        className="h-9 flex-1"
                                    >
                                        {type.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </FormField>
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
                            <FormField
                                label="Job Location"
                                htmlFor="location"
                                annotation="(location)"
                                labelClassName="whitespace-nowrap"
                                badge={<Badge variant="outline">Required</Badge>}
                            >
                                <InputWithAdornment
                                    icon={MapPin}
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="New York, USA"
                                    required
                                />
                            </FormField>

                            <FormField
                                label="Application Deadline"
                                htmlFor="deadline"
                                annotation="(deadline)"
                            >
                                <InputWithAdornment
                                    icon={Calendar}
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={handleChange}
                                />
                            </FormField>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <FormField label="Min Salary / Rate" htmlFor="salary-min">
                                <InputWithAdornment
                                    prefix="€"
                                    id="salary-min"
                                    name="salaryMin"
                                    type="number"
                                    value={form.salaryMin ?? ""}
                                    onChange={handleChange}
                                    placeholder="25"
                                />
                            </FormField>

                            <FormField label="Max Salary / Rate" htmlFor="salary-max">
                                <InputWithAdornment
                                    prefix="€"
                                    id="salary-max"
                                    name="salaryMax"
                                    type="number"
                                    value={form.salaryMax ?? ""}
                                    onChange={handleChange}
                                    placeholder="40"
                                />
                            </FormField>

                            <FormField label="Frequency" htmlFor="salary-frequency">
                                <Select
                                    value={form.salaryFrequency}
                                    onValueChange={(v) => setForm((prev) => ({ ...prev, salaryFrequency: v ?? prev.salaryFrequency }))}
                                >
                                    <SelectTrigger id="salary-frequency" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SALARY_FREQUENCIES.map((frequency) => (
                                            <SelectItem
                                                key={frequency.value}
                                                value={frequency.value}
                                            >
                                                {frequency.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormField>
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
                        <FormField label="Key Responsibilities" htmlFor="responsibilities" required>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                value={form.responsibilities}
                                onChange={handleChange}
                                className="min-h-24"
                                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                                required
                            />
                        </FormField>

                        <FormField label="Qualifications & Requirements" htmlFor="qualifications" required>
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
                        </FormField>
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
