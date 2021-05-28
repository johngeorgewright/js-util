"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var async_1 = require("@johngw/async");
function accumulateRace(asyncIterable, ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var accumulated, accumulating;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            accumulated = [];
            accumulating = (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var asyncIterable_1, asyncIterable_1_1, item, e_1_1;
                var e_1, _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, 6, 11]);
                            asyncIterable_1 = tslib_1.__asyncValues(asyncIterable);
                            _b.label = 1;
                        case 1: return [4 /*yield*/, asyncIterable_1.next()];
                        case 2:
                            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3 /*break*/, 4];
                            item = asyncIterable_1_1.value;
                            accumulated.push(item);
                            _b.label = 3;
                        case 3: return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 11];
                        case 5:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 11];
                        case 6:
                            _b.trys.push([6, , 9, 10]);
                            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3 /*break*/, 8];
                            return [4 /*yield*/, _a.call(asyncIterable_1)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 10: return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/, Promise.race([
                    accumulating.then(function () { return accumulated; }),
                    async_1.timeout(ms).then(function () { return accumulated; }),
                ])];
        });
    });
}
exports.default = accumulateRace;
//# sourceMappingURL=accumulateRace.js.map