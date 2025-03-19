import { convertMinutesToHoursAndMinutes } from "@/utils/clock";
import Image from "next/image";
import React, { useState } from "react";
import MovieVideoModal from "./MovieVideoModal";

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

interface MovieInfoProps {
  movie: MovieData;
  video: VideoData[];
}

const MovieInfo = ({ movie, video }: MovieInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openVideoModal = () => {
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white">
      {isModalOpen && (
        <MovieVideoModal
          videos={video}
          isOpen={isModalOpen}
          onClose={closeVideoModal}
        />
      )}

      <section className="relative">
        {/* Backdrop Image */}
        <div className="h-[500px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-900 z-10"></div>
          <Image
            src={movie.backdrop_path}
            alt="Main Image"
            style={{
              objectFit: "cover",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            width={922}
            height={518}
            priority
            onError={() =>
              console.error("Failed to load image:", movie.backdrop_path)
            }
          />

          {/* Movie Info Overlay */}
          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
            <div className="flex flex-col items-center md:flex-row gap-8 pd-[76px] md:pd-0">
              {/* Poster */}
              <div className="w-48 h-72 md:w-64 md:h-96  flex-shrink-0 relative rounded-lg overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src={movie.poster_path}
                  alt="Poster Image"
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                  width={256}
                  height={384}
                  onError={() => console.error("Failed to load image")}
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1 pt-4">
                <div className="flex items-center gap-4 mb-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-red-600/80 text-white text-sm px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>
                <p className="text-gray-400 mb-4">
                  {movie.original_title} ({movie.release_date})
                </p>

                <div className="flex items-center mb-6">
                  <div className="bg-yellow-500 text-gray-900 font-bold px-3 py-2 rounded-md flex items-center">
                    <span className="mr-1">★</span>{" "}
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <span className="mx-4 text-gray-500">|</span>
                  <span>{convertMinutesToHoursAndMinutes(movie.runtime)}</span>
                </div>

                <div className="space-x-4 pt-0 md:pt-10">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                    onClick={openVideoModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    예고편 보기
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    찜하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieInfo;
