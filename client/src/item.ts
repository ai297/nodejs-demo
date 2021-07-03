/* eslint-disable no-alert */
import {
  create,
  on,
  withAttrs,
  withChilds,
  withHtml,
} from './utils/create';
import { div } from './utils/div';
import { Item } from './models/item-model';
import {
  getItems,
  getCategoryItems,
  createItem,
  updateItem,
  deleteItem,
} from './api';

const newItem: Item = { name: '', price: 0, category: { name: '', id: 0 } };
const textField = (value?: string, placeholder?: string) => create(
  'input',
  withAttrs({ value: value ?? '', type: 'text', placeholder: placeholder ?? '' }),
);

const replaceWith = (elem: HTMLElement, newElem: HTMLElement) => {
  const parrent = elem.parentElement;
  parrent?.insertBefore(newElem, elem);
  elem.remove();
};

const itemEditView = (
  data: Item,
  saveFunc: (it: Item) => Promise<Item>,
  onSave: (it: Item, el: HTMLElement) => void,
): HTMLDivElement => {
  const nameField = textField(data.name, 'Item name');
  const priceField = textField(data.price ? String(data.price) : '', 'Price');
  const descriptionField = textField(data.description, 'description');

  const save = () => saveFunc({
    category: data.category,
    name: nameField.value,
    price: Number(priceField.value),
    description: descriptionField.value,
  });

  const elem = div(
    'page-item',
    withChilds(
      div('item-category', withHtml(data.category.name)),
      div('item-name', withChilds(nameField)),
      div('item-price', withChilds(priceField)),
      div('item-description', withChilds(descriptionField)),
      create(
        'button',
        withHtml('✔'),
        on('click', () => save()
          .then((newData) => onSave(newData, elem))
          .catch((err: Error) => alert(`Item not saved: ${err.message}`))),
      ),
    ),
  );

  return elem;
};

const itemView = (data: Item): HTMLDivElement => {
  const onSave = (newData: Item, el: HTMLElement) => replaceWith(el, itemView(newData));
  const elem = div(
    'page-item',
    withHtml(`
      <div class='item-category'>${data.category.name}</div>
      <div class='item-name'>${data.name}</div>
      <div class='item-price'>${data.price}</div>
      <div class='item-description'>${data.description ?? ''}</div>
    `),
    withChilds(
      create(
        'button',
        withHtml('✎'),
        on('click', () => replaceWith(elem, itemEditView(data, updateItem, onSave))),
      ),
      create(
        'button',
        withHtml('✖'),
        on('click', () => deleteItem(data.name)
          .then(() => elem.remove())
          .catch((err: Error) => alert(`Item not deleted: ${err.message}`))),
      ),
    ),
  );
  return elem;
};

export const itemPage = (category?: number): HTMLDivElement => {
  const container = div('content');
  let itemsLoad = getItems;

  if (typeof category !== 'undefined') {
    itemsLoad = () => getCategoryItems(category);
    const onCreate = (it: Item, el: HTMLElement) => {
      container.insertBefore(itemView(it), el);
      replaceWith(el, itemEditView(newItem, createItem, onCreate));
    };
    container.appendChild(itemEditView(newItem, createItem, onCreate));
  }

  itemsLoad()
    .then((items) => items.map(itemView).forEach(container.appendChild))
    .catch((err: Error) => alert(`Items not loaded: ${err.message}`));

  return container;
};
