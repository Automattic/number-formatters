interface Params {
    locale: string;
    options?: Intl.NumberFormatOptions;
    fallbackLocale?: string;
    retries?: number;
}
/**
 * Get a cached formatter for a given locale and options.
 * @param  params                - The parameters for the formatter.
 * @param  params.locale         - The locale to format the number in.
 * @param  params.options        - Intl.NumberFormatOptions to pass to the formatter.
 * @param  params.fallbackLocale - The locale to fallback to if the locale is not supported.
 * @param  params.retries        - The number of retries to attempt if the formatter is not created.
 * @return {Intl.NumberFormat} A cached formatter for the given locale and options.
 */
export declare function getCachedFormatter({ locale, fallbackLocale, options, retries, }: Params): Intl.NumberFormat;
export {};
