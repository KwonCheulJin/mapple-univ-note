import { html } from './template';

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
}
