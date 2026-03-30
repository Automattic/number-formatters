"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALLBACK_CURRENCY = exports.FALLBACK_LOCALE = void 0;
const tslib_1 = require("tslib");
exports.FALLBACK_LOCALE = 'en';
exports.FALLBACK_CURRENCY = 'USD';
// This is just to hint to the dependency extraction tool that this package depends on @wordpress/date
// See: https://github.com/Automattic/jetpack/pull/47812#issuecomment-4142452829
tslib_1.__exportStar(require("@wordpress/date"), exports);
