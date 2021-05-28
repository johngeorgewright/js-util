"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Builder_1 = tslib_1.__importDefault(require("./Builder"));
function separate(input, predicate) {
    var length = input.length;
    var leftBuilder = new Builder_1.default(length);
    var rightBuilder = new Builder_1.default(length);
    for (var i = 0; i < length; i++) {
        var item = input[i];
        if (predicate(item)) {
            rightBuilder.add(item);
        }
        else {
            leftBuilder.add(item);
        }
    }
    return [leftBuilder.finish(), rightBuilder.finish()];
}
exports.default = separate;
//# sourceMappingURL=separate.js.map