"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var object_1 = require("@johngw/object");
function combineIterators() {
    var asyncIterables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncIterables[_i] = arguments[_i];
    }
    return tslib_1.__asyncGenerator(this, arguments, function combineIterators_1() {
        var asyncIterators, results, iteration, _a, index, done, value, _b, _c, iterator;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    asyncIterators = asyncIterables.reduce(function (asyncIterators, asyncIterable, index) {
                        var _a;
                        return (tslib_1.__assign(tslib_1.__assign({}, asyncIterators), (_a = {}, _a[index.toString()] = asyncIterable[Symbol.asyncIterator](), _a)));
                    }, {});
                    results = Array(asyncIterables.length);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, , 9, 10]);
                    iteration = object_1.map(asyncIterators, getNext);
                    _e.label = 2;
                case 2:
                    if (!!object_1.isEmpty(iteration)) return [3 /*break*/, 8];
                    return [4 /*yield*/, tslib_1.__await(Promise.race(Object.values(iteration)))];
                case 3:
                    _a = _e.sent(), index = _a.index, done = _a.done, value = _a.value;
                    if (!done) return [3 /*break*/, 4];
                    delete iteration[index];
                    results[Number(index)] = value;
                    return [3 /*break*/, 7];
                case 4:
                    iteration[index] = getNext(asyncIterators[index], index);
                    return [4 /*yield*/, tslib_1.__await(value)];
                case 5: return [4 /*yield*/, _e.sent()];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7: return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 10];
                case 9:
                    try {
                        for (_b = tslib_1.__values(Object.values(asyncIterators)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            iterator = _c.value;
                            if (iterator.return) {
                                iterator.return();
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [7 /*endfinally*/];
                case 10: return [4 /*yield*/, tslib_1.__await(results)];
                case 11: return [2 /*return*/, _e.sent()];
            }
        });
    });
}
exports.default = combineIterators;
function getNext(asyncIterator, index) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, asyncIterator.next().then(function (_a) {
                    var done = _a.done, value = _a.value;
                    return ({
                        index: index,
                        done: done,
                        value: value,
                    });
                })];
        });
    });
}
//# sourceMappingURL=combineIterators.js.map