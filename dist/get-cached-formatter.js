"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedFormatter = getCachedFormatter;
const debug_1 = __importDefault(require("debug"));
const constants_ts_1 = require("./constants.js");
const debug = (0, debug_1.default)('number-formatters:get-cached-formatter');
const formatterCache = new Map();
/**
 * Get a cached formatter for a given locale and options.
 * @param  params                - The parameters for the formatter.
 * @param  params.locale         - The locale to format the number in.
 * @param  params.options        - Intl.NumberFormatOptions to pass to the formatter.
 * @param  params.fallbackLocale - The locale to fallback to if the locale is not supported.
 * @param  params.retries        - The number of retries to attempt if the formatter is not created.
 * @return {Intl.NumberFormat} A cached formatter for the given locale and options.
 */
function getCachedFormatter({ locale, fallbackLocale = constants_ts_1.FALLBACK_LOCALE, options, retries = 1, }) {
    const cacheKey = JSON.stringify([locale, options]);
    try {
        return (formatterCache.get(cacheKey) ??
            formatterCache.set(cacheKey, new Intl.NumberFormat(locale, options)).get(cacheKey));
    }
    catch (error) {
        // If the locale is invalid, creating the NumberFormat will throw.
        debug(`Intl.NumberFormat was called with a non-existent locale "${locale}"; falling back to ${fallbackLocale}`);
        if (retries) {
            return getCachedFormatter({
                locale: fallbackLocale,
                options,
                retries: retries - 1,
            });
        }
        throw error;
    }
}
