"use client";

import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CoursesGridSkeleton from "./CoursesGridSkeleton";
import FavoriteFilterToggle from "./FavoriteFilterToggle";
import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/constants/routes";
import { useFilterFavorites } from "@/hooks/useFilterFavorites";
import { useState } from "react";

export default function CoursesGrid({
  initialCourses,
}: {
  initialCourses?: Course[];
}) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: () =>
      api.get<Course[]>(API_ROUTES.courses, {
        pagination: {
          limit: 12,
          offset: 0,
        },
      }),
    initialData: initialCourses,
  });

  const { filteredCourses, favoritesCount } = useFilterFavorites(
    data,
    showFavoritesOnly
  );

  const toggleFilter = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-lg bg-red-50 border border-red-200 p-6 text-center"
      >
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Unable to Load Courses
        </h2>
        <p className="text-red-600">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <CoursesGridSkeleton count={8} />;
  }

  if (!filteredCourses || filteredCourses.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-12 text-center">
        <p className="text-lg text-gray-900">
          {showFavoritesOnly ? "No favorite courses found" : "No courses found"}
        </p>
      </div>
    );
  }

  return (
    <>
      {favoritesCount > 0 && (
        <div className="mb-6 flex justify-end">
          <FavoriteFilterToggle
            isActive={showFavoritesOnly}
            onToggle={toggleFilter}
            count={favoritesCount}
          />
        </div>
      )}
      <section aria-label="Courses listing">
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
          {filteredCourses.map((course: Course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
