"use strict";
// src/context/AdSenseContext.tsx
"use cliemt";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdSenseProvider = exports.AdSenseContext = void 0;
var react_1 = __importStar(require("react"));
exports.AdSenseContext = (0, react_1.createContext)({
    client: "",
    isEnabled: false,
    isLoaded: false,
    error: null,
});
var AdSenseProvider = function (_a) {
    var client = _a.client, children = _a.children;
    var _b = (0, react_1.useState)(false), isLoaded = _b[0], setIsLoaded = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(true), isEnabled = _d[0], setIsEnabled = _d[1];
    (0, react_1.useEffect)(function () {
        if (typeof window === "undefined")
            return;
        var script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=".concat(client);
        script.async = true;
        script.onload = function () { return setIsLoaded(true); };
        script.onerror = function () { return setError("Failed to load AdSense script"); };
        document.head.appendChild(script);
        return function () {
            document.head.removeChild(script);
        };
    }, [client]);
    return (react_1.default.createElement(exports.AdSenseContext.Provider, { value: { client: client, isEnabled: isEnabled, isLoaded: isLoaded, error: error } }, children));
};
exports.AdSenseProvider = AdSenseProvider;
