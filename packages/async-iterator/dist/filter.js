"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function filter(iterable, filter) {
    return tslib_1.__asyncGenerator(this, arguments, function filter_1() {
        var iterable_1, iterable_1_1, item, e_1_1;
        var e_1, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, 8, 13]);
                    iterable_1 = tslib_1.__asyncValues(iterable);
                    _b.label = 1;
                case 1: return [4 /*yield*/, tslib_1.__await(iterable_1.next())];
                case 2:
                    if (!(iterable_1_1 = _b.sent(), !iterable_1_1.done)) return [3 /*break*/, 6];
                    item = iterable_1_1.value;
                    if (!filter(item)) return [3 /*break*/, 5];
                    return [4 /*yield*/, tslib_1.__await(item)];
                case 3: return [4 /*yield*/, _b.sent()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, tslib_1.__await(_a.call(iterable_1))];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = filter;
//# sourceMappingURL=filter.js.map