import { getJobs } from "@/lib/api/jobs";

const BrowseJobsPage = async({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
    const search = await searchParams
    // console.log('search params: ',search)
    const urlSearch = new URLSearchParams(search as Record<string, string>)
    const query = urlSearch.toString()
    console.log('Search Params: ',query)
    const jobs = await getJobs(query)
    console.log(jobs)
    return (
        <div>
            <h2>Browse Jobs</h2>
        </div>
    );
};

export default BrowseJobsPage;