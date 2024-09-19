"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdSense = void 0;
// src/hooks/useAdSense.ts
var react_1 = require("react");
var AdSenseContext_1 = require("../context/AdSenseContext");
var useAdSense = function () { return (0, react_1.useContext)(AdSenseContext_1.AdSenseContext); };
exports.useAdSense = useAdSense;
