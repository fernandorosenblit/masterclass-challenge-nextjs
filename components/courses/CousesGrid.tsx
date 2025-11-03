"use client";

import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CoursesGridSkeleton from "./CoursesGridSkeleton";
import FavoriteFilterToggle from "./FavoriteFilterToggle";
import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/constants/query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/constants/routes";
import { useFilterFavorites } from "@/hooks/useFilterFavorites";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState, useMemo } from "react";
import { COURSES_INITIAL_OFFSET, COURSES_LIMIT } from "@/constants/courses";

export default function CoursesGrid({
  initialCourses,
}: {
  initialCourses?: Course[];
}) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: async ({ pageParam = COURSES_INITIAL_OFFSET }) => {
      return api.get<Course[]>(API_ROUTES.courses, {
        pagination: {
          limit: COURSES_LIMIT,
          offset: pageParam,
        },
      });
    },
    initialPageParam: COURSES_INITIAL_OFFSET,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < COURSES_LIMIT) {
        return undefined;
      }
      return allPages.length * COURSES_LIMIT;
    },
    initialData: initialCourses
      ? {
          pages: [initialCourses],
          pageParams: [COURSES_INITIAL_OFFSET],
        }
      : undefined,
  });

  const allCourses = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data?.pages]);

  const { filteredCourses, favoritesCount } = useFilterFavorites(
    allCourses,
    showFavoritesOnly
  );

  const observerTarget = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
    disabled: showFavoritesOnly,
  });

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

  return (
    <>
      <div className="mb-6 flex justify-end">
        <FavoriteFilterToggle
          isActive={showFavoritesOnly}
          onToggle={toggleFilter}
          favoritesCount={favoritesCount}
          totalCount={allCourses.length}
        />
      </div>
      <section aria-label="Courses listing">
        {!filteredCourses || filteredCourses.length === 0 ? (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-900">
              {showFavoritesOnly
                ? "No favorite courses found"
                : "No courses found"}
            </p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
              {filteredCourses.map((course: Course) => (
                <li key={course.id}>
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
            <div ref={observerTarget} className="h-4" />
            {isFetchingNextPage && <CoursesGridSkeleton />}
          </>
        )}
      </section>
    </>
  );
}
