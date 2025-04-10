"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumberFormatters = exports.getCurrencyObject = exports.formatCurrency = exports.formatNumberCompact = exports.formatNumber = exports.setGeoLocation = exports.setLocale = void 0;
const create_number_formatters_ts_1 = __importDefault(require("./create-number-formatters.js"));
exports.createNumberFormatters = create_number_formatters_ts_1.default;
const defaultFormatter = (0, create_number_formatters_ts_1.default)();
exports.setLocale = defaultFormatter.setLocale, exports.setGeoLocation = defaultFormatter.setGeoLocation, exports.formatNumber = defaultFormatter.formatNumber, exports.formatNumberCompact = defaultFormatter.formatNumberCompact, exports.formatCurrency = defaultFormatter.formatCurrency, exports.getCurrencyObject = defaultFormatter.getCurrencyObject;
__exportStar(require("./types.js"), exports);
// We can optionally export the formatters individually if we want to use them in a more granular way.
// export { numberFormat, numberFormatCompact, numberFormatCurrency, getCurrencyObject };
