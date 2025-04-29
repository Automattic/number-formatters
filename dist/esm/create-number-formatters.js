import { getSettings } from '@wordpress/date';
import { FALLBACK_LOCALE } from "./constants.js";
import { numberFormatCurrency, getCurrencyObject as getCurrencyObjectFromCurrencyFormatter, } from "./number-format-currency/index.js";
import { numberFormat, numberFormatCompact } from "./number-format.js";
/**
 * Creates a NumberFormatters instance that provides number and currency formatting functionality with locale awareness
 * @return {NumberFormatters} A NumberFormatters instance
 */
function createNumberFormatters() {
    let localeState;
    let geoLocationState;
    const setLocale = (locale) => {
        /**
         * The `Intl.NumberFormat` constructor fails only when there is a variant, divided by `_`.
         * These suffixes should be removed. Values like `de-at` or `es-mx`
         * should all be valid inputs for the constructor.
         */
        localeState = locale;
    };
    /**
     * Returns the locale defined on the module instance (through `setLocale`)
     * or the "fallback locale" if no locale has been set.
     *
     * The "fallback locale" is defined as:
     * - the current WP user locale, if available through `@wordpress/date` settings (assuming this runs in a WordPress context)
     * - or the browser locale, if available through `window.navigator.language`
     * - or the fallback locale constant (`FALLBACK_LOCALE`)
     *
     * @return {string} The locale to use for formatting.
     */
    const getBrowserSafeLocale = () => {
        const { l10n: { locale: localeFromUserSettings }, } = getSettings();
        return (localeState ??
            (localeFromUserSettings || global?.window?.navigator?.language) ??
            FALLBACK_LOCALE).split('_')[0];
    };
    const setGeoLocation = (geoLocation) => {
        geoLocationState = geoLocation;
    };
    const formatNumber = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
        try {
            const formatter = numberFormat({
                browserSafeLocale: getBrowserSafeLocale(),
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
                browserSafeLocale: getBrowserSafeLocale(),
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
            browserSafeLocale: getBrowserSafeLocale(),
            stripZeros,
            isSmallestUnit,
            signForPositive,
            geoLocation: geoLocationState,
            forceLatin,
        });
    };
    const getCurrencyObject = (number, currency, { stripZeros = false, isSmallestUnit = false, signForPositive = false, forceLatin = true } = {}) => {
        return getCurrencyObjectFromCurrencyFormatter({
            number,
            currency,
            browserSafeLocale: getBrowserSafeLocale(),
            stripZeros,
            isSmallestUnit,
            signForPositive,
            geoLocation: geoLocationState,
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
