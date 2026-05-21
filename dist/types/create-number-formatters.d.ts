import type { CurrencyOverride, FormatCurrency, FormatNumber, GetCurrencyObject } from './types.ts';
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
export interface NumberFormatters {
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
export default createNumberFormatters;
