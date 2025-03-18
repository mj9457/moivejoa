"use client";
import MovieList from "@/components/moive/MovieList";
import MovieMainSlide from "@/components/moive/MovieMainSlide";
import useApi from "@/hooks/useApi";
import { useMovieStore } from "@/stores/movieStore";
import { useEffect, useCallback } from "react";

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useHome = () => {
  const { data, loading, error, fetchData } = useApi<MovieData[]>();
  const { setMovies } = useMovieStore();

  const getMoviesData = useCallback(async () => {
    try {
      await fetchData({
        url: "/movies",
        method: "GET",
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  }, [fetchData]);

  useEffect(() => {
    getMoviesData();
  }, [getMoviesData]);

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data, setMovies]);

  return { data, loading, error };
};

export default function Home() {
  const { data, loading, error } = useHome();

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error loading movies: {error}</div>;
  if (!data) return null;

  return (
    <>
      <MovieMainSlide movieData={data} />
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-white text-2xl font-bold mb-8 relative after:content-[''] after:absolute after:h-1 after:w-12 after:bg-red-500 after:-bottom-3 after:left-0">
          신규 영화
        </h2>
        <MovieList movieData={data} />
      </main>
    </>
  );
}
