import { Category } from './category-model';

export interface Item {
  name: string;
  price: number;
  category: Category;
  description?: string;
}
