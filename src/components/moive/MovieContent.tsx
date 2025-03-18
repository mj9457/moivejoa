import { COUNTRY_CODE } from "@/constants/countryCode";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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

interface CastMember {
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
  [key: string]: CountryEntry; // 국가 코드(예: AD, AE)를 키로 사용
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

interface MovieInfoProps {
  movie: MovieData;
  credit: CastMember[];
  provider: WatchProviders;
  similar: Similar[];
}

const getCountryName = (countryCode: string): string => {
  const countryInfo = COUNTRY_CODE[countryCode];
  return countryInfo ? countryInfo.kor : countryCode;
};

const MovieContent = ({ movie, credit, provider, similar }: MovieInfoProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      {/* Content Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-1 font-medium ${
                activeTab === "overview"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              개요
            </button>
            <button
              onClick={() => setActiveTab("cast")}
              className={`pb-4 px-1 font-medium ${
                activeTab === "cast"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              출연진
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-1 font-medium ${
                activeTab === "reviews"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              리뷰
            </button>
            <button
              onClick={() => setActiveTab("streaming")}
              className={`pb-4 px-1 font-medium ${
                activeTab === "streaming"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              스트리밍
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl text-white font-bold mb-6 ">줄거리</h2>
              <p className="text-gray-300 leading-relaxed mb-12 text-lg">
                {movie.overview}
              </p>

              <h2 className="text-2xl text-white font-bold mb-6">
                비슷한 작품
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {similar.map((movie) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-2">
                      <div className="relative h-64 w-full">
                        <Image
                          src={movie.poster_path}
                          alt={movie.title}
                          style={{
                            objectFit: "cover",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                          }}
                          width={256}
                          height={384}
                          priority
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 truncate">
                          {movie.title}
                        </h3>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{movie.release_date}</span>
                          <span className="text-yellow-500">
                            ★ {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cast Tab */}
          {activeTab === "cast" && (
            <div>
              <h2 className="text-2xl text-white font-bold mb-6">
                주요 출연진
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {credit.map((person, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={person.profile_path}
                        alt={person.name}
                        style={{
                          objectFit: "cover",
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                        width={256}
                        height={384}
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 text-white">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-white  font-bold">관람객 리뷰</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full inline-block transition-colors">
                  리뷰 작성하기
                </button>
              </div>

              <div className="space-y-6">
                {/* {movie.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-bold text-lg">
                          {review.author.charAt(0)}
                        </div>
                        <span className="font-medium">{review.author}</span>
                      </div>
                      <div className="bg-yellow-500 text-gray-900 font-bold px-2 py-1 rounded flex items-center text-sm">
                        <span className="mr-1">★</span> {review.rating}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.content}</p>
                  </div>
                ))} */}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white px-6 py-2 rounded-full transition-colors">
                  더 많은 리뷰 보기
                </button>
              </div>
            </div>
          )}

          {/* Streaming Tab */}
          {activeTab === "streaming" && (
            <div>
              <h2 className="text-2xl text-white font-bold mb-6">
                스트리밍 정보
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(provider).map(([countryCode, countryData]) => (
                  <div
                    key={countryCode}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-white">
                        {getCountryName(countryCode)}
                      </h3>
                      {countryData.flatrate &&
                      countryData.flatrate.length > 0 ? (
                        <div>
                          <p className="text-gray-400 mb-2">정액제 스트리밍:</p>
                          <div className="flex flex-wrap gap-2">
                            {countryData.flatrate.map((service) => (
                              <a
                                key={service.provider_id}
                                href={countryData.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={`https://image.tmdb.org/t/p/w92${service.logo_path}`}
                                  alt={service.provider_name}
                                  width={46}
                                  height={46}
                                  style={{ objectFit: "contain" }}
                                  className="rounded-[4]"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          해당 국가에서 스트리밍 서비스를 찾을 수 없습니다.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieContent;
