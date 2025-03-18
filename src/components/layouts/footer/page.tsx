import { LOGO_NAME } from "@/constants/constant";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] mt-20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-red-500 mb-4">
              {LOGO_NAME}
            </div>
            <p className="text-[#ffffff]/60 mb-6">
              {LOGO_NAME}는 영화 및 TV 시리즈에 대한 최신 정보와 리뷰를 제공하는
              플랫폼입니다. 영화 애호가들을 위한 최고의 커뮤니티를 만들어갑니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  영화 정보
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  리뷰 작성
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  영화 추천
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">커뮤니티</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  인스타그램
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  페이스북
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  트위터
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#ffffff]/60 hover:text-red-500 transition-colors"
                >
                  유튜브
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
          &copy; 2025 CinemaHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
