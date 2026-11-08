import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForDashboardNavLink() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-7">
      <Skeleton className="h-8 w-24" />
    </div>
  )
}
