"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(a, fn) {
    var b = {};
    for (var key in a) {
        b[key] = fn(a[key], key);
    }
    return b;
}
exports.default = map;
//# sourceMappingURL=map.js.map