import { Skeleton } from "@/components/ui/skeleton"

export function DeepAnalysisSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  )
}
