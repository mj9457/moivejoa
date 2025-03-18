"use client";
import { LOGO_NAME } from "@/constants/constant";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#151515]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#ff3d57]">
            <Link href="/">{LOGO_NAME}</Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="font-medium hover:text-[#ff3d57] text-white"
            >
              홈
            </Link>
            <Link
              href="/movie"
              className="font-medium hover:text-[#ff3d57] text-white"
            >
              영화
            </Link>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ex)나니아 연대기"
              className="w-64 bg-gray-800/50 border border-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
