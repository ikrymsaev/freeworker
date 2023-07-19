import { ICategory } from '../categories/categoriesApi.types';

interface IService {
  service_id: number;
  name: string;
  description: string;
  category: ICategory;
}

export type { IService };
