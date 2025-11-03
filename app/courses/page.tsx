import CoursesGrid from "@/components/courses/CousesGrid";
import { API_ROUTES } from "@/constants/routes";
import { api } from "@/lib/api";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  const initialCourses = await api.get<Course[]>(API_ROUTES.courses, {
    pagination: {
      limit: 12,
      offset: 0,
    },
  });

  return (
    <div>
      <h1>Courses</h1>
      <CoursesGrid initialCourses={initialCourses} />
    </div>
  );
}
