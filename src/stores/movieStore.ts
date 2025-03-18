import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
}

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  getMovie: (id: number) => Movie | undefined;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  getMovie: (id) => get().movies.find((movie) => movie.id === id),
}));
