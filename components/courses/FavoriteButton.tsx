"use client";

import { Course } from "@/types/course";
import { Heart } from "lucide-react";
import clsx from "clsx";

interface FavoriteButtonProps {
  course: Course;
  onToggle: (course: Course) => void;
  isPending?: boolean;
}

export default function FavoriteButton({
  course,
  onToggle,
  isPending = false,
}: FavoriteButtonProps) {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(course);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={
        course.favorite ? "Remove from favorites" : "Add to favorites"
      }
      disabled={isPending}
      className={clsx(
        "absolute top-2 right-2 p-2 rounded-full transition-all z-10",
        {
          "bg-red-500 text-white hover:bg-red-600": course.favorite,
          "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500":
            !course.favorite,
          "opacity-50 cursor-not-allowed": isPending,
        }
      )}
      type="button"
    >
      <Heart
        className="w-5 h-5"
        fill={course.favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <span className="sr-only">
        {course.favorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
}
