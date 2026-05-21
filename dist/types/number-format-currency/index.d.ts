import type { CurrencyObject, NumberFormatCurrencyParams } from '../types.ts';
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
 *
 * @param  params                   - The parameters for the currency formatter.
 * @param  params.number            - The number to format.
 * @param  params.browserSafeLocale - The browser safe locale.
 * @param  params.currency          - The currency to format.
 * @param  params.stripZeros        - Whether to strip zeros.
 * @param  params.isSmallestUnit    - Whether the number is the smallest unit of a currency.
 * @param  params.signForPositive   - Whether to show the sign for positive numbers.
 * @param  params.geoLocation       - The geo location of the user.
 * @param  params.forceLatin        - Whether to force the latin locale.
 * @param  params.currencyOverrides - Dynamic per-currency overrides supplied by the host application.
 * @return {string} A formatted string.
 */
declare const numberFormatCurrency: ({ number, browserSafeLocale, currency, stripZeros, isSmallestUnit, signForPositive, geoLocation, forceLatin, currencyOverrides, }: NumberFormatCurrencyParams) => string;
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
 *
 * @param  params                   - The parameters for the currency formatter.
 * @param  params.number            - The number to format.
 * @param  params.browserSafeLocale - The browser safe locale.
 * @param  params.currency          - The currency to format.
 * @param  params.stripZeros        - Whether to strip zeros.
 * @param  params.isSmallestUnit    - Whether the number is the smallest unit of a currency.
 * @param  params.signForPositive   - Whether to show the sign for positive numbers.
 * @param  params.geoLocation       - The geo location of the user.
 * @param  params.forceLatin        - Whether to force the latin locale.
 * @param  params.currencyOverrides - Dynamic per-currency overrides supplied by the host application.
 * @return {CurrencyObject} A formatted string e.g. { symbol:'$', integer: '$99', fraction: '.99', sign: '-' }
 */
declare const getCurrencyObject: ({ number, browserSafeLocale, currency, stripZeros, isSmallestUnit, signForPositive, geoLocation, forceLatin, currencyOverrides, }: NumberFormatCurrencyParams) => CurrencyObject;
export { numberFormatCurrency, getCurrencyObject };
