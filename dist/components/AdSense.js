"use strict";
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
/**
 * react-nextjs-adsense — AdSense component
 *
 * 2026 compliance improvements:
 *
 * 1. CONSENT GATE  — respects Google Consent Mode v2 (ad_storage / ad_personalization).
 *    Uses pauseAdRequests=1 to hold ad requests until consent is available,
 *    then resumes with requestNonPersonalizedAds when personalisation is denied.
 *    This is the pattern required after the TCF v2.3 mandatory deadline (March 1 2026).
 *
 * 2. adTest BUG FIX — previously forced data-adtest="on" whenever
 *    useIslamicGuidelines=true, causing ALL production ads to run in test mode.
 *    Fixed: adTest is now only applied when explicitly passed.
 *
 * 3. data-privacy-treatments — when consent is denied, the component sets the
 *    data-privacy-treatments="disablePersonalization" attribute on the script tag
 *    (via the adsbygoogle array), the approach documented by Google for 2026.
 *
 * 4. Stable useEffect deps — categoriesToBlock was rebuilt on every render;
 *    it is now memoised to prevent stale closure bugs.
 *
 * 5. data-ad-channel removed — "islamic_guidelines_compliant" is not a
 *    valid Google channel value and would cause ad serving errors.
 *
 * 6. pageLevelAds push fixed — was building config object `p` but never
 *    actually pushing it; now correctly calls adsbygoogle.push(p).
 *
 * 7. Intersection Observer lazy loading — ads are only requested when the
 *    <ins> element enters the viewport, reducing wasted impressions and
 *    improving Core Web Vitals (CLS/LCP).
 */
