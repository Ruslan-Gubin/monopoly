import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { SESSION_TAG, WISHLIST_TAG } from "./tags";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [SESSION_TAG, WISHLIST_TAG],
  endpoints: () => ({}),
});
