import { Metadata } from "next";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import ProductIdDetailServer from "@/features/productId/components/ProductIdDetail/ProductIdDetailServer";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
import ProductApiDetail from "@/features/productId/components/ProductApi/ProductApiDetail";
import { productService } from "@/features/productId/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductIdPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) return null;

  //서버로 데이터 불러옴
  const product = await productService.getProductsId(productId);
  const productReviews = await productService.getProductsIdReviews(
    productId,
    "recent"
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      productService.getProductsId(productId).then((res) => res.data),
  });
  await queryClient.prefetchQuery({
    queryKey: ["reviews", productId, "recent"],
    queryFn: () =>
      productService
        .getProductsIdReviews(productId, "recent")
        .then((res) => res.data),
  });

  const initialData = productReviews.data;
  const productDetail = product.data;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="lg:w-[940px] mx-auto  lg:mb-[120px] lg:my-[160px] md:w-[684px] w-[335px] md:mt-[140px] md:mb-[147px] mt-[130px] mb-[200px] flex flex-col gap-[60px]">
        <ProductIdDetailServer product={productDetail} />
        {[1, 2, 4, 6].includes(productDetail.category?.id ?? 0) && (
          <ProductApiDetail product={productDetail} />
        )}

        <ProductIdStats product={productDetail} />
        {/* <ProductReviewsFetch
          productId={productId}
          initialData={initialData}
          initialOrder="recent"
        /> */}
      </div>
    </HydrationBoundary>
  );
}

// 메타태그
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  return {
    title: `Pickly | ${decodedId}`,
    description: `${decodedId}와 관련된 설명과 리뷰를 Pickly에서 확인해보세요!`,
    openGraph: {
      title: `Pickly | ${decodedId}`,
      description: `${decodedId}와 관련된 모든 설명과 리뷰를 Pickly에서 확인해보세요!`,
    },
  };
}
