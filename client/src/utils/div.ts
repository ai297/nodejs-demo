import {
  create,
  withCss,
} from './create';

type DivDecorators = Array<(el: HTMLDivElement) => HTMLDivElement>;

export const div = (css: string, ...props: DivDecorators): HTMLDivElement => create('div', withCss(css), ...props);
