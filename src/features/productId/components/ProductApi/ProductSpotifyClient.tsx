"use client";

import React from "react";
import { GetProductIdDetail } from "../../types";

interface Album {
  id: string;
}

interface Albums {
  items: Album[];
}

interface SpotifySearchResponse {
  albums: Albums;
}

interface SpotifyButtonProps {
  artistName: string;
  albumName: string;
  product: GetProductIdDetail;
}

export default function ProductSpotifyClient({
  artistName,
  albumName,
  product,
}: SpotifyButtonProps) {
  // 앨범 검색 결과에서 첫 번째 앨범으로 이동
  const openFirstAlbumOrNull = (albums?: Albums) => {
    if (albums?.items?.length) {
      const albumId = albums.items[0].id;
      window.open(`https://open.spotify.com/album/${albumId}`, "_blank");
      return true;
    }
    return false;
  };

  const handleGoToSpotifyAlbum = async () => {
    if (!artistName || !albumName) {
      alert("아티스트나 앨범 정보가 없습니다.");
      return;
    }

    const res = await fetch("/api/14-6/spotify-token");
    const data = await res.json();
    const accessToken = data.access_token;

    // 1차: 정밀 검색
    const query = `album:${albumName} artist:${artistName}`;
    const albumRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=album&limit=1&market=KR`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const albumData: SpotifySearchResponse = await albumRes.json();

    if (openFirstAlbumOrNull(albumData.albums)) return;

    // 2차: 일반 검색
    const broaderQuery = `${artistName} ${albumName}`;
    const broaderAlbumRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        broaderQuery
      )}&type=album&limit=1&market=KR`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const broaderAlbumData: SpotifySearchResponse =
      await broaderAlbumRes.json();

    if (openFirstAlbumOrNull(broaderAlbumData.albums)) return;

    // 3차: 검색 페이지로 이동
    window.open(
      `https://open.spotify.com/search/${encodeURIComponent(broaderQuery)}`,
      "_blank"
    );
  };

  return (
    <div
      onClick={handleGoToSpotifyAlbum}
      className="group cursor-pointer text-white flex items-center md:justify-end justify-start lg:p-5 md:p-3 p-2 md:gap-2 gap-[10px] bg-[#1F1F1F] rounded-lg hover:bg-[#282828] transition-all duration-300 ease-in-out md:flex-col flex-row w-full"
    >
      <div className="relative lg:w-[250px] md:w-[180px] w-[50px] lg:h-[250px] md:h-[180px] h-[50px]">
        <img
          src={product.image}
          alt={`${artistName} - ${albumName}`}
          className="w-full h-full object-cover"
        />
        <span
          className="lg:w-[60px] w-[40px] lg:h-[60px] h-[40px] bg-green-500 rounded-full flex items-center justify-center absolute md:right-2 right-[-260px]  lg:top-[180px] md:top-[131px] top-[4px] z-10
                   opacity-0 translate-y-4
                   transition-all duration-300 ease-in-out
                   group-hover:opacity-100 group-hover:translate-y-0"
        >
          <svg
            className="w-[30px] h-[30px] text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </span>
      </div>

      <div className="flex flex-col items-start justify-center gap-1 w-fit md:w-full">
        <div className="text-white lg:text-[16px] text-[14px] font-bold">
          {albumName}
        </div>
        <div className="text-[#ABABAB] lg:text-[14px] text-[12px] ">
          {artistName}
        </div>
      </div>
    </div>
  );
}
