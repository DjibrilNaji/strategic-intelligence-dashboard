import { useQuery } from "@tanstack/react-query"

import { fetchDeepAnalysis, fetchGlobalReport } from "@/lib/api"
import type { DeepAnalysisData, GlobalReportData } from "@/types"

export function useGlobalReport() {
  return useQuery<GlobalReportData>({
    queryKey: ["reports", "global"],
    queryFn: fetchGlobalReport
  })
}

export function useDeepAnalysis() {
  return useQuery<DeepAnalysisData>({
    queryKey: ["reports", "deep-analysis"],
    queryFn: fetchDeepAnalysis
  })
}
