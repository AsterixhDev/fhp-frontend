"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import DiscoverHeader from "./_components/DiscoverHeader";
import DiscoverTabs from "./_components/DiscoverTabs";
import DiscoverGrid from "./_components/DiscoverGrid";
import TrendingStrip from "./_components/TrendingStrip";
import FilterDrawer, { DiscoverFilters } from "./_components/FilterDrawer";

const DiscoverPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<DiscoverFilters>({ sort: "popularity", genre: null, yearStart: null, yearEnd: null });

  return (
    <div className="h-[calc(100dvh-(4px*12))] md:h-[calc(100dvh-(var(--spacing)*6))] overflow-y-auto scrollbar-styled bg-black text-white">
      <div className="mb-4"><BackButton /></div>
      <DiscoverHeader
        query={query}
        onChange={setQuery}
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <div className="flex items-center justify-between px-4">
        <DiscoverTabs active={activeTab} onChange={setActiveTab} />
        <button onClick={() => setFiltersOpen(true)} className="px-3 py-1.5 rounded-full bg-emerald-500 text-black text-sm">Sort & Filter</button>
      </div>

      <TrendingStrip />

      <DiscoverGrid query={query} category={activeTab} filters={filters} />

      <FilterDrawer open={filtersOpen} onOpenChange={setFiltersOpen} value={filters} onChange={setFilters} />
    </div>
  );
};

export default DiscoverPage;
