"use client";

import { useMemo } from "react";
import { Course } from "@/types/course";

export function useFilterFavorites(
  courses: Course[] | undefined,
  showFavoritesOnly: boolean
) {
  const filteredCourses = useMemo(() => {
    if (!courses) return undefined;

    if (showFavoritesOnly) {
      return courses.filter((course) => course.favorite);
    }

    return courses;
  }, [courses, showFavoritesOnly]);

  const favoritesCount = useMemo(
    () => courses?.filter((c) => c.favorite).length ?? 0,
    [courses]
  );

  return {
    filteredCourses,
    favoritesCount,
  };
}
