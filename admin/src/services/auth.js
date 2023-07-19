import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const auth = createApi({
  reducerPath: "bakeryApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ["Category", "Ingredient", "Product", "Order", "User"],
});
