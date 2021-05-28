"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function debounceP(fn, ms) {
    var _this = this;
    var lastResult;
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (timeout) {
                    start();
                    return [2 /*return*/, lastResult];
                }
                start();
                lastResult = fn.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args)));
                return [2 /*return*/, lastResult];
            });
        });
    };
    function start() {
        clear();
        timeout = global.setTimeout(clear, ms);
    }
    function clear() {
        if (timeout) {
            timeout = global.clearTimeout(timeout);
        }
    }
}
exports.default = debounceP;
//# sourceMappingURL=debounceP.js.map