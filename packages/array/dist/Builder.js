"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_SIZE = 33500000;
/**
 * 3x faster than just pushing items to an array.
 * However, you must specify a maximum size.
 *
 * @example
 * const builder = new Builder<number>(3)
 * builder.add(1)
 * builder.add(2)
 * builder.finish() // [1, 2]
 */
var Builder = /** @class */ (function () {
    function Builder(maxSize) {
        this.array = new Array(Math.min(maxSize, MAX_SIZE));
        this.index = 0;
    }
    Builder.prototype.add = function (item) {
        this.array[this.index++] = item;
    };
    Builder.prototype.finish = function () {
        this.array.length = this.index;
        return this.array;
    };
    return Builder;
}());
exports.default = Builder;
//# sourceMappingURL=Builder.js.map