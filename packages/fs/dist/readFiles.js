"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var promises_1 = require("./promises");
var pathHelper = tslib_1.__importStar(require("path"));
function readFiles(dirname, _a) {
    var _b = _a === void 0 ? {} : _a, encoding = _b.encoding, _c = _b.filter, filter = _c === void 0 ? function () { return true; } : _c, _d = _b.recursive, recursive = _d === void 0 ? true : _d;
    return tslib_1.__asyncGenerator(this, arguments, function readFiles_1() {
        var _e, _f, entry, path, e_1_1;
        var e_1, _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 11, 12, 13]);
                    return [4 /*yield*/, tslib_1.__await(promises_1.readdir(dirname, { withFileTypes: true }))];
                case 1:
                    _e = tslib_1.__values.apply(void 0, [_h.sent()]), _f = _e.next();
                    _h.label = 2;
                case 2:
                    if (!!_f.done) return [3 /*break*/, 10];
                    entry = _f.value;
                    path = pathHelper.join(dirname, entry.name);
                    if (!entry.isDirectory()) return [3 /*break*/, 6];
                    if (!recursive) return [3 /*break*/, 5];
                    return [5 /*yield**/, tslib_1.__values(tslib_1.__asyncDelegator(tslib_1.__asyncValues(readFiles(path, { encoding: encoding, filter: filter, recursive: recursive }))))];
                case 3: return [4 /*yield*/, tslib_1.__await.apply(void 0, [_h.sent()])];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5: return [3 /*break*/, 9];
                case 6:
                    if (!filter(path)) return [3 /*break*/, 9];
                    return [4 /*yield*/, tslib_1.__await(promises_1.readFile(path, { encoding: encoding }))];
                case 7: return [4 /*yield*/, _h.sent()];
                case 8:
                    _h.sent();
                    _h.label = 9;
                case 9:
                    _f = _e.next();
                    return [3 /*break*/, 2];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = readFiles;
//# sourceMappingURL=readFiles.js.map