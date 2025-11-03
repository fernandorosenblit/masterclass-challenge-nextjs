"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";
import { QUERY_KEYS } from "@/constants/query";
import { Course } from "@/types/course";

interface FavoriteResponse {
  course_id: number;
  id: number;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({
      course,
      newFavoriteStatus,
    }: {
      course: Course;
      newFavoriteStatus: boolean;
    }): Promise<FavoriteResponse | void> => {
      if (newFavoriteStatus) {
        return api.post<FavoriteResponse>(API_ROUTES.favorite, {
          course_id: course.id,
        });
      } else {
        await api.delete<undefined>(API_ROUTES.favorite, {
          course_id: course.id,
        });
        return undefined;
      }
    },
    onMutate: async ({ course, newFavoriteStatus }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.COURSES],
      });

      const previousCourses = queryClient.getQueryData<Course[]>([
        QUERY_KEYS.COURSES,
      ]);

      if (previousCourses) {
        queryClient.setQueryData<Course[]>(
          [QUERY_KEYS.COURSES],
          previousCourses.map((c) =>
            c.id === course.id ? { ...c, favorite: newFavoriteStatus } : c
          )
        );
      }

      return { previousCourses };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCourses) {
        queryClient.setQueryData<Course[]>(
          [QUERY_KEYS.COURSES],
          context.previousCourses
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COURSES] });
    },
  });

  const toggleFavorite = (course: Course) => {
    toggleFavoriteMutation.mutate({
      course,
      newFavoriteStatus: !course.favorite,
    });
  };

  return {
    toggleFavorite,
    isPending: toggleFavoriteMutation.isPending,
  };
}
