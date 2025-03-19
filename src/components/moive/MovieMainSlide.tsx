"use client";
import { LOGO_NAME } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

interface MovieMainSlideProps {
  movieData: MovieData[];
}

const MovieMainSlide = ({ movieData }: MovieMainSlideProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const usedIndices = useRef<number[]>([]);

  useEffect(() => {
    const changeThumbnail = () => {
      if (movieData && movieData.length > 0) {
        let newIndex: number;
        do {
          newIndex = Math.floor(Math.random() * movieData.length);
        } while (usedIndices.current.includes(newIndex));

        setThumbnail(movieData[newIndex].backdrop_path);

        usedIndices.current.push(newIndex);

        if (usedIndices.current.length === movieData.length) {
          usedIndices.current = []; // 모든 인덱스를 사용했으면 초기화
        }
      }
    };

    // 초기 썸네일 설정
    changeThumbnail();

    // 1초마다 썸네일 변경
    const intervalId = setInterval(changeThumbnail, 10000);

    // 컴포넌트 언마운트 시 clearInterval
    return () => clearInterval(intervalId);
  }, [movieData]);

  if (!movieData || movieData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10"></div>
      <div className="absolute inset-0 z-0">
        {thumbnail && (
          <Image
            src={thumbnail}
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
            onError={() => console.error("Failed to load image:", thumbnail)} // 이미지 로드 실패 시 에러 로깅
          />
        )}
      </div>
      <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6 text-white">
          영화의 모든 것,
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6 text-white">
          {LOGO_NAME}에서 만나보세요
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mb-8">
          최신 영화 정보, 리뷰, 평점을 한 곳에서 확인하고 나만의 영화 컬렉션을
          만들어보세요.
        </p>
        <Link
          href="/movie"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full inline-block transition-colors w-fit"
        >
          지금 시작하기
        </Link>
      </div>
    </section>
  );
};

export default MovieMainSlide;
