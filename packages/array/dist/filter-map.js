"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Builder_1 = tslib_1.__importDefault(require("./Builder"));
function filterMap(input, filter, map) {
    var builder = new Builder_1.default(input.length);
    for (var i = 0; i < input.length; i++) {
        var item = input[i];
        if (filter(item)) {
            builder.add(map(item));
        }
    }
    return builder.finish();
}
exports.default = filterMap;
//# sourceMappingURL=filter-map.js.map