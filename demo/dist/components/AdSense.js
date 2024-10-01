"use strict";
// src/components/AdSense.tsx
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adsense = void 0;
var react_1 = __importStar(require("react"));
function Adsense(_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? { display: "block" } : _c, client = _a.client, slot = _a.slot, _d = _a.layout, layout = _d === void 0 ? "" : _d, _e = _a.layoutKey, layoutKey = _e === void 0 ? "" : _e, _f = _a.format, format = _f === void 0 ? "auto" : _f, _g = _a.responsive, responsive = _g === void 0 ? "false" : _g, _h = _a.pageLevelAds, pageLevelAds = _h === void 0 ? false : _h, adTest = _a.adTest, children = _a.children, rest = __rest(_a, ["className", "style", "client", "slot", "layout", "layoutKey", "format", "responsive", "pageLevelAds", "adTest", "children"]);
    var insRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var currentIns = insRef.current;
        if (!currentIns)
            return;
        var p = {};
        if (pageLevelAds) {
            p.google_ad_client = client;
            p.enable_page_level_ads = true;
        }
        try {
            if (typeof window === 'object') {
                (window.adsbygoogle = window.adsbygoogle || []).push(p);
            }
        }
        catch (_a) {
            // Pass
        }
        return function () {
            if (currentIns.firstChild) {
                currentIns.innerHTML = "";
            }
        };
    }, [client, slot, pageLevelAds]);
    return (react_1.default.createElement("ins", __assign({ ref: insRef, className: "adsbygoogle ".concat(className), style: style, "data-ad-client": client, "data-ad-slot": slot, "data-ad-layout": layout, "data-ad-layout-key": layoutKey, "data-ad-format": format, "data-full-width-responsive": responsive, "data-adtest": adTest }, rest), children));
}
exports.Adsense = Adsense;
exports.default = Adsense;
