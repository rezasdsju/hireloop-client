
const BrowseJobsPage = async({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
    const search = await searchParams
    console.log('search params: ',search)
    return (
        <div>
            <h2>Browse Jobs</h2>
        </div>
    );
};

export default BrowseJobsPage;