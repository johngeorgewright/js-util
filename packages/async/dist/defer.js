"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defer() {
    var reject;
    var resolve;
    var resolved = false;
    return {
        promise: new Promise(function ($resolve, $reject) {
            reject = $reject;
            resolve = $resolve;
        }),
        reject: function (reason) {
            if (!resolved) {
                resolved = true;
                reject(reason);
            }
        },
        resolve: function (value) {
            if (!resolved) {
                resolved = true;
                resolve(value);
            }
        },
    };
}
exports.default = defer;
//# sourceMappingURL=defer.js.map