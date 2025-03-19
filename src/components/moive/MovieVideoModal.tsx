"use client";
import Image from "next/image";
import { useState } from "react";

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

interface MovieVideoProps {
  videos: VideoData[];
  isOpen: boolean;
  onClose: () => void;
}

const MovieVideoModal = ({ videos, isOpen, onClose }: MovieVideoProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 유튜브 ID로 썸네일 URL 생성
  const getYoutubeThumbnail = (key: string) => {
    return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
  };

  // 유튜브 임베드 URL 생성
  const getYoutubeEmbedUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}?autoplay=1`;
  };

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video);
  };

  const handleBackToList = () => {
    setSelectedVideo(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {selectedVideo ? selectedVideo.name : "예고편 목록"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-grow">
          {selectedVideo ? (
            <div className="p-4">
              <div className="pb-2">
                <button
                  onClick={handleBackToList}
                  className="flex items-center text-gray-400 hover:text-white mb-4"
                >
                  <span className="mr-1">←</span> 목록으로 돌아가기
                </button>
              </div>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYoutubeEmbedUrl(selectedVideo.key)}
                  title={selectedVideo.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-medium mt-4 text-white">
                {selectedVideo.name}
              </h3>
              <p className="text-sm text-gray-400">{selectedVideo.type}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {videos
                .map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative pb-[56.25%]">
                      <Image
                        src={getYoutubeThumbnail(video.key)}
                        alt={video.name}
                        style={{
                          objectFit: "cover",
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                        width={320}
                        height={180}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 bg-opacity-70 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-white truncate">
                        {video.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{video.type}</p>
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.6);
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(75, 85, 99, 0.6) rgba(31, 41, 55, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MovieVideoModal;
