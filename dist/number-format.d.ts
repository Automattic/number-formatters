import type { NumberFormatParams } from './types.ts';
/**
 * Formats numbers using locale settings and/or passed options.
 * @param  params                     - The parameters for the number formatter.
 * @param  params.browserSafeLocale   - The browser safe locale.
 * @param  params.decimals            - The number of decimal places to use.
 * @param  params.forceLatin          - Whether to force the latin locale.
 * @param  params.numberFormatOptions - The options for the number formatter.
 * @return {Intl.NumberFormat} The number formatter.
 */
declare const numberFormat: ({ browserSafeLocale, decimals, forceLatin, numberFormatOptions, }: NumberFormatParams) => Intl.NumberFormat;
/**
 * Convenience method for formatting numbers in a compact notation e.g. 1K, 1M, etc.
 * Basically sets `notation: 'compact'` and `maximumFractionDigits: 1` in the options.
 * Everything is overridable by passing the `numberFormatOptions` option.
 * If you want more digits, pass `maximumFractionDigits: 2`.
 * @param  params                     - The parameters for the number formatter.
 * @param  params.numberFormatOptions - The options for the number formatter.
 * @return {Intl.NumberFormat} The number formatter.
 */
declare const numberFormatCompact: typeof numberFormat;
export { numberFormat, numberFormatCompact };
