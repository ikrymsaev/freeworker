import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { ICategory } from './categoriesApi.types';

const categoriesApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Category'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /** Получить список категорий. */
    getCategoryList: builder.query<ICategory[], void>({
      query: () => `category`,
      transformErrorResponse: (response: any): string => response.data.message,
      providesTags: () => ['Category'],
    }),
    /** Получить категорию по id. */
    getCategoryById: builder.query<ICategory, number>({
      query: (category_id: number) => `category/${category_id}`,
      providesTags: () => ['Category'],
    }),
  }),
});

export default categoriesApi;
export const { useGetCategoryListQuery, useGetCategoryByIdQuery } = categoriesApi;
