"use client"

import { DataExportTable } from "./data-export-table"

export default function DataExportPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Data Export Tool</h1>
        <p className="text-muted-foreground mt-2">
          Select, filter, and export your data with advanced controls
        </p>
      </div>
      <DataExportTable />
    </div>
  )
}
