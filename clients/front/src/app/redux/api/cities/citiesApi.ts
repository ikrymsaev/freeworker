import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { ICity } from './citiesApi.types';

const citiesApi = createApi({
  reducerPath: 'citiesApi',
  tagTypes: ['City'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /** Получить все города */
    citiesList: builder.query<ICity[], void>({
      query: () => `city`,
      providesTags: () => ['City'],
    }),
    /** Получить город по id */
    cityById: builder.query<ICity, number>({
      query: (service_id: number) => `city/${service_id}`,
      providesTags: () => ['City'],
    }),
  }),
});

export default citiesApi;
export const { useCitiesListQuery } = citiesApi;
