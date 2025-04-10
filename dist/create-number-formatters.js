"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("@wordpress/date");
const constants_ts_1 = require("./constants.js");
const index_ts_1 = require("./number-format-currency/index.js");
const number_format_ts_1 = require("./number-format.js");
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
        const { l10n: { locale: localeFromUserSettings }, } = (0, date_1.getSettings)();
        return (localeState ??
            (localeFromUserSettings || global?.window?.navigator?.language) ??
            constants_ts_1.FALLBACK_LOCALE).split('_')[0];
    };
    const setGeoLocation = (geoLocation) => {
        geoLocationState = geoLocation;
    };
    const formatNumber = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
        try {
            const formatter = (0, number_format_ts_1.numberFormat)({
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
            const formatter = (0, number_format_ts_1.numberFormatCompact)({
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
        return (0, index_ts_1.numberFormatCurrency)({
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
        return (0, index_ts_1.getCurrencyObject)({
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
exports.default = createNumberFormatters;
