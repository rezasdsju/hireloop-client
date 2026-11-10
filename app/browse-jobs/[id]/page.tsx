import { notFound } from "next/navigation";

import Navbar from "@/components/shared/navbar/Navbar";
import { JobDetails } from "@/app/components/browse-jobs/JobDetails";
import { getJob } from "@/lib/api/jobs";

const JobDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const job = await getJob(id)

    if (!job) notFound()

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8">
                <JobDetails job={job} />
            </main>
        </div>
    );
};

export default JobDetailPage;
