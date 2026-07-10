//#region src/types.d.ts
interface NumberFormatParams {
  /**
   * Browser-safe locale string that works with Intl.NumberFormat e.g. 'en-US' (not 'en_US').
   */
  browserSafeLocale: string;
  /**
   * Number of decimal places to use.
   * This is just convenience over setting `minimumFractionDigits`, `maximumFractionDigits` to the same value.
   * ( default = 0 )
   */
  decimals?: number;
  /**
   * Whether to use latin numbers by default ( default = true ).
   */
  forceLatin?: boolean;
  /**
   * `Intl.NumberFormat` options to pass through.
   * `minimumFractionDigits` & `maximumFractionDigits` will override `decimals` if set.
   */
  numberFormatOptions?: Intl.NumberFormatOptions;
}
interface CurrencyOverride {
  symbol?: string;
  /**
   * Smallest-unit exponent for this currency, used when the browser's ICU
   * `maximumFractionDigits` disagrees with the API's smallest-unit encoding,
   * or when this package's hard-coded fallback exponent (see
   * `SMALLEST_UNIT_EXPONENT_OVERRIDES` in `number-format-currency/index.ts`)
   * disagrees with the host application's source of truth.
   *
   * For example, modern browser ICU (Chrome / Node 24+) reports IDR as
   * 0-decimal, but this package's hard-coded fallback applies an exponent of
   * 2 for legacy compatibility. The WPCOM currencies endpoint can send
   * `{ "IDR": { "decimal": 0 } }` to override that hard-coded 2 back to 0.
   */
  decimal?: number;
}
interface NumberFormatCurrencyParams {
  /**
   * Number to format.
   */
  number: number;
  /**
   * Browser-safe locale string that works with Intl.NumberFormat e.g. 'en-US' (not 'en_US').
   */
  browserSafeLocale: string;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Whether to use latin numbers by default ( default = true ).
   */
  forceLatin?: boolean;
  /**
   * The user's geo location if available.
   */
  geoLocation?: string;
  /**
   * Forces any decimal zeros to be hidden if set.
   *
   * For example, the function will normally format `10.00` in `USD` as
   * `$10.00` but when this option is true, it will return `$10` instead.
   *
   * For currencies without decimals (eg: JPY), this has no effect.
   */
  stripZeros?: boolean;
  /**
   * Changes function to treat number as an integer in the currency's smallest unit.
   *
   * Since rounding errors are common in floating point math, sometimes a price
   * is provided as an integer in the smallest unit of a currency (eg: cents in
   * USD or yen in JPY). If this option is false, the function will format the
   * amount `1025` in `USD` as `$1,025.00`, but when the option is true, it
   * will return `$10.25` instead.
   */
  isSmallestUnit?: boolean;
  /**
   * If the number is greater than 0, setting this to true will include its
   * sign (eg: `+$35.00`). Has no effect on negative numbers or 0.
   */
  signForPositive?: boolean;
  /**
   * Dynamic currency overrides, typically supplied by the host application
   * (eg: from a remote endpoint) via `setCurrencyOverrides`.
   *
   * When provided, entries here take precedence over the hard-coded defaults
   * baked into the package on a per-field basis. Anything not specified in
   * this map falls back to the hard-coded defaults, so passing a partial map
   * is safe.
   */
  currencyOverrides?: Record<string, CurrencyOverride>;
}
interface CurrencyObject {
  /**
   * The negative sign for the price, if it is negative, or the positive sign
   * if `signForPositive` is set.
   */
  sign: '-' | '+' | '';
  /**
   * The currency symbol for the formatted price.
   *
   * Note that the symbol's position depends on the `symbolPosition` property,
   * and keep RTL locales in mind.
   */
  symbol: string;
  /**
   * The position of the currency symbol relative to the formatted price.
   */
  symbolPosition: 'before' | 'after';
  /**
   * The section of the formatted price before the decimal.
   *
   * Note that this is not a number, but a locale-formatted string which may
   * include symbols like spaces, commas, or periods as group separators.
   */
  integer: string;
  /**
   * The section of the formatted price after and including the decimal.
   *
   * Note that this is not a number, but a locale-formatted string which may
   * include symbols like spaces, commas, or periods as the decimal separator.
   */
  fraction: string;
  /**
   * True if the formatted number has a non-0 decimal part.
   */
  hasNonZeroFraction: boolean;
  /**
   * The raw floating-point version of the number prepared for formatting,
   * after unit conversion and precision scaling.
   *
   * For non-decimal currencies (eg: JPY) this will actually be an integer.
   * Otherwise it will likely be a floating-point number. Be careful with this!
   * It should not be used for math if possible because of floating-point
   * rounding issues! Use the smallest unit instead.
   */
  floatValue: number;
}
type FormatNumber = (number: number, options?: Omit<NumberFormatParams, 'browserSafeLocale'>) => string;
type FormatCurrency = (number: number, currency: string, options?: Omit<NumberFormatCurrencyParams, 'number' | 'currency' | 'browserSafeLocale' | 'geoLocation' | 'currencyOverrides'>) => string;
type GetCurrencyObject = (number: number, currency: string, options?: Omit<NumberFormatCurrencyParams, 'number' | 'currency' | 'browserSafeLocale' | 'geoLocation' | 'currencyOverrides'>) => CurrencyObject;
//#endregion
//#region src/create-number-formatters.d.ts
declare global {
  interface Window {
    wp?: {
      date?: {
        getSettings?: () => {
          l10n?: {
            locale?: string;
          };
        };
      };
    };
  }
}
interface NumberFormatters {
  /**
   * Sets the locale for number formatting
   * @param locale - The locale to use for formatting
   */
  setLocale(locale: string): void;
  /**
   * Sets the user's geo location for currency formatting if available
   * @param geoLocation - The geo location to use for formatting
   */
  setGeoLocation(geoLocation: string): void;
  /**
   * Sets a dynamic map of per-currency overrides used by currency formatting.
   *
   * Typical use: load `{ "IDR": { "decimal": 0 } }` from the WPCOM currencies
   * endpoint at app boot and pass the parsed object here. Each entry can carry
   * a `symbol` and/or `decimal` (the smallest-unit exponent), and additional
   * fields may be added to `CurrencyOverride` in the future.
   *
   * If this setter is never called, the package falls back to the hard-coded
   * defaults shipped with the package, preserving previous behavior.
   *
   * When called with a partial map, missing currencies or fields fall back to
   * the hard-coded defaults — passing `{ IDR: { decimal: 0 } }` does not clear
   * the default IDR symbol, for example.
   * @param overrides - Map of currency code to override settings
   */
  setCurrencyOverrides(overrides: Record<string, CurrencyOverride>): void;
  /**
   * Formats numbers using locale settings and/or passed options.
   * @param  number                     - The number to format.
   * @param  params                     - The parameters for the formatter.
   * @param  params.decimals            - The number of decimal places to display.
   * @param  params.forceLatin          - Whether to force the Latin script.
   * @param  params.numberFormatOptions - Additional options to pass to the formatter.
   * @return {string} Formatted number as string, or original number as string if formatting fails.
   */
  formatNumber: FormatNumber;
  /**
   * Formats numbers using locale settings and/or passed options, with a compact notation.
   * Convenience method for formatting numbers in a compact notation e.g. 1K, 1M, etc.
   * Basically sets `notation: 'compact'` and `maximumFractionDigits: 1` in the options.
   * Everything is overridable by passing the `numberFormatOptions` option.
   * If you want more digits, pass `maximumFractionDigits: 2`.
   * @param  number                     - The number to format.
   * @param  params                     - The parameters for the formatter.
   * @param  params.decimals            - The number of decimal places to display.
   * @param  params.forceLatin          - Whether to force the Latin script.
   * @param  params.numberFormatOptions - Additional options to pass to the formatter.
   * @return {string} Formatted number as string, or original number as string if formatting fails.
   */
  formatNumberCompact: FormatNumber;
  /**
   * Formats money with a given currency code.
   *
   * The currency will define the properties to use for this formatting, but
   * those properties can be overridden using the options. Be careful when doing
   * this.
   *
   * For currencies that include decimals, this will always return the amount
   * with decimals included, even if those decimals are zeros. To exclude the
   * zeros, use the `stripZeros` option. For example, the function will normally
   * format `10.00` in `USD` as `$10.00` but when this option is true, it will
   * return `$10` instead.
   *
   * Since rounding errors are common in floating point math, sometimes a price
   * is provided as an integer in the smallest unit of a currency (eg: cents in
   * USD or yen in JPY). Set the `isSmallestUnit` to change the function to
   * operate on integer numbers instead. If this option is not set or false, the
   * function will format the amount `1025` in `USD` as `$1,025.00`, but when the
   * option is true, it will return `$10.25` instead.
   *
   * If the number is NaN, it will be treated as 0.
   *
   * If the currency code is not known, this will assume a default currency
   * similar to USD.
   *
   * If `isSmallestUnit` is set and the number is not an integer, it will be
   * rounded to an integer.
   * @param  number                  - The number to format.
   * @param  currency                - The currency to format.
   * @param  options                 - The options for the formatter.
   * @param  options.stripZeros      - Whether to strip zeros.
   * @param  options.isSmallestUnit  - Whether the number is the smallest unit of a currency.
   * @param  options.signForPositive - Whether to show the sign for positive numbers.
   * @param  options.forceLatin      - Whether to force the latin locale.
   * @return {string} A formatted string.
   */
  formatCurrency: FormatCurrency;
  /**
   * Returns a formatted price object which can be used to manually render a
   * formatted currency (eg: if you wanted to render the currency symbol in a
   * different font size).
   *
   * The currency will define the properties to use for this formatting, but
   * those properties can be overridden using the options. Be careful when doing
   * this.
   *
   * For currencies that include decimals, this will always return the amount
   * with decimals included, even if those decimals are zeros. To exclude the
   * zeros, use the `stripZeros` option. For example, the function will normally
   * format `10.00` in `USD` as `$10.00` but when this option is true, it will
   * return `$10` instead.
   *
   * Since rounding errors are common in floating point math, sometimes a price
   * is provided as an integer in the smallest unit of a currency (eg: cents in
   * USD or yen in JPY). Set the `isSmallestUnit` to change the function to
   * operate on integer numbers instead. If this option is not set or false, the
   * function will format the amount `1025` in `USD` as `$1,025.00`, but when the
   * option is true, it will return `$10.25` instead.
   *
   * Note that the `integer` return value of this function is not a number, but a
   * locale-formatted string which may include symbols like spaces, commas, or
   * periods as group separators. Similarly, the `fraction` property is a string
   * that contains the decimal separator.
   *
   * If the number is NaN, it will be treated as 0.
   *
   * If the currency code is not known, this will assume a default currency
   * similar to USD.
   *
   * If `isSmallestUnit` is set and the number is not an integer, it will be
   * rounded to an integer.
   * @param  number                  - The number to format.
   * @param  currency                - The currency to format.
   * @param  options                 - The options for the formatter.
   * @param  options.stripZeros      - Whether to strip zeros.
   * @param  options.isSmallestUnit  - Whether the number is the smallest unit of a currency.
   * @param  options.signForPositive - Whether to show the sign for positive numbers.
   * @param  options.forceLatin      - Whether to force the latin locale.
   * @return {CurrencyObject} A formatted price object.
   */
  getCurrencyObject: GetCurrencyObject;
}
/**
 * Creates a NumberFormatters instance that provides number and currency formatting functionality with locale awareness
 * @return {NumberFormatters} A NumberFormatters instance
 */
declare function createNumberFormatters(): NumberFormatters;
//#endregion
//#region src/index.d.ts
declare const setLocale: (locale: string) => void, setGeoLocation: (geoLocation: string) => void, setCurrencyOverrides: (overrides: Record<string, CurrencyOverride>) => void, formatNumber: FormatNumber, formatNumberCompact: FormatNumber, formatCurrency: FormatCurrency, getCurrencyObject: GetCurrencyObject;
//#endregion
export { type CurrencyObject, type CurrencyOverride, type FormatCurrency, type FormatNumber, type GetCurrencyObject, type NumberFormatCurrencyParams, type NumberFormatParams, createNumberFormatters, formatCurrency, formatNumber, formatNumberCompact, getCurrencyObject, setCurrencyOverrides, setGeoLocation, setLocale };