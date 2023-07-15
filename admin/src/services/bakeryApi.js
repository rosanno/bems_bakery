import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = import.meta.env.VITE_BASE_URL;

export const bakeryApi = createApi({
  reducerPath: "bakeryApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Category", "Ingredient", "Product", "Order"],
  endpoints: (builder) => ({
    /**
     * register endpoint
     * */
    register: builder.mutation({}),
    /**
     * login endpoint
     * */
    login: builder.mutation({
      query: (crendentials) => ({
        url: "auth/login",
        method: "POST",
        body: crendentials,
      }),
    }),

    /**
     * create a product
     */
    createProduct: builder.mutation({
      query: (newData) => ({
        url: "product/add-product",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Product"],
    }),
    /**
     * create a product
     */
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `product/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    /**
     * get products
     */
    getProducts: builder.query({
      query: () => "product",
      providesTags: ["Product"],
    }),
    /**
     * get product
     */
    getProduct: builder.query({
      query: (productId) => `product/${productId}`,
      providesTags: ["Product"],
    }),
    /**
     * delete a product
     */
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    /**
     * create category
     */
    createCategory: builder.mutation({
      query: (category) => ({
        url: "category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    /**
     * Retrieve a categories
     */
    getCategories: builder.query({
      query: () => "category",
      providesTags: ["Category"],
    }),
    /**
     * Retrieve a categories
     */
    getCategory: builder.query({
      query: ({ id }) => `category/${id}`,
      providesTags: ["Category"],
    }),
    /**
     * Update a category
     */
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),
    /**
     * Delete a category
     */
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    /**
     * create ingredients
     */
    createIngredient: builder.mutation({
      query: (category) => ({
        url: "ingredient",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Ingredient"],
    }),
    /**
     * Retrieve a ingredients
     */
    getIngredients: builder.query({
      query: () => "ingredient",
      providesTags: ["Ingredient"],
    }),
    /**
     * Retrieve a ingredient
     */
    getIngredient: builder.query({
      query: ({ id }) => `ingredient/${id}`,
      providesTags: ["Ingredient"],
    }),
    /**
     * Update a ingredient
     */
    updateIngredient: builder.mutation({
      query: ({ id, name }) => ({
        url: `ingredient/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Ingredient"],
    }),
    /**
     * Delete a category
     */
    deleteIngredient: builder.mutation({
      query: ({ id }) => ({
        url: `ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ingredient"],
    }),

    /**
     * Order endpoints
     */

    /**
     * get order items
     */
    getOrderList: builder.query({
      query: () => "order/order-list",
      providesTags: ["Order"],
    }),
    /**
     * update payment status
     */
    updateOrderPaymentStatus: builder.mutation({
      query: ({ id, paymentStatus }) => ({
        url: `order/${id}`,
        method: "PATCH",
        body: { paymentStatus },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateIngredientMutation,
  useGetIngredientQuery,
  useGetIngredientsQuery,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useGetOrderListQuery,
  useUpdateOrderPaymentStatusMutation,
} = bakeryApi;
