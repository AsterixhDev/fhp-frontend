import React from "react";

const items = [
  "CEO Marriage",
  "Cold Revenge",
  "Hidden Identity",
  "Campus Love",
];

const TrendingStrip: React.FC = () => {
  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-semibold mb-2">Trending Searches</h3>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 cursor-pointer py-1 bg-white/10 hover:bg-white/50 hover:text-white rounded-full text-xs text-white/80 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendingStrip;
