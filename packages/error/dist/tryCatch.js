"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function tryCatch(t, c) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    try {
        return t.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args)));
    }
    catch (error) {
        return c.apply(void 0, tslib_1.__spreadArray([error], tslib_1.__read(args)));
    }
}
exports.default = tryCatch;
//# sourceMappingURL=tryCatch.js.map