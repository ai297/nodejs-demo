import './style.scss';
import { withChilds, withHtml } from './utils/create';
import { div } from './utils/div';
import { tab, showTab } from './tab';
import { categoryPage } from './category';
import { itemPage } from './item';

const wrapper = div('content-wrapper');
const categoriesTab = tab('Categories', () => showTab(wrapper, categoryPage));
const itemsTab = tab('Items', () => showTab(wrapper, itemPage));

document.body.appendChild(div(
  'app',
  withHtml('<h1>NodeJS demo app.</h1>'),
  withChilds(
    div('tabs-wrapper', withChilds(categoriesTab, itemsTab)),
    wrapper,
  ),
));

window.onload = () => showTab(wrapper, categoryPage);
