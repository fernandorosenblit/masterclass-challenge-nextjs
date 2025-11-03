import CoursesGrid from "@/components/courses/CousesGrid";
import { API_ROUTES } from "@/constants/routes";
import { api } from "@/lib/api";
import { Course } from "@/types/course";
import type { Metadata } from "next";
import { COURSES_INITIAL_OFFSET, COURSES_LIMIT } from "@/constants/courses";

export const metadata: Metadata = {
  title: "Masterclass Courses | Explore Expert-Led Learning",
  description:
    "Discover a curated collection of masterclass courses taught by industry experts. Learn from the best instructors and expand your skills.",
  keywords: [
    "masterclass",
    "courses",
    "online learning",
    "education",
    "expert instructors",
  ],
  openGraph: {
    title: "Masterclass Courses | Explore Expert-Led Learning",
    description:
      "Discover a curated collection of masterclass courses taught by industry experts.",
    type: "website",
  },
};

export default async function CoursesPage() {
  const initialCourses = await api.get<Course[]>(API_ROUTES.courses, {
    pagination: {
      limit: COURSES_LIMIT,
      offset: COURSES_INITIAL_OFFSET,
    },
  });

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Masterclass Courses Listing
        </h1>
        <p className="text-lg text-gray-600">
          Discover expert-led courses from industry leaders
        </p>
      </header>
      <CoursesGrid initialCourses={initialCourses} />
    </>
  );
}
