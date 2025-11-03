"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";

interface FavoriteFilterToggleProps {
  isActive: boolean;
  onToggle: () => void;
  count: number;
}

export default function FavoriteFilterToggle({
  isActive,
  onToggle,
  count,
}: FavoriteFilterToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isActive ? "Show all courses" : "Show favorite courses only"}
      aria-pressed={isActive}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-pointer",
        {
          "bg-red-50 border-red-500 text-red-700 hover:bg-red-100": isActive,
          "bg-white border-gray-300 text-gray-700 hover:bg-gray-50": !isActive,
        }
      )}
      type="button"
    >
      <Heart
        className={clsx("w-5 h-5", {
          "fill-current": isActive,
        })}
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <span className="font-medium">{isActive ? "Show All" : "Favorites"}</span>
      {count > 0 && (
        <span
          className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", {
            "bg-red-500 text-white": isActive,
            "bg-gray-200 text-gray-700": !isActive,
          })}
        >
          {count}
        </span>
      )}
    </button>
  );
}
