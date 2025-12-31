"use client"

import { Button } from "@/components/ui/button"
import { Plane, Menu, Github } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">War Thunder</span>
              <span className="text-xs text-muted-foreground">Sensor Database</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex md:gap-x-8">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Database
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Analytics
          </Link>
          <Link href="/data-export" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Export
          </Link>
          <Link href="/virtualized-table" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Tables
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <a
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <div className="space-y-1 px-6 py-4">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Database
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/data-export"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Export
            </Link>
            <Link
              href="/virtualized-table"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tables
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
