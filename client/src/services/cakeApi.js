import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authenticated.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const api = createApi({
  reducerPath: "cakeApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ["Products", "Cart", "Order", "User"],
});

export const cakeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /** Login */
    login: builder.mutation({
      query: (crendentials) => ({
        url: "auth/login",
        method: "POST",
        body: crendentials,
      }),
    }),

    /** Register */
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    /** logout */
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    /** get authenticated user */
    getUser: builder.query({
      query: () => "auth/user",
    }),

    /** get products */
    getProducts: builder.query({
      query: ({ sort, category, page }) => ({
        url: "product",
        params: { sort, category, page },
      }),
      providesTags: ["Products"],
    }),

    /** get product */
    getProduct: builder.query({
      query: ({ cakeId }) => `product/${cakeId}`,
    }),

    /** get categories */
    getCategories: builder.query({
      query: () => `category`,
    }),

    createOrder: builder.mutation({
      query: ({ data }) => ({
        url: "customer/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),

    /** get orders */
    getOrders: builder.query({
      query: () => `order/customer/orders`,
      providesTags: ["Order"],
    }),

    /** add to cart */
    addToCart: builder.mutation({
      query: ({ data }) => ({
        url: "cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    addProductReview: builder.mutation({
      query: ({ productId, data }) => ({
        url: `customer-review/${productId}`,
        method: "POST",
        body: data,
      }),
    }),

    /** update cart item quantity */
    updateQuantity: builder.mutation({
      query: ({ data }) => ({
        url: "cart/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    /** remove cart item */
    removeCartItem: builder.mutation({
      query: ({ cakeId }) => ({
        url: `cart/delete/${cakeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    /** get cart items */
    getCartItems: builder.query({
      query: () => "cart",
      providesTags: ["Cart"],
    }),

    /** update user information */
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: "user/update-info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useAddToCartMutation,
  useAddProductReviewMutation,
  useRemoveCartItemMutation,
  useUpdateQuantityMutation,
  useGetCartItemsQuery,
  useUpdateUserMutation,
} = cakeApi;
