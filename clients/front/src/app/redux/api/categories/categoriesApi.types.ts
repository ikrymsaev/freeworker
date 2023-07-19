import { IService } from '../services/servicesApi.types';

interface ICategory {
  category_id: number;
  name: string;
  description: string;
  services?: IService[];
}

export type { ICategory };