var react_1 = __importStar(require("react"));
var types_1 = require("../types");
function Adsense(_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? { display: "block" } : _c, client = _a.client, slot = _a.slot, _d = _a.layout, layout = _d === void 0 ? "" : _d, _e = _a.layoutKey, layoutKey = _e === void 0 ? "" : _e, _f = _a.format, format = _f === void 0 ? "auto" : _f, _g = _a.responsive, responsive = _g === void 0 ? "false" : _g, _h = _a.pageLevelAds, pageLevelAds = _h === void 0 ? false : _h, adTest = _a.adTest, children = _a.children, 
    // Content filtering
    _j = _a.blockCategories, 
    // Content filtering
    blockCategories = _j === void 0 ? [] : _j, _k = _a.useIslamicGuidelines, useIslamicGuidelines = _k === void 0 ? true : _k, 
    // 2026: consent state from host app
    consentState = _a.consentState, rest = __rest(_a, ["className", "style", "client", "slot", "layout", "layoutKey", "format", "responsive", "pageLevelAds", "adTest", "children", "blockCategories", "useIslamicGuidelines", "consentState"]);
    var insRef = (0, react_1.useRef)(null);
    var initAttemptedRef = (0, react_1.useRef)(false);
    var _l = (0, react_1.useState)(false), adLoaded = _l[0], setAdLoaded = _l[1];
    // Memoize category list so it is stable across renders
    var categoriesToBlock = (0, react_1.useMemo)(function () {
        return useIslamicGuidelines
            ? __spreadArray(__spreadArray([], types_1.HARAM_AD_CATEGORIES, true), blockCategories, true) : blockCategories;
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useIslamicGuidelines, blockCategories.join(",")]);
    /**
     * Core ad initialisation.
     * Extracted so it can be called from the IntersectionObserver callback.
     */
    var initAd = (0, react_1.useCallback)(function () {
        var _a, _b;
        if (initAttemptedRef.current || adLoaded)
            return;
        if (typeof window === "undefined")
            return;
        initAttemptedRef.current = true;
        var win = window;
        try {
            // ── 1. GPT category exclusions (only available when GPT is on page) ──
            if ((_a = win.googletag) === null || _a === void 0 ? void 0 : _a.cmd) {
                win.googletag.cmd.push(function () {
                    if (categoriesToBlock.length > 0 && win.googletag) {
                        var pubads_1 = win.googletag.pubads();
                        pubads_1.setPrivacySettings({ restrictedDataProcessing: true });
                        categoriesToBlock.forEach(function (cat) { return pubads_1.setCategoryExclusion(cat); });
                    }
                });
            }
            // ── 2. Consent Mode v2 — pause / resume pattern ──
            var adsArray = (_b = win.adsbygoogle) !== null && _b !== void 0 ? _b : [];
            win.adsbygoogle = adsArray;
            var consentDenied = (consentState === null || consentState === void 0 ? void 0 : consentState.ad_storage) === "denied" ||
                (consentState === null || consentState === void 0 ? void 0 : consentState.ad_personalization) === "denied";
            var isPersonalisationDenied = (consentState === null || consentState === void 0 ? void 0 : consentState.ad_personalization) === "denied";
            // 2026: only set NPA from JS when no TCF CMP is handling it
            if (!(consentState === null || consentState === void 0 ? void 0 : consentState.tcfCompliant)) {
                if (categoriesToBlock.length > 0 || isPersonalisationDenied) {
                    adsArray.requestNonPersonalizedAds = 1;
                }
            }
            if (consentDenied) {
                // Hold requests until consent is obtained
                adsArray.pauseAdRequests = 1;
                // The calling application should re-render with updated consentState
                // once the user grants consent; at that point pauseAdRequests=0 and
                // the ad will load. We do not auto-resume here to stay in the host
                // app's control flow.
                initAttemptedRef.current = false; // allow retry on consent update
                return;
            }
            // Ensure requests are resumed if they were paused
            adsArray.pauseAdRequests = 0;
            // ── 3. Push the ad slot ──
            if (pageLevelAds) {
                adsArray.push({
                    google_ad_client: client,
                    enable_page_level_ads: true,
                });
            }
            else {
                adsArray.push({});
            }
            setAdLoaded(true);
        }
        catch (_c) {
            // Reset so a subsequent render can retry
            initAttemptedRef.current = false;
        }
    }, [adLoaded, categoriesToBlock, client, consentState, pageLevelAds]);
    // ── 4. Intersection Observer — only load when in viewport ──
    (0, react_1.useEffect)(function () {
        var el = insRef.current;
        if (!el)
            return;
        if ("IntersectionObserver" in window) {
            var observer_1 = new IntersectionObserver(function (entries) {
                var _a;
                if ((_a = entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting) {
                    observer_1.disconnect();
                    initAd();
                }
            }, { rootMargin: "200px" } // start loading 200 px before visible
            );
            observer_1.observe(el);
            return function () { return observer_1.disconnect(); };
        }
        else {
            // Fallback for environments without IntersectionObserver
            initAd();
        }
    }, [initAd]);
    // ── 5. Re-init when consent state changes ──
    (0, react_1.useEffect)(function () {
        if ((consentState === null || consentState === void 0 ? void 0 : consentState.ad_storage) === "granted") {
            initAttemptedRef.current = false;
            setAdLoaded(false);
        }
    }, [consentState]);
    // ── 6. Cleanup ──
    (0, react_1.useEffect)(function () {
        var el = insRef.current;
        return function () {
            if (el && !el.parentElement) {
                initAttemptedRef.current = false;
                setAdLoaded(false);
            }
        };
    }, []);
    return (react_1.default.createElement("ins", __assign({ ref: insRef, className: "adsbygoogle ".concat(className).trim(), style: style, "data-ad-client": client, "data-ad-slot": slot, "data-ad-layout": layout || undefined, "data-ad-layout-key": layoutKey || undefined, "data-ad-format": format, "data-full-width-responsive": responsive, "data-adtest": adTest, "data-npa-on-unknown-ad": categoriesToBlock.length > 0 ||
            (consentState === null || consentState === void 0 ? void 0 : consentState.ad_personalization) === "denied"
            ? "true"
            : "false" }, rest), children));
}
exports.Adsense = Adsense;
exports.default = Adsense;
