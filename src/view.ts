import { each, filter, pipe, take } from '@fxts/core';
import { html } from './template';
interface EnhancedEvent extends Event {
  currentTarget: Element;
}
export abstract class View<T> {
  private _element: HTMLElement | null = null;

  constructor(public data: T) {}

  element() {
    if (!this._element) {
      throw new Error('View is not rendered yet');
    }
    return this._element;
  }

  template(data: T) {
    return html``;
  }
  render() {
    const wrapEl = document.createElement('div');
    wrapEl.innerHTML = this.template(this.data).toHtml();
    this._element = wrapEl.children[0] as HTMLElement;
    this.onRender();
    return this._element;
  }

  onRender() {}

  delegate(
    eventType: string,
    selector: string,
    listener: (e: EnhancedEvent) => void
  ): void {
    this.element()!.addEventListener(eventType, (e: Event) => {
      pipe(
        this.element().querySelectorAll(selector),
        filter((currentTarget: Element) =>
          (currentTarget as HTMLElement).contains(e.target as Node)
        ),
        take(1),
        each((currentTarget: Element) => {
          listener(
            Object.assign(Object.fromEntries(entries(e)), {
              currentTarget,
            }) as EnhancedEvent
          );
        })
      );
    });
  }
}

function* entries(
  object: Record<string, any>
): IterableIterator<[string, any]> {
  for (const key in object) {
    yield [key, object[key]];
  }
}
