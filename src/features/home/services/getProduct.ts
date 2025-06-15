import axios from "axios";
import { Product } from "../types/productType";

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  keyword?: string;
  categoryId?: number | null;
  order: "recent" | "rating" | "reviewCount";
  cursor?: number;
}

export async function getProducts({
  keyword,
  categoryId,
  order,
  cursor,
}: Props): Promise<Product> {
  let url = `${Base_URL}/14-6/products`;
  const params = new URLSearchParams();

  if (keyword) params.append("keyword", keyword);
  if (categoryId !== null && categoryId !== undefined)
    params.append("category", String(categoryId));
  if (order) params.append("order", order);
  if (cursor) params.append("cursor", String(cursor));

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await axios.get<Product>(url);
  return response.data; // 꼭 data만 반환하도록!
}
export async function getProductsFetch({
  keyword,
  categoryId,
  order,
  cursor,
}: Props): Promise<Product> {
  const params: Record<string, unknown> = {};
  console.log("Base_URL:", Base_URL);
  if (keyword) params.keyword = keyword;
  if (categoryId) params.category = categoryId;
  if (order) params.order = order;
  if (cursor) params.cursor = cursor;

  const stringParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  );

  const query = new URLSearchParams(stringParams);

  console.log(query);

  try {
    const response = await fetch(`${Base_URL}/14-6/products?${query}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`상품 가져오기 실패: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`상품 가져오기 실패: ${error}`);
    throw error;
  }
}
