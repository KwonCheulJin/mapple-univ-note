import { escapeHtml, joinTT } from './helper';

export class Tmpl {
  constructor(
    private strings: TemplateStringsArray,
    private values: unknown[]
  ) {}

  private _merge = (value: unknown) =>
    Array.isArray(value) ? value.reduce((a, b) => html`${a}${b}`) : value;

  private _escapeHtml = (value: unknown) =>
    value instanceof Tmpl ? value.toHtml() : escapeHtml(value);

  toHtml(): string {
    return joinTT(this.strings, this.values, v =>
      this._escapeHtml(this._merge(v))
    );
  }
}

export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  new Tmpl(strings, values);
