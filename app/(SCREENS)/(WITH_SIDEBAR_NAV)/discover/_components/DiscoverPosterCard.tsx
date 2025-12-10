import React from "react";

interface Props {
  id: string;
  title: string;
  episodes: string;
  cover: string;
  onOpen?: (id: string) => void;
}

const DiscoverPosterCard: React.FC<Props> = ({
  id,
  title,
  episodes,
  cover,
  onOpen,
}) => {
  return (
    <button
      onClick={() => onOpen?.(id)}
      className="rounded-lg flex gap-2 items-center overflow-hidden bg-white/5 w-full text-left"
    >
      <div
        className="h-full aspect-square bg-cover bg-center"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="p-2">
        <p className="text-sm font-medium line-clamp-2">{title}</p>
        <p className="text-xs text-white/60">{episodes}</p>
      </div>
    </button>
  );
};

export default DiscoverPosterCard;
