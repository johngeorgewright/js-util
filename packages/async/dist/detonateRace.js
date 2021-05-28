"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TimeoutError_1 = tslib_1.__importDefault(require("./TimeoutError"));
var detonate_1 = tslib_1.__importDefault(require("./detonate"));
function detonateRace(promise, ms, error) {
    if (ms === void 0) { ms = 0; }
    if (error === void 0) { error = new TimeoutError_1.default(ms); }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, Promise.race([promise, detonate_1.default(ms, error)])];
        });
    });
}
exports.default = detonateRace;
//# sourceMappingURL=detonateRace.js.map