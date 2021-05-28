"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterReduce(input, output, filter, reduce) {
    for (var i = 0; i < input.length; i++) {
        var item = input[i];
        if (filter(output, item)) {
            output = reduce(output, item);
        }
    }
    return output;
}
exports.default = filterReduce;
//# sourceMappingURL=filter-reduce.js.map