"use client"

import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  IconArrowDown,
  IconArrowUp,
  IconFilter,
  IconPackage,
  IconSearch,
  IconSelector,
  IconTrash,
  IconX,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"

// Data types
export type DataRow = {
  id: number
  name: string
  email: string
  department: string
  role: string
  salary: number
  status: "active" | "inactive" | "pending"
  joinDate: string
  isValid: boolean
  invalidReason?: string
}

type ColumnKey = keyof Omit<DataRow, "isValid" | "invalidReason">
type SortDirection = "asc" | "desc" | null

// Generate sample data
function generateSampleData(count: number): DataRow[] {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"]
  const roles = ["Manager", "Developer", "Designer", "Analyst", "Coordinator"]
  const statuses: DataRow["status"][] = ["active", "inactive", "pending"]

  return Array.from({ length: count }, (_, i) => {
    const isValid = Math.random() > 0.1 // 90% valid
    return {
      id: i + 1,
      name: `Employee ${i + 1}`,
      email: `employee${i + 1}@company.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      salary: Math.floor(Math.random() * 100000) + 40000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate: new Date(
        2020 + Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split("T")[0],
      isValid,
      invalidReason: isValid ? undefined : "Missing required documentation",
    }
  })
}

// Column definitions
const COLUMNS: { key: ColumnKey; label: string; width?: string }[] = [
  { key: "id", label: "ID", width: "w-20" },
  { key: "name", label: "Name", width: "w-48" },
  { key: "email", label: "Email", width: "w-64" },
  { key: "department", label: "Department", width: "w-32" },
  { key: "role", label: "Role", width: "w-32" },
  { key: "salary", label: "Salary", width: "w-32" },
  { key: "status", label: "Status", width: "w-28" },
  { key: "joinDate", label: "Join Date", width: "w-32" },
]

export function DataExportTable() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [data] = React.useState(() => generateSampleData(10000))

  // Filters and search
  const [globalSearch, setGlobalSearch] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<
    Record<ColumnKey, string>
  >({} as Record<ColumnKey, string>)

  // Sorting
  const [sortColumn, setSortColumn] = React.useState<ColumnKey | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  // Selection
  const [selection, setSelection] = React.useState<Set<number>>(new Set())
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState<
    number | null
  >(null)

  // Column visibility
  const [visibleColumns, setVisibleColumns] = React.useState<Set<ColumnKey>>(
    new Set(COLUMNS.map((c) => c.key))
  )



  // Filter and sort data
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      // Global search
      if (globalSearch) {
        const searchLower = globalSearch.toLowerCase()
        const matchesGlobal = Object.entries(row).some(([key, value]) => {
          if (key === "isValid" || key === "invalidReason") return false
          return String(value).toLowerCase().includes(searchLower)
        })
        if (!matchesGlobal) return false
      }

      // Column filters
      for (const [key, filterValue] of Object.entries(columnFilters)) {
        if (filterValue && key in row) {
          const rowValue = String(row[key as ColumnKey]).toLowerCase()
          if (!rowValue.includes(filterValue.toLowerCase())) {
            return false
          }
        }
      }

      return true
    })
  }, [data, globalSearch, columnFilters])

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      let comparison = 0
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal
      } else {
        comparison = String(aVal).localeCompare(String(bVal))
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredData, sortColumn, sortDirection])

  // Virtualization
  const rowVirtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0

  // Selection helpers
  const selectedRows = React.useMemo(
    () => data.filter((row) => selection.has(row.id)),
    [data, selection]
  )

  const filteredIds = React.useMemo(
    () => sortedData.map((row) => row.id),
    [sortedData]
  )

  const allFilteredSelected =
    filteredIds.length > 0 && filteredIds.every((id) => selection.has(id))
  const someFilteredSelected =
    filteredIds.some((id) => selection.has(id)) && !allFilteredSelected

  // Handle sorting
  const handleSort = (column: ColumnKey) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    setSelection((prev) => {
      const next = new Set(prev)
      if (checked) {
        filteredIds.forEach((id) => {
          const row = data.find((r) => r.id === id)
          if (row?.isValid) next.add(id)
        })
      } else {
        filteredIds.forEach((id) => next.delete(id))
      }
      return next
    })
  }

  // Handle row selection with shift/ctrl
  const handleRowClick = (
    row: DataRow,
    index: number,
    event: React.MouseEvent
  ) => {
    if (!row.isValid) return

    if (event.shiftKey && lastSelectedIndex !== null) {
      // Shift-range selection
      const start = Math.min(lastSelectedIndex, index)
      const end = Math.max(lastSelectedIndex, index)
      setSelection((prev) => {
        const next = new Set(prev)
        for (let i = start; i <= end; i++) {
          const targetRow = sortedData[i]
          if (targetRow?.isValid) {
            next.add(targetRow.id)
          }
        }
        return next
      })
    } else if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd toggle
      setSelection((prev) => {
        const next = new Set(prev)
        if (next.has(row.id)) {
          next.delete(row.id)
        } else {
          next.add(row.id)
        }
        return next
      })
    } else {
      // Single selection
      setSelection((prev) => {
        const next = new Set(prev)
        if (next.has(row.id)) {
          next.delete(row.id)
        } else {
          next.add(row.id)
        }
        return next
      })
    }
    setLastSelectedIndex(index)
  }

  // Handle checkbox toggle
  const handleCheckboxToggle = (row: DataRow, checked: boolean) => {
    if (!row.isValid) return

    setSelection((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(row.id)
      } else {
        next.delete(row.id)
      }
      return next
    })
  }

  // Clear selection
  const clearSelection = () => {
    setSelection(new Set())
    setLastSelectedIndex(null)
  }

  // Invert selection
  const invertSelection = () => {
    setSelection((prev) => {
      const next = new Set<number>()
      filteredIds.forEach((id) => {
        const row = data.find((r) => r.id === id)
        if (row?.isValid) {
          if (!prev.has(id)) {
            next.add(id)
          }
        }
      })
      return next
    })
  }

  // Clear filters
  const clearFilters = () => {
    setGlobalSearch("")
    setColumnFilters({} as Record<ColumnKey, string>)
  }

  // Export functionality
  const exportData = async (options: ExportOptions) => {
    try {
      const rowsToExport = selectedRows.map((row) => {
        const exported: Record<string, string | number> = {}
        visibleColumns.forEach((colKey) => {
          const column = COLUMNS.find((c) => c.key === colKey)
          if (column) {
            exported[column.label] = row[colKey]
          }
        })
        return exported
      })

      let content: string
      let filename: string
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")

      if (options.format === "json") {
        if (options.jsonFormat === "ndjson") {
          content = rowsToExport.map((row) => JSON.stringify(row)).join("\n")
        } else {
          content = options.jsonPretty
            ? JSON.stringify(rowsToExport, null, 2)
            : JSON.stringify(rowsToExport)
        }
        filename = `export-${timestamp}.json`
      } else {
        // CSV
        const headers = Array.from(visibleColumns)
          .map((key) => COLUMNS.find((c) => c.key === key)?.label)
          .filter(Boolean)

        const delimiter = options.csvDelimiter || ","
        const quote = '"'
        const escape = (val: string) =>
          val.includes(delimiter) || val.includes(quote) || val.includes("\n")
            ? `${quote}${val.replace(/"/g, '""')}${quote}`
            : val

        let csvContent = ""

        if (options.csvIncludeHeader) {
          csvContent += headers.map((h) => escape(h!)).join(delimiter) + "\n"
        }

        rowsToExport.forEach((row) => {
          const values = headers.map((header) => {
            const value = row[header!]
            return escape(String(value ?? ""))
          })
          csvContent += values.join(delimiter) + "\n"
        })

        content = options.csvUtf8Bom ? "\uFEFF" + csvContent : csvContent
        filename = `export-${timestamp}.csv`
      }

      // Download file
      const blob = new Blob([content], {
        type:
          options.format === "json" ? "application/json" : "text/csv;charset=utf-8;",
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(`Exported ${selectedRows.length} rows to ${filename}`)
    } catch (error) {
      toast.error("Failed to export data")
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Search all columns..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconFilter className="size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {COLUMNS.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns.has(column.key)}
                onCheckedChange={(checked) => {
                  setVisibleColumns((prev) => {
                    const next = new Set(prev)
                    if (checked) {
                      next.add(column.key)
                    } else {
                      next.delete(column.key)
                    }
                    return next
                  })
                }}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" onClick={clearFilters}>
          <IconX className="size-4" />
          Clear Filters
        </Button>

        {selection.size > 0 && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={clearSelection}>
              <IconTrash className="size-4" />
              Clear Selection
            </Button>
            <Button variant="outline" size="sm" onClick={invertSelection}>
              Invert Selection
            </Button>
            <SelectionDrawer
              selectedRows={selectedRows}
              onRemove={(id) => {
                setSelection((prev) => {
                  const next = new Set(prev)
                  next.delete(id)
                  return next
                })
              }}
              onExport={exportData}
            />
          </>
        )}
      </div>

      {/* Selection info */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Showing {sortedData.length.toLocaleString()} of{" "}
          {data.length.toLocaleString()} rows
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono">
            {selection.size.toLocaleString()} selected
          </Badge>
        </div>
      </div>

      {/* Table */}
      <div
        ref={parentRef}
        className="border rounded-lg overflow-auto"
        style={{ height: "600px" }}
      >
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead className="w-12">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={
                      allFilteredSelected
                        ? true
                        : someFilteredSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all visible rows"
                  />
                </div>
              </TableHead>
              {COLUMNS.filter((col) => visibleColumns.has(col.key)).map(
                (column) => (
                  <TableHead key={column.key} className={column.width}>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 -ml-2"
                        onClick={() => handleSort(column.key)}
                      >
                        {column.label}
                        {sortColumn === column.key ? (
                          sortDirection === "asc" ? (
                            <IconArrowUp className="ml-1 size-4" />
                          ) : (
                            <IconArrowDown className="ml-1 size-4" />
                          )
                        ) : (
                          <IconSelector className="ml-1 size-4 opacity-50" />
                        )}
                      </Button>
                    </div>
                  </TableHead>
                )
              )}
            </TableRow>
            <TableRow>
              <TableHead />
              {COLUMNS.filter((col) => visibleColumns.has(col.key)).map(
                (column) => (
                  <TableHead key={`filter-${column.key}`}>
                    <Input
                      placeholder={`Filter ${column.label.toLowerCase()}...`}
                      value={columnFilters[column.key] || ""}
                      onChange={(e) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [column.key]: e.target.value,
                        }))
                      }
                      className="h-8"
                    />
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paddingTop > 0 && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.size + 1}
                  style={{ height: paddingTop }}
                />
              </TableRow>
            )}
            {virtualRows.map((virtualRow) => {
              const row = sortedData[virtualRow.index]
              const isSelected = selection.has(row.id)

              return (
                <TooltipProvider key={row.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TableRow
                        data-state={isSelected ? "selected" : undefined}
                        className={
                          !row.isValid
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }
                        onClick={(e) => handleRowClick(row, virtualRow.index, e)}
                        style={{ height: virtualRow.size }}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={isSelected}
                              disabled={!row.isValid}
                              onCheckedChange={(checked) =>
                                handleCheckboxToggle(row, !!checked)
                              }
                              aria-label={`Select row ${row.id}`}
                            />
                          </div>
                        </TableCell>
                        {COLUMNS.filter((col) =>
                          visibleColumns.has(col.key)
                        ).map((column) => (
                          <TableCell key={column.key}>
                            {column.key === "salary"
                              ? `$${row[column.key].toLocaleString()}`
                              : column.key === "status"
                                ? (
                                    <Badge
                                      variant={
                                        row.status === "active"
                                          ? "default"
                                          : row.status === "inactive"
                                            ? "secondary"
                                            : "outline"
                                      }
                                    >
                                      {row.status}
                                    </Badge>
                                  )
                                : String(row[column.key])}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TooltipTrigger>
                    {!row.isValid && (
                      <TooltipContent>
                        <p>{row.invalidReason}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )
            })}
            {paddingBottom > 0 && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.size + 1}
                  style={{ height: paddingBottom }}
                />
              </TableRow>
            )}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.size + 1}
                  className="h-24 text-center"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Export options type
type ExportOptions = {
  format: "json" | "csv"
  jsonFormat?: "array" | "ndjson"
  jsonPretty?: boolean
  csvDelimiter?: string
  csvIncludeHeader?: boolean
  csvUtf8Bom?: boolean
}

// Selection drawer component
function SelectionDrawer({
  selectedRows,
  onRemove,
  onExport,
}: {
  selectedRows: DataRow[]
  onRemove: (id: number) => void
  onExport: (options: ExportOptions) => void
}) {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [exportFormat, setExportFormat] = React.useState<"json" | "csv">("json")
  const [jsonFormat, setJsonFormat] = React.useState<"array" | "ndjson">(
    "array"
  )
  const [jsonPretty, setJsonPretty] = React.useState(true)
  const [csvDelimiter, setCsvDelimiter] = React.useState(",")
  const [csvIncludeHeader, setCsvIncludeHeader] = React.useState(true)
  const [csvUtf8Bom, setCsvUtf8Bom] = React.useState(false)

  const filteredSelection = React.useMemo(() => {
    if (!searchQuery) return selectedRows
    const query = searchQuery.toLowerCase()
    return selectedRows.filter((row) =>
      Object.entries(row).some(([key, value]) => {
        if (key === "isValid" || key === "invalidReason") return false
        return String(value).toLowerCase().includes(query)
      })
    )
  }, [selectedRows, searchQuery])

  const previewRows = filteredSelection.slice(0, 5)

  const DrawerContentComponent = (
    <>
      <DrawerHeader>
        <DrawerTitle>Selected Rows ({selectedRows.length})</DrawerTitle>
        <DrawerDescription>
          Review and export your selected data
        </DrawerDescription>
      </DrawerHeader>

      <div className="px-4 space-y-4">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Search within selection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs value={exportFormat} onValueChange={(v) => setExportFormat(v as "json" | "csv")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="space-y-3">
            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={jsonFormat} onValueChange={(v) => setJsonFormat(v as "array" | "ndjson")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="array">Array of objects</SelectItem>
                  <SelectItem value="ndjson">NDJSON (line-delimited)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="pretty"
                checked={jsonPretty}
                onCheckedChange={(checked) => setJsonPretty(!!checked)}
              />
              <Label htmlFor="pretty">Pretty print (formatted)</Label>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-3">
            <div className="space-y-2">
              <Label>Delimiter</Label>
              <Select value={csvDelimiter} onValueChange={setCsvDelimiter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="header"
                checked={csvIncludeHeader}
                onCheckedChange={(checked) => setCsvIncludeHeader(!!checked)}
              />
              <Label htmlFor="header">Include header row</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="bom"
                checked={csvUtf8Bom}
                onCheckedChange={(checked) => setCsvUtf8Bom(!!checked)}
              />
              <Label htmlFor="bom">UTF-8 BOM (for Excel)</Label>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-2">
          <Label>Preview (first 5 rows)</Label>
          <ScrollArea className="h-48 rounded-md border">
            <div className="p-3 space-y-2">
              {previewRows.map((row) => (
                <div
                  key={row.id}
                  className="flex items-start justify-between gap-2 text-sm p-2 rounded-md bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{row.name}</div>
                    <div className="text-muted-foreground text-xs truncate">
                      {row.email}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(row.id)}
                  >
                    <IconX className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>All Selected Items</Label>
          <ScrollArea className="h-64 rounded-md border">
            <div className="p-3 space-y-1">
              {filteredSelection.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between gap-2 text-sm p-2 rounded-md hover:bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{row.name}</div>
                    <div className="text-muted-foreground text-xs truncate">
                      {row.department} • {row.role}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(row.id)}
                  >
                    <IconX className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <DrawerFooter>
        <Button
          onClick={() =>
            onExport({
              format: exportFormat,
              jsonFormat,
              jsonPretty,
              csvDelimiter,
              csvIncludeHeader,
              csvUtf8Bom,
            })
          }
        >
          <IconPackage className="mr-2 size-4" />
          Export {selectedRows.length} Rows
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  )

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button>
          <IconPackage className="mr-2 size-4" />
          Package & Export
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isMobile ? undefined : "max-w-xl"}>
        {DrawerContentComponent}
      </DrawerContent>
    </Drawer>
  )
}
