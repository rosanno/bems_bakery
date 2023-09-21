import { auth } from "./auth";

export const bakeryApi = auth.injectEndpoints({
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
     * update user
     */
    updateUser: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * logout a user
     */
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    /**
     * get authenticated user
     */
    getUser: builder.query({
      query: () => "auth/user",
      providesTags: ["User"],
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
      query: ({ page, search }) =>
        `product?page=${page}&perPage=5&search=${search}`,
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
      query: ({ page, search, isQueryParams }) =>
        `category${
          isQueryParams ? `?page=${page}&perPage=5&search=${search}` : ""
        }`,
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
      query: ({ page, search, isQueryParams }) =>
        `ingredient${
          isQueryParams ? `?page=${page}&perPage=5&search=${search}` : ""
        }`,
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
      query: ({ page, search }) =>
        `order/order-list?page=${page}&perPage=5&search=${search}`,
      providesTags: ["Order"],
    }),
    /**
     * update payment status
     */
    updateOrderPaymentStatus: builder.mutation({
      query: ({ id, paymentStatus }) => ({
        url: `order/${id}`,
        method: "PATCH",
        body: { id, paymentStatus },
      }),
      invalidatesTags: ["Order"],
    }),

    updateDeliveryStatus: builder.mutation({
      query: ({ id, deliveryStatus }) => ({
        url: `order/delivery-status/${id}`,
        method: "PATCH",
        body: { deliveryStatus },
      }),
      invalidatesTags: ["Order"],
    }),

    // delete order endpoint
    deleteOrderFromList: builder.mutation({
      query: ({ id, customerId }) => ({
        url: `order/${id}`,
        method: "DELETE",
        body: { customerId },
      }),
      invalidatesTags: ["Order"],
    }),

    /**
     * get revenue
     */
    getTotalRevenue: builder.query({
      query: () => "order/get-total-revenue",
    }),

    /**
     * get sales
     */
    getSalesCount: builder.query({
      query: () => "order/get-sales-count",
    }),

    /**
     * get monthly revenue
     */
    getMonthlyRevenue: builder.query({
      query: () => "order/get-monthly-revenue",
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useLogoutMutation,
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
  useDeleteOrderFromListMutation,
  useUpdateOrderPaymentStatusMutation,
  useUpdateDeliveryStatusMutation,
  useGetTotalRevenueQuery,
  useGetSalesCountQuery,
  useGetMonthlyRevenueQuery,
} = bakeryApi;
