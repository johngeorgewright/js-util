"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TimeoutError = /** @class */ (function (_super) {
    tslib_1.__extends(TimeoutError, _super);
    function TimeoutError(ms) {
        return _super.call(this, "Exceeded " + ms + "ms") || this;
    }
    return TimeoutError;
}(Error));
exports.default = TimeoutError;
//# sourceMappingURL=TimeoutError.js.map