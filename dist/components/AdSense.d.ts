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
import React from "react";
import { EnhancedAdsenseProps } from "../types";
export declare function Adsense({ className, style, client, slot, layout, layoutKey, format, responsive, pageLevelAds, adTest, children, blockCategories, useIslamicGuidelines, consentState, ...rest }: EnhancedAdsenseProps): React.JSX.Element;
export default Adsense;
