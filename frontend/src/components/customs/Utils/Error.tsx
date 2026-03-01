"use client"

import { AlertTriangle, RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { routes } from "@/routes"

interface ErrorProps {
  message?: string
}

export function Error({ message }: ErrorProps) {
  const router = useRouter()

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-16 gap-4 text-muted-foreground">
      <AlertTriangle className="w-10 h-10 text-red-500" />
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Error</h2>
        <p className="text-sm">{message || "An unexpected error occurred."}</p>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </Button>

        <Button
          onClick={() => router.push(routes.home)}
          variant="outline"
          className="flex items-center gap-2"
        >
          Go to Home
        </Button>
      </div>
    </div>
  )
}
