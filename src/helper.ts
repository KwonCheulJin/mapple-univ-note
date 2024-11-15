import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
};
const unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x60;': '`',
};

function createEscaper(map: Record<string, string>) {
  function escaper(match: string) {
    return map[match];
  }
  const source = '(?:' + Object.keys(map).join('|') + ')';
  const testRegexp = RegExp(source);
  const replaceRegexp = RegExp(source, 'g');

  return function (string: unknown) {
    const string2 = `${string}`;
    return testRegexp.test(string2)
      ? string2.replace(replaceRegexp, escaper)
      : string2;
  };
}

const escapeHtml = createEscaper(escapeMap);
const unescapeHtml = createEscaper(unescapeMap);

export { escapeHtml, unescapeHtml };

export const joinTT = <T>(
  strings: TemplateStringsArray,
  values: T[],
  f: (value: T) => string
) =>
  pipe(
    zip(strings, concat(map(f, values), [''])),
    flat,
    reduce((a, b) => a + b)
  );

export function upper(strings: TemplateStringsArray, ...values: string[]) {
  return joinTT(strings, values, v => v.toUpperCase());
}
