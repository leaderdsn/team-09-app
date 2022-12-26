import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserData } from '@/store/interfaces/interfaces';

export const storeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.agify.io/',
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
