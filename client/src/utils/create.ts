export function create<T extends keyof HTMLElementTagNameMap>(
  tag: T = 'div' as T,
  ...props: Array<(el: HTMLElementTagNameMap[T]) => HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
  return props.reduce((elem, func) => func(elem), document.createElement(tag));
}

export function withCss(...classes: string[]) {
  return <T extends HTMLElement>(el: T): T => {
    el.classList.add(...classes);
    return el;
  };
}

export function withAttrs(attrs: Record<string, string>) {
  return <T extends HTMLElement>(el: T): T => {
    Object.keys(attrs).forEach((attr) => el.setAttribute(attr, attrs[attr]));
    return el;
  };
}

export function withChilds(...childs: HTMLElement[]) {
  return <T extends HTMLElement>(el: T): T => {
    childs.forEach((child) => el.appendChild(child));
    return el;
  };
}

export function withHtml(html: string) {
  return <T extends HTMLElement>(el: T): T => {
    el.innerHTML += html;
    return el;
  };
}

export function on<T extends HTMLElement>(
  event: keyof HTMLElementEventMap,
  handler: (elem: T, ev: HTMLElementEventMap[typeof event]) => void,
) {
  return (el: T): T => {
    el.addEventListener(event, (e) => handler(el, e));
    return el;
  };
}
