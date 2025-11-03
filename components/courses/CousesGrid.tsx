"use client";

import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/constants/routes";

export default function CoursesGrid({
  initialCourses,
}: {
  initialCourses?: Course[];
}) {
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

  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No courses found</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}
