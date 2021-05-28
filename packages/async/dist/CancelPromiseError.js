"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CancelPromiseError = /** @class */ (function (_super) {
    tslib_1.__extends(CancelPromiseError, _super);
    function CancelPromiseError(promise) {
        var _this = _super.call(this, 'Promise was cancelled') || this;
        _this.promise = promise;
        return _this;
    }
    return CancelPromiseError;
}(Error));
exports.default = CancelPromiseError;
//# sourceMappingURL=CancelPromiseError.js.map