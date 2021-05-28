"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cast(x) {
    return Array.isArray(x)
        ? x
        : isFunction(x)
            ? cast(x())
            : x === undefined
                ? []
                : [x];
}
exports.default = cast;
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=cast.js.map