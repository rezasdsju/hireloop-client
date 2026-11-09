'use client'
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { IJob } from "@/types/jobTypes"
import { deleteJob } from "@/lib/api/jobs"
import { toast } from "@/components/ui/toast"
import { useState } from "react"
import { useRouter } from "next/navigation"



export function DeleteJobDialog({ job }: { job: IJob }) {
    const [open, setOpen] = useState(true)

    const router = useRouter()
    const handleDelete = async () => {
        if (!job._id) return
        try {
            const response = await deleteJob(job._id)
            if (response.acknowledged) {
                setOpen(false)
                toast.add({ type: 'success', description: 'Successfully Deleted Job', priority: 'high' })
                router.refresh()
            }
        } catch {
            toast.add({ type: 'error', description: 'Failed to delete job', priority: 'high' })
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive"><Trash2Icon /></Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this job .
                        {/* <a href="#">Settings</a> delete any memories saved during this chat. */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
