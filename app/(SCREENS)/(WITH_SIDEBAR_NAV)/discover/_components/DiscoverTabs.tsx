import React from "react";

const TABS = [
  "all",
  "romance",
  "revenge",
  "thriller",
  "fantasy",
  "billionaire",
  "campus",
];

interface Props {
  active: string;
  onChange: (v: string) => void;
}

const DiscoverTabs: React.FC<Props> = ({ active, onChange }) => {
  return (
    <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 cursor-pointer rounded-full text-sm whitespace-nowrap ${
            active === tab
              ? "bg-white text-black"
              : "bg-white/10 text-white/70 hover:bg-white/50 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DiscoverTabs;
