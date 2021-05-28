"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var async_1 = require("@johngw/async");
function iteratorRace(asyncIterable, ms) {
    return tslib_1.__asyncGenerator(this, arguments, function iteratorRace_1() {
        var asyncIterator, timer, _a, done, value, error_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, 11, 13]);
                    timer = async_1.detonate(ms);
                    return [4 /*yield*/, tslib_1.__await(Promise.race([
                            asyncIterable[Symbol.asyncIterator](),
                            timer,
                        ]))];
                case 1:
                    asyncIterator = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 9];
                    return [4 /*yield*/, tslib_1.__await(Promise.race([asyncIterator.next(), timer]))];
                case 3:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (!done) return [3 /*break*/, 5];
                    return [4 /*yield*/, tslib_1.__await(asyncIterator.return && asyncIterator.return())];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, tslib_1.__await(value)];
                case 6: return [4 /*yield*/, _b.sent()];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 13];
                case 10:
                    error_1 = _b.sent();
                    if (!(error_1 instanceof async_1.TimeoutError)) {
                        throw error_1;
                    }
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, tslib_1.__await(asyncIterator && asyncIterator.return && asyncIterator.return())];
                case 12: return [2 /*return*/, _b.sent()];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = iteratorRace;
//# sourceMappingURL=iteratorRace.js.map