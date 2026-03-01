import { Hono } from "hono"

import { getDeepAnalysis, getGlobalReport } from "@/controllers/reportsController"

const router = new Hono()

router.get("/global", getGlobalReport)
router.get("/deep-analysis", getDeepAnalysis)

export default router
