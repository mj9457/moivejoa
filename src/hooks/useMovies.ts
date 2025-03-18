import { useQuery } from "@tanstack/react-query";
import { useMovieStore } from "@/stores/movieStore";

const fetchMovies = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL!);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};

export const useMovies = () => {
  const { setMovies } = useMovieStore();

  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    onSuccess: (data) => {
      setMovies(data);
    },
  });
};
