"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_ts_1 = require("./constants.cjs");
const index_ts_1 = require("./number-format-currency/index.cjs");
const number_format_ts_1 = require("./number-format.cjs");
/**
 * Creates a NumberFormatters instance that provides number and currency formatting functionality with locale awareness
 * @return {NumberFormatters} A NumberFormatters instance
 */
function createNumberFormatters() {
    let localeState;
    let geoLocationState;
    let currencyOverridesState;
    const setLocale = (locale) => {
        /**
         * The `Intl.NumberFormat` constructor fails only when there is a variant, divided by `_`.
         * These suffixes should be removed. Values like `de-at` or `es-mx`
         * should all be valid inputs for the constructor.
         */
        localeState = locale;
    };
    const setCurrencyOverrides = (overrides) => {
        currencyOverridesState = overrides;
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
        // Accessing the user's locale from `@wordpress/date` package.
        // This is a bit hacky but it's better than importing `@wordpress/date` and using its `getSettings` function,
        // because it drags moment.js with it even though we don't need it here.
        const localeFromUserSettings = typeof window !== 'undefined' ? window.wp?.date?.getSettings?.()?.l10n?.locale : undefined;
        const localeFromNavigator = typeof window !== 'undefined' ? window?.navigator?.language : undefined;
        return (localeState ??
            (localeFromUserSettings || localeFromNavigator) ??
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
            currencyOverrides: currencyOverridesState,
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
            currencyOverrides: currencyOverridesState,
        });
    };
    return {
        setLocale,
        setGeoLocation,
        setCurrencyOverrides,
        formatNumber,
        formatNumberCompact,
        formatCurrency,
        getCurrencyObject,
    };
}
exports.default = createNumberFormatters;
