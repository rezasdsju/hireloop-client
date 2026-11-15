import Banner from "@/components/homepage/Banner"
import { CallToAction } from "@/components/homepage/CallToAction"
import { FeaturedJobs } from "@/components/homepage/FeaturedJobs"
import { Features } from "@/components/homepage/Features"
import { StatsStrip } from "@/components/homepage/StatsStrip"
import { Footer } from "@/components/shared/Footer"
import Navbar from "@/components/shared/navbar/Navbar"
import { getJobs } from "@/lib/api/jobs"
import type { IJob } from "@/types/jobTypes"

export default async function Page() {
  // The homepage still renders when the API is unreachable, just without data.
  const jobs = await getJobs().catch(() => [] as IJob[])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Banner />
        <StatsStrip jobs={jobs} />
        <FeaturedJobs jobs={jobs} />
        <Features />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}
