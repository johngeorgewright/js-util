"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var async_1 = require("@johngw/async");
var Cancelled = Symbol('cancelled');
var EventIterator = /** @class */ (function () {
    function EventIterator(setup) {
        var _this = this;
        this.events = [];
        this.push = function (event) {
            _this.events.push(event);
            _this.publishArrival();
            _this.setupNextArrival();
        };
        this.next = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.events.length) {
                            return [2 /*return*/, { done: false, value: this.events.shift() }];
                        }
                        return [4 /*yield*/, Promise.race([this.untilArrival, this.cancelled])];
                    case 1:
                        if ((_a.sent()) === Cancelled) {
                            this.teardown();
                            return [2 /*return*/, { done: true, value: undefined }];
                        }
                        return [2 /*return*/, this.next()];
                }
            });
        }); };
        var _a = async_1.defer(), cancelled = _a.promise, cancel = _a.resolve;
        this.cancelled = cancelled.then(function () { return Cancelled; });
        this.cancel = cancel;
        this.setupNextArrival();
        this.teardown = setup(this.push);
    }
    EventIterator.prototype.setupNextArrival = function () {
        var _a = async_1.defer(), untilArrival = _a.promise, publishArrival = _a.resolve;
        this.untilArrival = untilArrival;
        this.publishArrival = publishArrival;
    };
    EventIterator.prototype[Symbol.asyncIterator] = function () {
        return {
            next: this.next,
        };
    };
    return EventIterator;
}());
exports.default = EventIterator;
//# sourceMappingURL=EventIterator.js.map