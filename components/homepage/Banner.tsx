
import { FcBriefcase } from "react-icons/fc";
import { Input } from "@/components/ui/input"

import { IoSearchOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@base-ui/react";


const Banner = () => {
    return (
        <div className="px-4 my-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-center">
                    <button className="border border-border rounded-2xl px-4 py-2 flex items-center justify-center gap-2">
                        <span><FcBriefcase /></span>
                        <span>50000+</span>
                        <span className="text-gray-500">NEW JOBS THIS MONTH</span>
                    </button>
                </div>


                <div>
                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl">Find Your Dream Job Today</h1>
                        <p className="max-w-2xl mx-auto text-gray-500">HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.</p>

                        <form className="mx-auto max-w-2xl  flex items-center gap-2 rounded-2xl border border-border bg-card p-2">
                            <div className="flex flex-1 items-center gap-2 px-3">
                                <IoSearchOutline className="size-5 shrink-0 text-muted-foreground" />
                                <Input
                                    placeholder="Job title, skill or company"
                                    className="border-none bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
                                />
                            </div>

                            <span className="h-6 w-px bg-border" />

                            <div className="flex flex-1 items-center gap-2 px-3">
                                <IoLocationOutline className="size-5 shrink-0 text-muted-foreground" />
                                <Input
                                    placeholder="Location or Remote"
                                    className="border-none bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
                                />
                            </div>

                            <Button type="submit" className="size-10 shrink-0 rounded-xl bg-indigo-600 p-0 text-white hover:bg-indigo-600 px-2 py-2 text-center">
                                <IoSearchOutline className="size-5" />
                            </Button>
                        </form>

                        <div className="space-x-2">
                            <span className="text-gray-500">Trending Position</span>
                            <span className="border border rounded-xl px-2 py-1">Product Designer</span>
                            <span className="border border rounded-xl px-2 py-1">Ai Engineering</span>
                            <span className="border border rounded-xl px-2 py-1">Dev-ops Engineer</span>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Banner;