"use client";
import Image from "next/image";
import Link from "next/link";

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

interface MovieDataListProps {
  movieData: MovieData[];
}

export default function MovieList({ movieData }: MovieDataListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movieData.map((item) => (
        <Link
          href={`/movie/${item.id}`}
          key={`${item.id}-${item.title}-${item.release_date}`}
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-2">
            <div className="relative h-64 w-full">
              <Image
                src={item.poster_path}
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
            <div className="p-4">
              <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{item.release_date}</span>
                <span className="text-yellow-500">
                  ★ {item.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
