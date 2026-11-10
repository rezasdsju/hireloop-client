import type { IJob } from "@/types/jobTypes";
import type { SearchParams } from "@/lib/search-params";
import { toArray } from "@/lib/search-params";
import { JOB_TYPES, JOB_WORK_MODES } from "@/lib/jobs/options";

export type JobFilterOption = {
    value: string;
    label: string;
    count: number;
    checked: boolean;
};

export type JobFilterGroup = {
    title: string;
    name: string;
    options: JobFilterOption[];
};

type FilterGroupConfig = {
    title: string;
    name: string;
    options: {
        value: string;
        label: string;
        matches: (job: IJob) => boolean;
    }[];
};

const uniqueCategories = (jobs: IJob[]) =>
    [...new Set(jobs.map((job) => job.category))].sort((a, b) => a.localeCompare(b));

const buildFilterConfigs = (jobs: IJob[]): FilterGroupConfig[] => [
    {
        title: "Job Type",
        name: "jobType",
        options: JOB_TYPES.map((type) => ({
            value: type.value,
            label: type.label,
            matches: (job) => job.type === type.value,
        })),
    },
    {
        title: "Category",
        name: "category",
        options: uniqueCategories(jobs).map((category) => ({
            value: category,
            label: category,
            matches: (job) => job.category === category,
        })),
    },
    {
        title: "Work Mode",
        name: "isRemote",
        options: JOB_WORK_MODES.map((mode) => ({
            value: mode.value,
            label: mode.label,
            matches: (job) => job.isRemote === mode.isRemote,
        })),
    },
];

export const buildJobFilterGroups = (jobs: IJob[], params: SearchParams): JobFilterGroup[] => {
    return buildFilterConfigs(jobs).map((group) => {
        const selected = toArray(params[group.name]);

        return {
            title: group.title,
            name: group.name,
            options: group.options.map((option) => ({
                value: option.value,
                label: option.label,
                count: jobs.filter(option.matches).length,
                checked: selected.includes(option.value),
            })),
        };
    });
};
