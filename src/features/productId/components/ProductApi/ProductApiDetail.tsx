import { productService } from "../../api";
import fetchArtistAlbum from "../../hooks/fetchArtistAlbum";
import ProductApiClient from "./ProductApiClient";
import ProductSpotifyClient from "./ProductSpotifyClient";

export default async function ProductApiDetail({
  productId,
}: {
  productId: number;
}) {
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const combinedText = `${product.name}\n${product.description}`;

  const albumInfo = await fetchArtistAlbum(combinedText);

  if (!albumInfo || typeof albumInfo !== "string") {
    console.error("albumInfo가 유효하지 않음:", albumInfo);
    return <div>아티스트 정보를 가져오지 못했습니다.</div>;
  }

  let artistName = "";
  let albumName = "";

  try {
    let jsonStr = albumInfo.trim();

    if (jsonStr.startsWith("```")) {
      const lines = jsonStr.split("\n");
      if (lines.length >= 3) {
        jsonStr = lines.slice(1, -1).join("\n").trim();
      }
    }

    const albumInfoObj = JSON.parse(jsonStr);

    artistName = albumInfoObj.artist
      ? albumInfoObj.artist.replace(/\(.*?\)/g, "").trim()
      : "";

    albumName = albumInfoObj.album ? albumInfoObj.album.trim() : "";
  } catch (error) {
    console.error("albumInfo JSON 파싱 실패:", error, "응답값:", albumInfo);
    return <div>아티스트 정보를 파싱할 수 없습니다.</div>;
  }

  const searchQuery = artistName
    ? `${artistName} ${albumName} official music video`.trim()
    : combinedText;

  return (
    <>
      {product.category?.id === 1 && (
        <div className="flex gap-[20px] flex-col">
          <div className="text-white lg:text-[20px] md:text-[16px] font-normal">
            음악 들으러 가기
          </div>
          <div className="flex items-center lg:gap-[20px] gap-[15px] flex-col md:flex-row">
            <ProductApiClient searchQuery={searchQuery} />
            <ProductSpotifyClient
              artistName={artistName}
              albumName={albumName}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
}
