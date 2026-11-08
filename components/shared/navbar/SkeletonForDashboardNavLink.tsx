import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForDashboardNavLink() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}
