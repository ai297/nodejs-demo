/* eslint-disable no-alert */
import {
  create,
  on,
  withAttrs,
  withChilds,
  withCss,
  withHtml,
} from './utils/create';
import { div } from './utils/div';
import { Category } from './models/category-model';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from './api';

const category = (data: Category): HTMLDivElement => {
  const elem = div(
    'page-item',
    withHtml(`
      <div class='category-name'>${data.name}</div>
      <div class='category-description'>${data.description ?? ''}</div>
    `),
    withChilds(create(
      'button',
      withHtml('✖'),
      on('click', () => deleteCategory(data.id)
        .then(() => elem.remove())
        .catch((err: Error) => alert(`Category ${data.name} not deleted: ${err.message}`))),
    )),
  );
  return elem;
};

const categoryForm = (onSubmit?: (data: Category) => void): HTMLFormElement => {
  const nameInput = create('input', withAttrs({ type: 'text', placeholder: 'Category name' }));
  const descriptionInput = create('input', withAttrs({ type: 'text', placeholder: 'Description' }));
  const submit = create('button', withAttrs({ type: 'submit' }), withHtml('✔'));
  const getData = (): Category => ({
    id: -1,
    name: nameInput.value,
    description: descriptionInput.value,
  });
  return create(
    'form',
    withCss('page-item'),
    withChilds(
      div('category-name', withChilds(nameInput)),
      div('category-description', withChilds(descriptionInput)),
      submit,
    ),
    on('submit', (el, ev) => {
      ev.preventDefault();
      onSubmit?.(getData());
      nameInput.value = '';
      descriptionInput.value = '';
    }),
  );
};

export const categoryPage = (): HTMLDivElement => {
  const container = div(
    'content',
    withChilds(
      categoryForm((data) => createCategory(data)
        .then((newData) => container.appendChild(category(newData)))
        .catch((err: Error) => alert(`Category ${data.name} not created: ${err.message}`))),
    ),
  );
  getCategories()
    .then((categoriesData) => categoriesData.map(category).forEach(container.appendChild))
    .catch((err: Error) => alert(`Categories not loaded: ${err.message}`));
  return container;
};
