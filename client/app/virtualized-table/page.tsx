// app/virtualized-table/page.tsx
"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Row = { id: number; name: string; email: string };

function makeData(rows: number): Row[] {
  return Array.from({ length: rows }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    email: `item${i + 1}@example.com`,
  }));
}

function sortRows(rows: Row[], key: keyof Row, dir: "asc" | "desc") {
  const mul = dir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    if (key === "id") return (a.id - b.id) * mul;
    return String(a[key]).localeCompare(String(b[key])) * mul;
  });
}

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Virtualized Table</h1>
      <VirtualizedTable />
    </main>
  );
}

function VirtualizedTable({ rows = 10000, height = 480 }: { rows?: number; height?: number }) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const base = React.useMemo(() => makeData(rows), [rows]);

  const [globalQuery, setGlobalQuery] = React.useState("");
  const [filters, setFilters] = React.useState<{ id: string; name: string; email: string }>({
    id: "",
    name: "",
    email: "",
  });
  const [sort, setSort] = React.useState<{ key: keyof Row | null; dir: "asc" | "desc" | null }>({
    key: null,
    dir: null,
  });
  const [selection, setSelection] = React.useState<Set<number>>(new Set());

  const filtered = React.useMemo(() => {
    const g = globalQuery.trim().toLowerCase();
    const idQ = filters.id.trim().toLowerCase();
    const nameQ = filters.name.trim().toLowerCase();
    const emailQ = filters.email.trim().toLowerCase();

    return base.filter((r) => {
      const idS = String(r.id).toLowerCase();
      const nameS = r.name.toLowerCase();
      const emailS = r.email.toLowerCase();

      const byCol =
        (!idQ || idS.includes(idQ)) &&
        (!nameQ || nameS.includes(nameQ)) &&
        (!emailQ || emailS.includes(emailQ));

      const byGlobal =
        !g || idS.includes(g) || nameS.includes(g) || emailS.includes(g);

      return byCol && byGlobal;
    });
  }, [base, globalQuery, filters]);

  const processed = React.useMemo(() => {
    if (!sort.key || !sort.dir) return filtered;
    return sortRows(filtered, sort.key, sort.dir);
  }, [filtered, sort]);

  const displayedIds = React.useMemo(() => processed.map((r) => r.id), [processed]);

  const allSelected = displayedIds.length > 0 && displayedIds.every((id) => selection.has(id));
  const someSelected = displayedIds.some((id) => selection.has(id)) && !allSelected;
  const headerChecked: boolean | "indeterminate" = allSelected ? true : someSelected ? "indeterminate" : false;

  const rowVirtualizer = useVirtualizer({
    count: processed.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    getItemKey: (idx) => processed[idx]?.id ?? idx,
    overscan: 8,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length
    ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
    : 0;

  const toggleSort = (key: keyof Row) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : s.dir === "desc" ? null : "asc" }
        : { key, dir: "asc" }
    );

  const sortMark = (key: keyof Row) =>
    sort.key !== key ? "" : sort.dir === "asc" ? "▲" : sort.dir === "desc" ? "▼" : "";

  const selectAll = (checked: boolean) => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (checked) {
        displayedIds.forEach((id) => next.add(id));
      } else {
        displayedIds.forEach((id) => next.delete(id));
      }
      return next;
    });
  };

  const clearFilters = () => {
    setGlobalQuery("");
    setFilters({ id: "", name: "", email: "" });
  };

  const clearSelection = () => setSelection(new Set());

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Input
          className="w-64"
          placeholder="Global search…"
          value={globalQuery}
          onChange={(e) => setGlobalQuery(e.target.value)}
        />
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
        <Button variant="outline" size="sm" onClick={clearSelection}>
          Clear selection
        </Button>
        <div className="ml-auto text-sm text-muted-foreground">
          Selected: {selection.size}
        </div>
      </div>

      <div
        ref={parentRef}
        className="w-full overflow-auto rounded-md border"
        style={{ height }}
      >
        <Table className="table-fixed">
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead className="w-10">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={headerChecked}
                    onCheckedChange={(v) => selectAll(Boolean(v))}
                    aria-label="Select all"
                  />
                </div>
              </TableHead>
              <TableHead
                className="w-24 cursor-pointer select-none"
                onClick={() => toggleSort("id")}
              >
                <div className="flex items-center gap-1">
                  ID <span className="text-xs">{sortMark("id")}</span>
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name <span className="text-xs">{sortMark("name")}</span>
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => toggleSort("email")}
              >
                <div className="flex items-center gap-1">
                  Email <span className="text-xs">{sortMark("email")}</span>
                </div>
              </TableHead>
            </TableRow>

            {/* Column filters */}
            <TableRow>
              <TableHead />
              <TableHead>
                <Input
                  className="h-8"
                  placeholder="Search ID…"
                  value={filters.id}
                  onChange={(e) => setFilters((f) => ({ ...f, id: e.target.value }))}
                />
              </TableHead>
              <TableHead>
                <Input
                  className="h-8"
                  placeholder="Search name…"
                  value={filters.name}
                  onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
                />
              </TableHead>
              <TableHead>
                <Input
                  className="h-8"
                  placeholder="Search email…"
                  value={filters.email}
                  onChange={(e) => setFilters((f) => ({ ...f, email: e.target.value }))}
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paddingTop > 0 && (
              <TableRow>
                <TableCell style={{ height: paddingTop }} colSpan={4} />
              </TableRow>
            )}

            {virtualRows.map((vr) => {
              const row = processed[vr.index];
              return (
                <TableRow key={row.id} data-index={vr.index} style={{ height: vr.size }}>
                  <TableCell className="w-10">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selection.has(row.id)}
                        onCheckedChange={(v) =>
                          setSelection((prev) => {
                            const next = new Set(prev);
                            if (v) next.add(row.id);
                            else next.delete(row.id);
                            return next;
                          })
                        }
                        aria-label={`Select row ${row.id}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.email}</TableCell>
                </TableRow>
              );
            })}

            {paddingBottom > 0 && (
              <TableRow>
                <TableCell style={{ height: paddingBottom }} colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
