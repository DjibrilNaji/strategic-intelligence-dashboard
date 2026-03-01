import "dotenv/config"

import reportsRoutes from "@/routes/reports"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

app.use("*", cors({ origin: "http://localhost:3000" }))
app.get("/", (c) => c.text("Strategic Intelligence Dashboard API"))
app.route("/reports", reportsRoutes)

const port = Number(process.env.PORT) || 3001

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`)
})
