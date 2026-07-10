Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
require("@wordpress/date");
let debug = require("debug");
debug = __toESM(debug, 1);
//#region src/get-cached-formatter.ts
const debug$2 = (0, debug.default)("number-formatters:get-cached-formatter");
const formatterCache = /* @__PURE__ */ new Map();
/**
* Get a cached formatter for a given locale and options.
* @param  params                - The parameters for the formatter.
* @param  params.locale         - The locale to format the number in.
* @param  params.options        - Intl.NumberFormatOptions to pass to the formatter.
* @param  params.fallbackLocale - The locale to fallback to if the locale is not supported.
* @param  params.retries        - The number of retries to attempt if the formatter is not created.
* @return {Intl.NumberFormat} A cached formatter for the given locale and options.
*/
function getCachedFormatter({ locale, fallbackLocale = "en", options, retries = 1 }) {
	const cacheKey = JSON.stringify([locale, options]);
	try {
		return formatterCache.get(cacheKey) ?? formatterCache.set(cacheKey, new Intl.NumberFormat(locale, options)).get(cacheKey);
	} catch (error) {
		debug$2(`Intl.NumberFormat was called with a non-existent locale "${locale}"; falling back to ${fallbackLocale}`);
		if (retries) return getCachedFormatter({
			locale: fallbackLocale,
			options,
			retries: retries - 1
		});
		throw error;
	}
}
//#endregion
//#region src/number-format-currency/currencies.ts
const defaultCurrencyOverrides = {
	AED: { symbol: "د.إ.‏" },
	AFN: { symbol: "؋" },
	ALL: { symbol: "Lek" },
	AMD: { symbol: "֏" },
	ANG: { symbol: "ƒ" },
	AOA: { symbol: "Kz" },
	ARS: { symbol: "$" },
	AUD: { symbol: "A$" },
	AWG: { symbol: "ƒ" },
	AZN: { symbol: "₼" },
	BAM: { symbol: "КМ" },
	BBD: { symbol: "Bds$" },
	BDT: { symbol: "৳" },
	BGN: { symbol: "лв." },
	BHD: { symbol: "د.ب.‏" },
	BIF: { symbol: "FBu" },
	BMD: { symbol: "$" },
	BND: { symbol: "$" },
	BOB: { symbol: "Bs" },
	BRL: { symbol: "R$" },
	BSD: { symbol: "$" },
	BTC: { symbol: "Ƀ" },
	BTN: { symbol: "Nu." },
	BWP: { symbol: "P" },
	BYR: { symbol: "р." },
	BZD: { symbol: "BZ$" },
	CAD: { symbol: "C$" },
	CDF: { symbol: "FC" },
	CHF: { symbol: "CHF" },
	CLP: { symbol: "$" },
	CNY: { symbol: "¥" },
	COP: { symbol: "$" },
	CRC: { symbol: "₡" },
	CUC: { symbol: "CUC" },
	CUP: { symbol: "$MN" },
	CVE: { symbol: "$" },
	CZK: { symbol: "Kč" },
	DJF: { symbol: "Fdj" },
	DKK: { symbol: "kr." },
	DOP: { symbol: "RD$" },
	DZD: { symbol: "د.ج.‏" },
	EGP: { symbol: "ج.م.‏" },
	ERN: { symbol: "Nfk" },
	ETB: { symbol: "ETB" },
	EUR: { symbol: "€" },
	FJD: { symbol: "FJ$" },
	FKP: { symbol: "£" },
	GBP: { symbol: "£" },
	GEL: { symbol: "Lari" },
	GHS: { symbol: "₵" },
	GIP: { symbol: "£" },
	GMD: { symbol: "D" },
	GNF: { symbol: "FG" },
	GTQ: { symbol: "Q" },
	GYD: { symbol: "G$" },
	HKD: { symbol: "HK$" },
	HNL: { symbol: "L." },
	HRK: { symbol: "kn" },
	HTG: { symbol: "G" },
	HUF: { symbol: "Ft" },
	IDR: { symbol: "Rp" },
	ILS: { symbol: "₪" },
	INR: { symbol: "₹" },
	IQD: { symbol: "د.ع.‏" },
	IRR: { symbol: "﷼" },
	ISK: { symbol: "kr." },
	JMD: { symbol: "J$" },
	JOD: { symbol: "د.ا.‏" },
	JPY: { symbol: "¥" },
	KES: { symbol: "S" },
	KGS: { symbol: "сом" },
	KHR: { symbol: "៛" },
	KMF: { symbol: "CF" },
	KPW: { symbol: "₩" },
	KRW: { symbol: "₩" },
	KWD: { symbol: "د.ك.‏" },
	KYD: { symbol: "$" },
	KZT: { symbol: "₸" },
	LAK: { symbol: "₭" },
	LBP: { symbol: "ل.ل.‏" },
	LKR: { symbol: "₨" },
	LRD: { symbol: "L$" },
	LSL: { symbol: "M" },
	LYD: { symbol: "د.ل.‏" },
	MAD: { symbol: "د.م.‏" },
	MDL: { symbol: "lei" },
	MGA: { symbol: "Ar" },
	MKD: { symbol: "ден." },
	MMK: { symbol: "K" },
	MNT: { symbol: "₮" },
	MOP: { symbol: "MOP$" },
	MRO: { symbol: "UM" },
	MTL: { symbol: "₤" },
	MUR: { symbol: "₨" },
	MVR: { symbol: "MVR" },
	MWK: { symbol: "MK" },
	MXN: { symbol: "MX$" },
	MYR: { symbol: "RM" },
	MZN: { symbol: "MT" },
	NAD: { symbol: "N$" },
	NGN: { symbol: "₦" },
	NIO: { symbol: "C$" },
	NOK: { symbol: "kr" },
	NPR: { symbol: "₨" },
	NZD: { symbol: "NZ$" },
	OMR: { symbol: "﷼" },
	PAB: { symbol: "B/." },
	PEN: { symbol: "S/." },
	PGK: { symbol: "K" },
	PHP: { symbol: "₱" },
	PKR: { symbol: "₨" },
	PLN: { symbol: "zł" },
	PYG: { symbol: "₲" },
	QAR: { symbol: "﷼" },
	RON: { symbol: "lei" },
	RSD: { symbol: "Дин." },
	RUB: { symbol: "₽" },
	RWF: { symbol: "RWF" },
	SAR: { symbol: "﷼" },
	SBD: { symbol: "S$" },
	SCR: { symbol: "₨" },
	SDD: { symbol: "LSd" },
	SDG: { symbol: "£‏" },
	SEK: { symbol: "kr" },
	SGD: { symbol: "S$" },
	SHP: { symbol: "£" },
	SLL: { symbol: "Le" },
	SOS: { symbol: "S" },
	SRD: { symbol: "$" },
	STD: { symbol: "Db" },
	SVC: { symbol: "₡" },
	SYP: { symbol: "£" },
	SZL: { symbol: "E" },
	THB: { symbol: "฿" },
	TJS: { symbol: "TJS" },
	TMT: { symbol: "m" },
	TND: { symbol: "د.ت.‏" },
	TOP: { symbol: "T$" },
	TRY: { symbol: "TL" },
	TTD: { symbol: "TT$" },
	TVD: { symbol: "$T" },
	TWD: { symbol: "NT$" },
	TZS: { symbol: "TSh" },
	UAH: { symbol: "₴" },
	UGX: { symbol: "USh" },
	USD: {},
	UYU: { symbol: "$U" },
	UZS: { symbol: "сўм" },
	VEB: { symbol: "Bs." },
	VEF: { symbol: "Bs. F." },
	VND: { symbol: "₫" },
	VUV: { symbol: "VT" },
	WST: { symbol: "WS$" },
	XAF: { symbol: "F" },
	XCD: { symbol: "$" },
	XOF: { symbol: "F" },
	XPF: { symbol: "F" },
	YER: { symbol: "﷼" },
	ZAR: { symbol: "R" },
	ZMW: { symbol: "ZK" },
	WON: { symbol: "₩" }
};
//#endregion
//#region src/number-format-currency/index.ts
const debug$1 = (0, debug.default)("number-formatters:number-format-currency");
/**
* Retrieves the currency override for a given currency.
*
* If the currency is USD and the user is not in the US, it will return `US$`.
*
* Per-field merge order is: dynamic overrides (from `currencyOverrides`) → hard-coded defaults.
* This means a caller can supply a partial map (eg: only `decimal`) without losing the
* default `symbol`.
* @param  currency          - The currency to get the override for.
* @param  geoLocation       - The geo location of the user.
* @param  currencyOverrides - Dynamic per-currency overrides supplied by the host application.
* @return {CurrencyOverride | undefined} The currency override.
*/
function getCurrencyOverride(currency, geoLocation, currencyOverrides) {
	if (currency === "USD" && geoLocation && geoLocation !== "" && geoLocation !== "US") return {
		symbol: "US$",
		...currencyOverrides?.USD
	};
	const defaultOverride = defaultCurrencyOverrides[currency];
	const dynamicOverride = currencyOverrides?.[currency];
	if (!defaultOverride && !dynamicOverride) return;
	return {
		...defaultOverride,
		...dynamicOverride
	};
}
/**
* Returns a valid currency code based on a shortlist of currency codes.
* Only currencies from the shortlist are allowed. Everything else will fall back to `FALLBACK_CURRENCY`.
* @param  currency          - The currency to get the valid currency for.
* @param  geoLocation       - The geo location of the user.
* @param  currencyOverrides - Dynamic per-currency overrides supplied by the host application.
* @return {string} The valid currency.
*/
function getValidCurrency(currency, geoLocation, currencyOverrides) {
	if (!getCurrencyOverride(currency, geoLocation, currencyOverrides)) {
		debug$1(`getValidCurrency was called with a non-existent currency "${currency}"; falling back to USD`);
		return "USD";
	}
	return currency;
}
/**
* Returns a currency formatter for a given currency.
* @param  params                   - The parameters for the currency formatter.
* @param  params.number            - The number to format.
* @param  params.currency          - The currency to format.
* @param  params.browserSafeLocale - The browser safe locale.
* @param  params.forceLatin        - Whether to force the latin locale.
* @param  params.stripZeros        - Whether to strip zeros.
* @param  params.signForPositive   - Whether to show the sign for positive numbers.
* @return {Intl.NumberFormat} The currency formatter.
*/
function getCurrencyFormatter({ number, currency, browserSafeLocale, forceLatin = true, stripZeros, signForPositive }) {
	return getCachedFormatter({
		locale: `${browserSafeLocale}${forceLatin ? "-u-nu-latn" : ""}`,
		options: {
			style: "currency",
			currency,
			...stripZeros && Number.isInteger(number) && {
				/**
				* There's an option called `trailingZeroDisplay` but it does not yet work
				* in FF so we have to strip zeros manually.
				*/
				maximumFractionDigits: 0,
				minimumFractionDigits: 0
			},
			...signForPositive && { signDisplay: "exceptZero" }
		}
	});
}
/**
* Hard-coded smallest-unit exponent overrides for currencies where browser ICU's
* `maximumFractionDigits` disagrees with the API's smallest-unit encoding.
*
* This list exists as a safety net for callers that have not yet wired up the
* dynamic `currencyOverrides` path (eg: the WPCOM currencies endpoint). Once a
* host application provides overrides via `setCurrencyOverrides`, those take
* precedence on a per-currency basis.
*
* Keep this list minimal — the backend is the source of truth for the API's
* smallest-unit encoding, so adding speculative entries here risks silent
* drift. Only add a currency once we've verified that browsers report a
* value the API does not use.
*
* - IDR: modern Chrome / Node 24+ ICU reports 0; the API encodes with exponent 2.
* - HUF: same browser/API divergence as IDR.
*/
const SMALLEST_UNIT_EXPONENT_OVERRIDES = {
	IDR: 2,
	HUF: 2
};
/**
* Returns the smallest unit exponent for a currency.
*
* Lookup order:
* 1. The dynamic `currencyOverrides[currency].decimal` if a host application has supplied one (typically via `setCurrencyOverrides`).
* 2. The hard-coded `SMALLEST_UNIT_EXPONENT_OVERRIDES` map.
* 3. The browser-derived display precision (`fallback`).
* @param currency          - The currency code (ISO 4217)
* @param fallback          - The browser-derived precision to use when no override applies
* @param currencyOverrides - Dynamic per-currency overrides supplied by the host application
* @return number           - The smallest unit exponent
*/
function getSmallestUnitExponent(currency, fallback, currencyOverrides) {
	const dynamicDecimal = currencyOverrides?.[currency]?.decimal;
	if (typeof dynamicDecimal === "number") return dynamicDecimal;
	return SMALLEST_UNIT_EXPONENT_OVERRIDES[currency] ?? fallback;
}
/**
* Returns the precision for a given locale and currency.
* @param  browserSafeLocale - The browser safe locale.
* @param  currency          - The currency to get the precision for.
* @param  forceLatin        - Whether to force the latin locale.
* @return {number | undefined} The precision.
*/
function getPrecisionForLocaleAndCurrency(browserSafeLocale, currency, forceLatin) {
	/**
	* For regular numbers, the default is 3 if neither `minimumFractionDigits` or `maximumFractionDigits` are set,
	* otherwise the greatest betweem `minimumFractionDigits` and 3.
	*
	* For currencies, the default is dependent on the currency.
	*
	* This may also result in undefined, for several reasons:
	* see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#significantdigitsfractiondigits_default_values
	*/
	return getCurrencyFormatter({
		number: 0,
		currency,
		browserSafeLocale,
		forceLatin
	}).resolvedOptions().maximumFractionDigits;
}
/**
* Scales a number to a specified precision and rounds it to that precision.
* It ensures that all currency values are consistently rounded to the desired precision,
* avoiding issues with floating-point arithmetic.
* @param  number            - The number to scale.
* @param  currencyPrecision - The precision to scale the number to.
* @return {number} The scaled number.
*/
function scaleNumberForPrecision(number, currencyPrecision) {
	const scale = Math.pow(10, currencyPrecision);
	return Math.round(number * scale) / scale;
}
/**
* Prepares a number for formatting.
* @param  number            - The number to prepare.
* @param  currencyPrecision - The display precision (from the browser) to round the result to.
* @param  currency          - The currency code, used to look up any smallest-unit exponent override.
* @param  isSmallestUnit    - Whether the number is the smallest unit of a currency.
* @param  currencyOverrides - Dynamic per-currency overrides supplied by the host application.
* @return {number} The prepared number.
*/
function prepareNumberForFormatting(number, currencyPrecision, currency, isSmallestUnit, currencyOverrides) {
	if (isNaN(number)) {
		debug$1("formatCurrency was called with NaN");
		return 0;
	}
	if (isSmallestUnit) {
		if (!Number.isInteger(number)) debug$1("formatCurrency was called with isSmallestUnit and a float which will be rounded", number);
		const smallestUnitDivisor = 10 ** getSmallestUnitExponent(currency, currencyPrecision, currencyOverrides);
		return scaleNumberForPrecision(Math.round(number) / smallestUnitDivisor, currencyPrecision);
	}
	return scaleNumberForPrecision(number, currencyPrecision);
}
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
const numberFormatCurrency = ({ number, browserSafeLocale, currency, stripZeros, isSmallestUnit, signForPositive, geoLocation, forceLatin, currencyOverrides }) => {
	const validCurrency = getValidCurrency(currency, geoLocation, currencyOverrides);
	const currencyOverride = getCurrencyOverride(validCurrency, geoLocation, currencyOverrides);
	const currencyPrecision = getPrecisionForLocaleAndCurrency(browserSafeLocale, validCurrency, forceLatin);
	if (isSmallestUnit && typeof currencyPrecision === "undefined") throw new Error(`Could not determine currency precision for ${validCurrency} in ${browserSafeLocale}`);
	const numberAsFloat = prepareNumberForFormatting(number, currencyPrecision ?? 0, validCurrency, isSmallestUnit, currencyOverrides);
	return getCurrencyFormatter({
		number: numberAsFloat,
		currency: validCurrency,
		browserSafeLocale,
		forceLatin,
		stripZeros,
		signForPositive
	}).formatToParts(numberAsFloat).reduce((formatted, part) => {
		switch (part.type) {
			case "currency":
				if (currencyOverride?.symbol) return formatted + currencyOverride.symbol;
				return formatted + part.value;
			default: return formatted + part.value;
		}
	}, "");
};
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
const getCurrencyObject$1 = ({ number, browserSafeLocale, currency, stripZeros, isSmallestUnit, signForPositive, geoLocation, forceLatin, currencyOverrides }) => {
	const validCurrency = getValidCurrency(currency, geoLocation, currencyOverrides);
	const currencyOverride = getCurrencyOverride(validCurrency, geoLocation, currencyOverrides);
	const numberAsFloat = prepareNumberForFormatting(number, getPrecisionForLocaleAndCurrency(browserSafeLocale, validCurrency, forceLatin) ?? 0, validCurrency, isSmallestUnit, currencyOverrides);
	const parts = getCurrencyFormatter({
		number: numberAsFloat,
		currency: validCurrency,
		browserSafeLocale,
		forceLatin,
		stripZeros,
		signForPositive
	}).formatToParts(numberAsFloat);
	let sign = "";
	let symbol = "$";
	let symbolPosition = "before";
	let hasAmountBeenSet = false;
	let hasDecimalBeenSet = false;
	let integer = "";
	let fraction = "";
	parts.forEach((part) => {
		switch (part.type) {
			case "currency":
				symbol = currencyOverride?.symbol ?? part.value;
				if (hasAmountBeenSet) symbolPosition = "after";
				return;
			case "group":
				integer += part.value;
				hasAmountBeenSet = true;
				return;
			case "decimal":
				fraction += part.value;
				hasAmountBeenSet = true;
				hasDecimalBeenSet = true;
				return;
			case "integer":
				integer += part.value;
				hasAmountBeenSet = true;
				return;
			case "fraction":
				fraction += part.value;
				hasAmountBeenSet = true;
				hasDecimalBeenSet = true;
				return;
			case "minusSign":
				sign = "-";
				return;
			case "plusSign": sign = "+";
		}
	});
	return {
		sign,
		symbol,
		symbolPosition,
		integer,
		fraction,
		hasNonZeroFraction: !Number.isInteger(numberAsFloat) && hasDecimalBeenSet,
		floatValue: numberAsFloat
	};
};
//#endregion
//#region src/number-format.ts
/**
* Formats numbers using locale settings and/or passed options.
* @param  params                     - The parameters for the number formatter.
* @param  params.browserSafeLocale   - The browser safe locale.
* @param  params.decimals            - The number of decimal places to use.
* @param  params.forceLatin          - Whether to force the latin locale.
* @param  params.numberFormatOptions - The options for the number formatter.
* @return {Intl.NumberFormat} The number formatter.
*/
const numberFormat = ({ browserSafeLocale, decimals = 0, forceLatin = true, numberFormatOptions = {} }) => {
	return getCachedFormatter({
		locale: `${browserSafeLocale}${forceLatin ? "-u-nu-latn" : ""}`,
		options: {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
			...numberFormatOptions
		}
	});
};
/**
* Convenience method for formatting numbers in a compact notation e.g. 1K, 1M, etc.
* Basically sets `notation: 'compact'` and `maximumFractionDigits: 1` in the options.
* Everything is overridable by passing the `numberFormatOptions` option.
* If you want more digits, pass `maximumFractionDigits: 2`.
* @param  params                     - The parameters for the number formatter.
* @param  params.numberFormatOptions - The options for the number formatter.
* @return {Intl.NumberFormat} The number formatter.
*/
const numberFormatCompact = ({ numberFormatOptions = {}, ...params }) => numberFormat({
	...params,
	numberFormatOptions: {
		notation: "compact",
		maximumFractionDigits: 1,
		...numberFormatOptions
	}
});
//#endregion
//#region src/create-number-formatters.ts
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
		const localeFromUserSettings = typeof window !== "undefined" ? window.wp?.date?.getSettings?.()?.l10n?.locale : void 0;
		const localeFromNavigator = typeof window !== "undefined" ? window?.navigator?.language : void 0;
		return (localeState ?? (localeFromUserSettings || localeFromNavigator) ?? "en").split("_")[0];
	};
	const setGeoLocation = (geoLocation) => {
		geoLocationState = geoLocation;
	};
	const formatNumber = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
		try {
			return numberFormat({
				browserSafeLocale: getBrowserSafeLocale(),
				decimals,
				forceLatin,
				numberFormatOptions
			}).format(number);
		} catch {
			return String(number);
		}
	};
	const formatNumberCompact = (number, { decimals = 0, forceLatin = true, numberFormatOptions = {} } = {}) => {
		try {
			return numberFormatCompact({
				browserSafeLocale: getBrowserSafeLocale(),
				decimals,
				forceLatin,
				numberFormatOptions
			}).format(number);
		} catch {
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
			currencyOverrides: currencyOverridesState
		});
	};
	const getCurrencyObject = (number, currency, { stripZeros = false, isSmallestUnit = false, signForPositive = false, forceLatin = true } = {}) => {
		return getCurrencyObject$1({
			number,
			currency,
			browserSafeLocale: getBrowserSafeLocale(),
			stripZeros,
			isSmallestUnit,
			signForPositive,
			geoLocation: geoLocationState,
			forceLatin,
			currencyOverrides: currencyOverridesState
		});
	};
	return {
		setLocale,
		setGeoLocation,
		setCurrencyOverrides,
		formatNumber,
		formatNumberCompact,
		formatCurrency,
		getCurrencyObject
	};
}
const { setLocale, setGeoLocation, setCurrencyOverrides, formatNumber, formatNumberCompact, formatCurrency, getCurrencyObject } = createNumberFormatters();
//#endregion
exports.createNumberFormatters = createNumberFormatters;
exports.formatCurrency = formatCurrency;
exports.formatNumber = formatNumber;
exports.formatNumberCompact = formatNumberCompact;
exports.getCurrencyObject = getCurrencyObject;
exports.setCurrencyOverrides = setCurrencyOverrides;
exports.setGeoLocation = setGeoLocation;
exports.setLocale = setLocale;
