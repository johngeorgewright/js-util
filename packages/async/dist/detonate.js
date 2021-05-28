"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TimeoutError_1 = tslib_1.__importDefault(require("./TimeoutError"));
function detonate(ms, error) {
    if (ms === void 0) { ms = 0; }
    if (error === void 0) { error = new TimeoutError_1.default(ms); }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (_, reject) {
                    setTimeout(function () { return reject(error); }, ms);
                })];
        });
    });
}
exports.default = detonate;
//# sourceMappingURL=detonate.js.map