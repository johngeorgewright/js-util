"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CancelPromiseError_1 = tslib_1.__importDefault(require("./CancelPromiseError"));
function cancelablePromise(executor) {
    var cancel;
    var promise = new Promise(function (resolve, reject) {
        cancel = function () { return reject(new CancelPromiseError_1.default(promise)); };
        executor(resolve, reject);
    });
    return Object.assign(promise, { cancel: cancel });
}
exports.default = cancelablePromise;
//# sourceMappingURL=cancelablePromise.js.map