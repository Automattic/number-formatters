"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumberFormatters = exports.getCurrencyObject = exports.formatCurrency = exports.formatNumberCompact = exports.formatNumber = exports.setCurrencyOverrides = exports.setGeoLocation = exports.setLocale = void 0;
const tslib_1 = require("tslib");
const create_number_formatters_ts_1 = tslib_1.__importDefault(require("./create-number-formatters.cjs"));
exports.createNumberFormatters = create_number_formatters_ts_1.default;
const defaultFormatter = (0, create_number_formatters_ts_1.default)();
exports.setLocale = defaultFormatter.setLocale, exports.setGeoLocation = defaultFormatter.setGeoLocation, exports.setCurrencyOverrides = defaultFormatter.setCurrencyOverrides, exports.formatNumber = defaultFormatter.formatNumber, exports.formatNumberCompact = defaultFormatter.formatNumberCompact, exports.formatCurrency = defaultFormatter.formatCurrency, exports.getCurrencyObject = defaultFormatter.getCurrencyObject;
// We can optionally export the formatters individually if we want to use them in a more granular way.
// export { numberFormat, numberFormatCompact, numberFormatCurrency, getCurrencyObject };
