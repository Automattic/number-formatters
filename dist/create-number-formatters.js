import { FALLBACK_LOCALE } from './constants.js';
import { numberFormatCurrency, getCurrencyObject as getCurrencyObjectFromCurrencyFormatter, } from './number-format-currency/index.js';
import { numberFormat, numberFormatCompact } from './number-format.js';
/**
 * Creates a NumberFormatters instance that provides number and currency formatting functionality with locale awareness
 * @return {NumberFormatters} A NumberFormatters instance
 */
function createNumberFormatters() {
    let browserSafeLocale = FALLBACK_LOCALE;
    let geoLocation;
    const setLocale = (locale) => {
        /**
         * The `Intl.NumberFormat` constructor fails only when there is a variant, divided by `_`.
         * These suffixes should be removed. Values like `de-at` or `es-mx`
         * should all be valid inputs for the constructor.
         */
        browserSafeLocale = locale.split('_')[0];
    };
    const setGeoLocation = (newGeoLocation) => {
        geoLocation = newGeoLocation;
    };
    const formatNumber = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
        try {
            const formatter = numberFormat({
                browserSafeLocale,
                decimals,
                forceLatin,
                numberFormatOptions,
            });
            return formatter.format(number);
        }
        catch {
            return String(number);
        }
    };
    const formatNumberCompact = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
        try {
            const formatter = numberFormatCompact({
                browserSafeLocale,
                decimals,
                forceLatin,
                numberFormatOptions,
            });
            return formatter.format(number);
        }
        catch {
            return String(number);
        }
    };
    const formatCurrency = (number, currency, { stripZeros = false, isSmallestUnit = false, signForPositive = false, forceLatin = true } = {}) => {
        return numberFormatCurrency({
            number,
            currency,
            browserSafeLocale,
            stripZeros,
            isSmallestUnit,
            signForPositive,
            geoLocation,
            forceLatin,
        });
    };
    const getCurrencyObject = (number, currency, { stripZeros = false, isSmallestUnit = false, signForPositive = false, forceLatin = true } = {}) => {
        return getCurrencyObjectFromCurrencyFormatter({
            number,
            currency,
            browserSafeLocale,
            stripZeros,
            isSmallestUnit,
            signForPositive,
            geoLocation,
            forceLatin,
        });
    };
    return {
        setLocale,
        setGeoLocation,
        formatNumber,
        formatNumberCompact,
        formatCurrency,
        getCurrencyObject,
    };
}
export default createNumberFormatters;
