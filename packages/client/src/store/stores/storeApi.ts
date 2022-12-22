import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserData } from '@/store/interfaces/interfaces';

const defaultFetchFn: typeof fetch = (...args) => fetch(...args);

export const storeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.agify.io/',
    fetchFn: defaultFetchFn,
  }),
  endpoints: (build) => ({
    searchUsers: build.query<IUserData, string>({
      query: (search: string) => ({
        url: `?name=${search}`,
        params: {
          // q: search,
          // per_page: 10,
        },
      }),
      transformResponse: (response: IUserData) => response,
    }),
  }),
});

export const { useSearchUsersQuery } = storeApi;
