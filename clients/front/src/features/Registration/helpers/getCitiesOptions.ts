import { ICity } from '@/app/redux/api/cities/citiesApi.types';
import { TSelectInputOption } from '@/common/components';

export const getCitiesOptions = (cities: ICity[]): TSelectInputOption[] =>
  cities.map((city) => ({
    id: String(city.city_id),
    value: city.city_id,
    label: city.name,
  }));
