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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adsense = void 0;
var react_1 = __importStar(require("react"));
var types_1 = require("../types");
/**
 * Enhanced AdSense component with Islamic guidelines for blocking haram content
 *
 * This component extends the standard AdSense implementation with powerful
 * content filtering capabilities to ensure ads comply with Islamic principles.
 *
 * @param props EnhancedAdsenseProps - Standard AdSense props plus filtering options
 * @returns JSX.Element - The AdSense component
 */
function Adsense(_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? { display: "block" } : _c, client = _a.client, slot = _a.slot, _d = _a.layout, layout = _d === void 0 ? "" : _d, _e = _a.layoutKey, layoutKey = _e === void 0 ? "" : _e, _f = _a.format, format = _f === void 0 ? "auto" : _f, _g = _a.responsive, responsive = _g === void 0 ? "false" : _g, _h = _a.pageLevelAds, pageLevelAds = _h === void 0 ? false : _h, adTest = _a.adTest, children = _a.children, 
    // Islamic guideline props
    _j = _a.blockCategories, 
    // Islamic guideline props
    blockCategories = _j === void 0 ? [] : _j, _k = _a.useIslamicGuidelines, useIslamicGuidelines = _k === void 0 ? true : _k, rest = __rest(_a, ["className", "style", "client", "slot", "layout", "layoutKey", "format", "responsive", "pageLevelAds", "adTest", "children", "blockCategories", "useIslamicGuidelines"]);
    // Reference to the ins element
    var insRef = (0, react_1.useRef)(null);
    // Combine default haram categories with user-defined ones if Islamic guidelines are enabled
    var categoriesToBlock = useIslamicGuidelines
        ? __spreadArray(__spreadArray([], types_1.HARAM_AD_CATEGORIES, true), blockCategories, true) : blockCategories;
    (0, react_1.useEffect)(function () {
        var currentIns = insRef.current;
        if (!currentIns)
            return;
        // Base AdSense configuration
        var p = {};
        if (pageLevelAds) {
            p.google_ad_client = client;
            p.enable_page_level_ads = true;
        }
        try {
            if (typeof window === 'object') {
                var win = window;
                // Apply content filtering before pushing the ad
                if (win.googletag && win.googletag.cmd) {
                    // Safely access googletag with checks for undefined
                    var googletag_1 = win.googletag;
                    googletag_1.cmd.push(function () {
                        // Apply category exclusions if available
                        if (categoriesToBlock.length > 0) {
                            var pubads_1 = googletag_1.pubads();
                            // Set privacy settings for restricted data processing
                            pubads_1.setPrivacySettings({
                                "restrictedDataProcessing": true,
                            });
                            // Apply each category exclusion
                            categoriesToBlock.forEach(function (category) {
                                pubads_1.setCategoryExclusion(category);
                            });
                            // Request non-personalized ads to further restrict content
                            pubads_1.setRequestNonPersonalizedAds(1);
                        }
                    });
                }
                // Set up personalization preferences to restrict inappropriate ads
                // Use a safer approach to window.adsbygoogle
                var adsbygoogle = win.adsbygoogle || [];
                win.adsbygoogle = adsbygoogle;
                if (categoriesToBlock.length > 0) {
                    // Opt out of personalized ads which could include haram content
                    // Use a type assertion to avoid TypeScript errors
                    window.adsbygoogle.requestNonPersonalizedAds = 1;
                }
                // Push the ad configuration
                adsbygoogle.push(p);
            }
        }
        catch (error) {
            console.error("Error setting up AdSense with Islamic content filtering:", error);
        }
        // Cleanup function
        return function () {
            if (currentIns.firstChild) {
                currentIns.innerHTML = "";
            }
        };
    }, [client, slot, pageLevelAds, categoriesToBlock]);
    // Render the AdSense ins element
    return (react_1.default.createElement("ins", __assign({ ref: insRef, className: "adsbygoogle ".concat(className), style: style, "data-ad-client": client, "data-ad-slot": slot, "data-ad-layout": layout, "data-ad-layout-key": layoutKey, "data-ad-format": format, "data-full-width-responsive": responsive, "data-adtest": useIslamicGuidelines ? "on" : adTest, "data-npa-on-unknown-ad": useIslamicGuidelines ? "true" : "false", "data-ad-channel": "islamic_guidelines_compliant" }, rest), children));
}
exports.Adsense = Adsense;
exports.default = Adsense;
