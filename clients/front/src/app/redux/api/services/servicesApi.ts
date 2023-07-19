import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { IService } from './servicesApi.types';

const servicesApi = createApi({
  reducerPath: 'servicesApi',
  tagTypes: ['Service'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /** Получить все услуги */
    getServicesList: builder.query<IService[], void>({
      query: () => `service`,
      transformErrorResponse: (response: any): string => response.data.message,
      providesTags: () => ['Service'],
    }),
    /** Получить услугу по id */
    getServiceById: builder.query<IService, number>({
      query: (service_id: number) => `service/${service_id}`,
      providesTags: () => ['Service'],
    }),
  }),
});

export default servicesApi;
export const { useGetServiceByIdQuery, useGetServicesListQuery } = servicesApi;
