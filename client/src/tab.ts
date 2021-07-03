import { div } from './utils/div';
import { on, withCss, withHtml } from './utils/create';

export const tab = (label: string, handler: () => void): HTMLDivElement => div(
  'tab',
  withHtml(label),
  on('click', handler),
);

export const showTab = (function x() {
  let activeElement: HTMLElement | null = null;
  return (container: HTMLElement, elementFactory: () => HTMLElement) => {
    if (activeElement) activeElement.classList.add('out');
    const newElement = withCss('in')(elementFactory());
    container.appendChild(newElement);
    setTimeout(() => newElement.classList.remove('in'));
    newElement.addEventListener(
      'transitionend',
      () => {
        activeElement?.remove();
        activeElement = newElement;
      },
      { once: true },
    );
  };
}());
