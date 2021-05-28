"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var defer_1 = tslib_1.__importDefault(require("./defer"));
var Cancelled = Symbol('cancelled');
/**
 * @deprecated Use @johngw/async-iterator
 */
var EventIterator = /** @class */ (function () {
    function EventIterator(setup) {
        var _this = this;
        this.events = [];
        this.push = function (event) {
            _this.events.push(event);
            _this.pull();
            var _a = defer_1.default(), promise = _a.promise, resolve = _a.resolve;
            _this.next = promise;
            _this.pull = resolve;
        };
        var _a = defer_1.default(), next = _a.promise, pull = _a.resolve;
        this.next = next;
        this.pull = pull;
        var _b = defer_1.default(), cancelled = _b.promise, cancel = _b.resolve;
        this.cancelled = cancelled.then(function () { return Cancelled; });
        this.cancel = cancel;
        this.teardown = setup(this.push);
    }
    EventIterator.prototype[Symbol.asyncIterator] = function () {
        var _this = this;
        var next = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.events.length) {
                            return [2 /*return*/, { done: false, value: this.events.shift() }];
                        }
                        return [4 /*yield*/, Promise.race([this.next, this.cancelled])];
                    case 1:
                        if ((_a.sent()) === Cancelled) {
                            this.teardown();
                            return [2 /*return*/, { done: true, value: undefined }];
                        }
                        return [2 /*return*/, { done: false, value: this.events.shift() }];
                }
            });
        }); };
        return {
            next: next,
        };
    };
    return EventIterator;
}());
exports.default = EventIterator;
//# sourceMappingURL=EventIterator.js.map