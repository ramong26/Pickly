import axios from "axios";

const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

class ProductService {
  getProducts({
    keyword,
    category,
    order,
    cursor,
  }: {
    keyword?: string;
    category?: number;
    order?: "recent" | "rating" | "reviewCount";
    cursor?: number;
  }) {
    let url = `${BaseURL}/14-6/products`;
    if (keyword) url += `?keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    if (order) url += `&order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;
    return axios.get(url);
  }

  getProductsId(productId: number, accessToken?: string) {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};
    return axios.get(`${BaseURL}/14-6/products/${productId}`, { headers });
  }

  patchProductsId({
    productId,
    categoryId,
    image,
    description,
    name,
    accessToken,
  }: {
    productId: number;
    name: string;
    description: string;
    categoryId: number;
    image: string;
    accessToken: string;
  }) {
    return axios.patch(
      `${BaseURL}/14-6/products/${productId}`,
      {
        name,
        description,
        categoryId,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  getProductsIdReviews(
    productId: number,
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined,
    cursor?: number
  ) {
    let url = `${BaseURL}/14-6/products/${productId}/reviews`;

    if (order) url += `?order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;

    return axios.get(url);
  }

  postProductsFavorite(productId: number) {
    return axios.post(`${BaseURL}/14-6/products/${productId}/favorite`, {});
  }

  deleteProductsFavorite(productId: number) {
    return axios.delete(`${BaseURL}/14-6/products/${productId}/favorite`, {});
  }
}

class UserService {
  getUser() {
    return axios.get(`${BaseURL}/14-6/users/me`);
  }
  getUserIdFavoriteProduct(userId: number) {
    return axios.get(`${BaseURL}/14-6/users/${userId}/favorite-products`);
  }
}

class ReviewService {
  async postReviews({
    productId,
    content,
    rating,
    images,
  }: {
    productId: number;
    content: string;
    rating: number;
    images: string[];
  }) {
    return axios.post(`${BaseURL}/14-6/reviews`, {
      productId,
      content,
      rating,
      images,
    });
  }
  deleteReviews(reviewId: number) {
    return axios.delete(`${BaseURL}/14-6/reviews/${reviewId}`, {});
  }
  patchReviews({
    reviewId,
    content,
    rating,
    images,
  }: {
    reviewId: number;
    content: string;
    rating: number;
    images: string[];
  }) {
    return axios.patch(`${BaseURL}/14-6/reviews/${reviewId}`, {
      content,
      rating,
      images,
    });
  }

  postReviewsLike(reviewId: number) {
    return axios.post(`${BaseURL}/14-6/reviews/${reviewId}/like`, {});
  }

  deleteReviewsLike(reviewId: number) {
    return axios.delete(`${BaseURL}/14-6/reviews/${reviewId}/like`);
  }
}

class ImageService {
  async postImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<{ url: string }>(
      `${BaseURL}/14-6/images/upload`,
      formData
    );

    return response.data.url;
  }
}
export const productService = new ProductService();
export const userService = new UserService();
export const reviewService = new ReviewService();
export const imageService = new ImageService();
