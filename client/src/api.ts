import { Category } from './models/category-model';
import { Item } from './models/item-model';

const CATEGORIES = 'categories';
const ITEMS = 'items';
const url = (endpoint: string) => `http://localhost:3000/api/${endpoint}`;

export const getCategories = (): Promise<Category[]> => fetch(url(CATEGORIES)).then((res) => res.json());

export const getCategoryById = (categoryId: number): Promise<Category> => fetch(
  url(`${CATEGORIES}/${categoryId}`),
).then((res) => res.json());

export const createCategory = (data: Category): Promise<Category> => fetch(url(CATEGORIES), {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then((res) => res.json());

export const deleteCategory = (categoryId: number): Promise<Response> => fetch(
  url(`${CATEGORIES}/${categoryId}`),
  { method: 'DELETE' },
);

export const getItems = (): Promise<Item[]> => fetch(url('items'))
  .then((res) => res.json());

export const getCategoryItems = (categoryId: number): Promise<Item[]> => fetch(
  url(`${CATEGORIES}/${categoryId}/${ITEMS}`),
).then((res) => res.json());

export const createItem = (data: Item): Promise<Item> => fetch(url(ITEMS), {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then((res) => res.json());

export const updateItem = (data: Item): Promise<Item> => fetch(url(ITEMS), {
  method: 'PUT',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then((res) => res.json());

export const deleteItem = (itemName: string): Promise<Response> => fetch(
  url(`${ITEMS}/${itemName}`),
  { method: 'DELETE' },
);
