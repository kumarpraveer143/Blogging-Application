import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  <main className="px-7">
    <Skeleton className="h-8 w-3/4 mt-8" />
    <Skeleton className="h-4 w-1/4 mt-2" />
    <div className="mt-3 flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32 mt-1" />
      </div>
    </div>
    <div className="mt-6 space-y-3">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-11/12" />
      <Skeleton className="h-5 w-10/12" />
      <Skeleton className="h-5 w-9/12" />
    </div>
  </main>;
}
