import createNumberFormatters from './create-number-formatters.ts';
export declare const setLocale: (locale: string) => void, setGeoLocation: (geoLocation: string) => void, setCurrencyOverrides: (overrides: Record<string, import("./types.ts").CurrencyOverride>) => void, formatNumber: import("./types.ts").FormatNumber, formatNumberCompact: import("./types.ts").FormatNumber, formatCurrency: import("./types.ts").FormatCurrency, getCurrencyObject: import("./types.ts").GetCurrencyObject;
export { createNumberFormatters };
export type * from './types.ts';
