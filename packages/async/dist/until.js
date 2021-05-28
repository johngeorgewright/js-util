"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var timeout_1 = tslib_1.__importDefault(require("./timeout"));
function until(fn, interval) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var success, wait;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    success = false;
                    wait = typeof interval === 'undefined' ? function () { } : function () { return timeout_1.default(interval); };
                    _a.label = 1;
                case 1: return [4 /*yield*/, fn()];
                case 2:
                    success = _a.sent();
                    return [4 /*yield*/, wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!success) return [3 /*break*/, 1];
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = until;
//# sourceMappingURL=until.js.map