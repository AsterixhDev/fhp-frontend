"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import DiscoverHeader from "./_components/DiscoverHeader";
import DiscoverTabs from "./_components/DiscoverTabs";
import DiscoverGrid from "./_components/DiscoverGrid";
import TrendingStrip from "./_components/TrendingStrip";

const DiscoverPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="h-[calc(100dvh-(4px*12))] md:h-[calc(100dvh-(var(--spacing)*6))] overflow-y-auto scrollbar-styled bg-black text-white">
      <div className="mb-4"><BackButton /></div>
      <DiscoverHeader
        query={query}
        onChange={setQuery}
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <DiscoverTabs active={activeTab} onChange={setActiveTab} />

      <TrendingStrip />

      <DiscoverGrid query={query} category={activeTab} />
    </div>
  );
};

export default DiscoverPage;
