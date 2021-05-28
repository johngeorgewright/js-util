"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function accumulate(asyncIterable) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_1, _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, result, e_1_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    asyncIterable_1 = tslib_1.__asyncValues(asyncIterable);
                    _b.label = 2;
                case 2: return [4 /*yield*/, asyncIterable_1.next()];
                case 3:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3 /*break*/, 5];
                    result = asyncIterable_1_1.value;
                    results.push(result);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(asyncIterable_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, results];
            }
        });
    });
}
exports.default = accumulate;
//# sourceMappingURL=accumulate.js.map