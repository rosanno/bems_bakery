import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = import.meta.env.VITE_BASE_URL;

export const bakeryApi = createApi({
  reducerPath: "bakeryApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    /** register endpoint */
    register: builder.mutation({}),
    /** login endpoint */
    login: builder.mutation({
      query: (crendentials) => ({
        url: "auth/login",
        method: "POST",
        body: crendentials,
      }),
    }),
    getProducts: builder.query({
      query: () => "product",
    }),
  }),
});

export const { useLoginMutation, useGetProductsQuery } = bakeryApi;
