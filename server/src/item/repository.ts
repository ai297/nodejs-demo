import { Item } from './item';

const items: Item[] = [
  {
    name: 'Test item',
    price: 100,
    description: 'test description',
    categoryId: 1,
  },
];

export function getItems(): Promise<Item[]> {
  return Promise.resolve<Item[]>(items);
}

export function getItemByName(name: string): Promise<Item | undefined> {
  return Promise.resolve(items.find((it) => it.name.toLowerCase() === name.toLowerCase()));
}

export function createItem(item: Item): Promise<Item> {
  const isExist = typeof items.find((it) => it.name.toLowerCase() === item.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Item with name ${item.name} is already exists.`));
  }
  items.push(item);
  return Promise.resolve(item);
}

export function updateItem(item: Item): Promise<Item> {
  const itemIndex = items.findIndex((it) => it.name.toLowerCase() === item.name.toLowerCase());
  if (itemIndex < 0) {
    return Promise.reject(new Error('Item not found'));
  }
  const existsItem = items.splice(itemIndex, 1)[0];
  const newItem: Item = {
    ...existsItem,
    ...item,
  };
  items.push(newItem);
  return Promise.resolve(newItem);
}

export function deleteItem(name: string): Promise<void> {
  const index = items.findIndex((it) => it.name.toLowerCase() === name.toLowerCase());
  if (index < 0) {
    Promise.reject(new Error('Item not found.'));
  }
  items.splice(index, 1);
  return Promise.resolve();
}
