"use client";

import MovieContent from "@/components/moive/MovieContent";
import MovieInfo from "@/components/moive/MovieInfo";
import useApi from "@/hooks/useApi";
import { Suspense, useCallback, useEffect } from "react";
import { use } from "react";

type IParams = Promise<{ id: string }>;

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string | null;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null; // null이 가능한 경우
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieCreditData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface CountryEntry {
  link: string;
  flatrate: Provider[];
}

interface WatchProviders {
  [key: string]: CountryEntry;
}

interface Similar {
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

interface VideoData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

const useMovieDetail = (id: string) => {
  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
    fetchData: fetchMovieData,
  } = useApi<MovieData>();
  const {
    data: creditsData,
    loading: creditsLoading,
    error: creditsError,
    fetchData: fetchCreditsData,
  } = useApi<MovieCreditData[]>();
  const {
    data: providersData,
    loading: providersLoading,
    error: providersError,
    fetchData: fetchProvidersData,
  } = useApi<WatchProviders>();
  const {
    data: similarData,
    loading: similarLoading,
    error: similarError,
    fetchData: fetchSimilarData,
  } = useApi<Similar[]>();
  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
    fetchData: fetchVideoData,
  } = useApi<VideoData[]>();

  const getMovieDetailData = useCallback(async () => {
    try {
      await fetchMovieData({
        url: `/movies/${id}`,
        method: "GET",
      });
    } catch (error) {
      console.error("Movie API Error:", error);
    }
  }, [fetchMovieData, id]);

  const getMovieCreditsData = useCallback(async () => {
    try {
      await fetchCreditsData({
        url: `/movies/${id}/credits`,
        method: "GET",
      });
    } catch (error) {
      console.error("Credits API Error:", error);
    }
  }, [fetchCreditsData, id]);

  const getMovieProvidersData = useCallback(async () => {
    try {
      await fetchProvidersData({
        url: `/movies/${id}/providers`,
        method: "GET",
      });
    } catch (error) {
      console.error("Providers API Error:", error);
    }
  }, [fetchProvidersData, id]);

  const getMovieSimilarData = useCallback(async () => {
    try {
      await fetchSimilarData({
        url: `/movies/${id}/similar`,
        method: "GET",
      });
    } catch (error) {
      console.error("Similar API Error:", error);
    }
  }, [fetchSimilarData, id]);

  const getMovieVideoData = useCallback(async () => {
    try {
      await fetchVideoData({
        url: `/movies/${id}/videos`,
        method: "GET",
      });
    } catch (error) {
      console.error("Video API Error:", error);
    }
  }, [fetchVideoData, id]);

  useEffect(() => {
    getMovieDetailData();
    getMovieCreditsData();
    getMovieProvidersData();
    getMovieSimilarData();
    getMovieVideoData();
  }, [
    getMovieDetailData,
    getMovieCreditsData,
    getMovieProvidersData,
    getMovieSimilarData,
    getMovieVideoData,
  ]);

  const loading =
    movieLoading ||
    creditsLoading ||
    providersLoading ||
    similarLoading ||
    videoLoading;
  const error =
    movieError || creditsError || providersError || similarError || videoError;

  return {
    movieData,
    creditsData,
    providersData,
    similarData,
    videoData,
    loading,
    error,
  };
};

export default function MovieDetailPage({ params }: { params: IParams }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;

  const {
    movieData,
    creditsData,
    providersData,
    similarData,
    videoData,
    loading,
    error,
  } = useMovieDetail(id);

  if (loading) return <div>Loading movie information...</div>;
  if (error) return <div>Error loading movie information</div>;
  if (
    !movieData ||
    !creditsData ||
    !providersData ||
    !similarData ||
    !videoData
  )
    return null;

  return (
    <div>
      <Suspense>
        <MovieInfo movie={movieData} video={videoData} />
      </Suspense>

      <Suspense>
        <MovieContent
          movie={movieData}
          credit={creditsData}
          provider={providersData}
          similar={similarData}
        />
      </Suspense>
    </div>
  );
}

export const runtime = "edge";
