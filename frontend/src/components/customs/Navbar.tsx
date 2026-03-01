"use client"

import { BarChart3, Globe, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { routes } from "@/routes"

const links = [
  { href: routes.home, label: "Global Overview", icon: Globe },
  { href: routes.deepAnalysis, label: "Deep Analysis", icon: Search }
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href={routes.home} className="flex items-center gap-2 py-4">
          <BarChart3 className="size-5" />
          <span className="text-sm font-semibold">Strategic Intel</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-3 py-4 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
