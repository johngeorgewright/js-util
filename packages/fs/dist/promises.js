"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readdir = exports.readFile = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var util_1 = require("util");
exports.readFile = util_1.promisify(fs.readFile);
exports.readdir = util_1.promisify(fs.readdir);
//# sourceMappingURL=promises.js.map