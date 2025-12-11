"use client"

import React, { useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

export type DiscoverFilters = {
  sort?: "popularity" | "latest"
  genre?: string | null
  yearStart?: number | null
  yearEnd?: number | null
}

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  value: DiscoverFilters
  onChange: (v: DiscoverFilters) => void
}

const genres = ["Romance", "Thriller", "Fantasy", "Mystery", "Adventure"]

export default function FilterDrawer({ open, onOpenChange, value, onChange }: Props) {
  const [local, setLocal] = useState<DiscoverFilters>(value)

  const apply = () => {
    onChange(local)
    onOpenChange(false)
  }

  const reset = () => {
    const v:DiscoverFilters = { sort: "popularity", genre: null, yearStart: null, yearEnd: null }
    setLocal(v)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sort & Filter</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 space-y-6 text-sm">
          <div>
            <div className="text-white/80 mb-2">Sort</div>
            <div className="flex gap-2">
              {(["popularity", "latest"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setLocal((p) => ({ ...p, sort: s }))}
                  className={`px-3 py-1 rounded-full ${local.sort === s ? "bg-emerald-500 text-black" : "bg-white/10 text-white"}`}
                >
                  {s === "popularity" ? "Popularity" : "Latest Release"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white/80 mb-2">Genre</div>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setLocal((p) => ({ ...p, genre: p.genre === g ? null : g }))}
                  className={`px-3 py-1 rounded-full ${local.genre === g ? "bg-emerald-500 text-black" : "bg-white/10 text-white"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white/80 mb-2">Release Year</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={local.yearStart ?? ""}
                placeholder="From"
                onChange={(e) => setLocal((p) => ({ ...p, yearStart: e.target.value ? parseInt(e.target.value) : null }))}
                className="bg-white/10 text-white rounded px-2 py-1 w-24"
              />
              <span className="text-white/60">to</span>
              <input
                type="number"
                value={local.yearEnd ?? ""}
                placeholder="To"
                onChange={(e) => setLocal((p) => ({ ...p, yearEnd: e.target.value ? parseInt(e.target.value) : null }))}
                className="bg-white/10 text-white rounded px-2 py-1 w-24"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={reset} className="px-3 py-2 rounded bg-white/10 text-white">Reset</button>
            <button onClick={apply} className="px-3 py-2 rounded bg-emerald-500 text-black">Apply</button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

