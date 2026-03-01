import { routes } from "@/routes"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export async function fetchGlobalReport() {
  const res = await fetch(API_URL + routes.api.globalReport)
  if (!res.ok) throw new Error("Failed to fetch global report")
  return res.json()
}

export async function fetchDeepAnalysis() {
  const res = await fetch(API_URL + routes.api.deepAnalysis)
  if (!res.ok) throw new Error("Failed to fetch deep analysis")
  return res.json()
}
