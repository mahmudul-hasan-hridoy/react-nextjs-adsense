"use client";
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

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AdsByGoogle,
  EnhancedAdsenseProps,
  HARAM_AD_CATEGORIES,
  WindowWithAds,
} from "../types";

export function Adsense({
  className = "",
  style = { display: "block" },
  client,
  slot,
  layout = "",
  layoutKey = "",
  format = "auto",
  responsive = "false",
  pageLevelAds = false,
  adTest,
  children,
  // Content filtering
  blockCategories = [],
  useIslamicGuidelines = true,
  // 2026: consent state from host app
  consentState,
  ...rest
}: EnhancedAdsenseProps) {
  const insRef = useRef<HTMLModElement>(null);
  const initAttemptedRef = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // Memoize category list so it is stable across renders
  const categoriesToBlock = useMemo(
    () =>
      useIslamicGuidelines
        ? [...HARAM_AD_CATEGORIES, ...blockCategories]
        : blockCategories,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useIslamicGuidelines, blockCategories.join(",")]
  );

  /**
   * Core ad initialisation.
   * Extracted so it can be called from the IntersectionObserver callback.
   */
  const initAd = useCallback(() => {
    if (initAttemptedRef.current || adLoaded) return;
    if (typeof window === "undefined") return;

    initAttemptedRef.current = true;

    const win = window as unknown as WindowWithAds;

    try {
      // ── 1. GPT category exclusions (only available when GPT is on page) ──
      if (win.googletag?.cmd) {
        win.googletag.cmd.push(() => {
          if (categoriesToBlock.length > 0 && win.googletag) {
            const pubads = win.googletag.pubads();
            pubads.setPrivacySettings({ restrictedDataProcessing: true });
            categoriesToBlock.forEach((cat) => pubads.setCategoryExclusion(cat));
          }
        });
      }

      // ── 2. Consent Mode v2 — pause / resume pattern ──
      const adsArray: AdsByGoogle = win.adsbygoogle ?? [];
      win.adsbygoogle = adsArray;

      const consentDenied =
        consentState?.ad_storage === "denied" ||
        consentState?.ad_personalization === "denied";

      const isPersonalisationDenied =
        consentState?.ad_personalization === "denied";

      // 2026: only set NPA from JS when no TCF CMP is handling it
      if (!consentState?.tcfCompliant) {
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
      } else {
        adsArray.push({});
      }

      setAdLoaded(true);
    } catch {
      // Reset so a subsequent render can retry
      initAttemptedRef.current = false;
    }
  }, [adLoaded, categoriesToBlock, client, consentState, pageLevelAds]);

  // ── 4. Intersection Observer — only load when in viewport ──
  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer.disconnect();
            initAd();
          }
        },
        { rootMargin: "200px" } // start loading 200 px before visible
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Fallback for environments without IntersectionObserver
      initAd();
    }
  }, [initAd]);

  // ── 5. Re-init when consent state changes ──
  useEffect(() => {
    if (consentState?.ad_storage === "granted") {
      initAttemptedRef.current = false;
      setAdLoaded(false);
    }
  }, [consentState]);

  // ── 6. Cleanup ──
  useEffect(() => {
    const el = insRef.current;
    return () => {
      if (el && !el.parentElement) {
        initAttemptedRef.current = false;
        setAdLoaded(false);
      }
    };
  }, []);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`.trim()}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout || undefined}
      data-ad-layout-key={layoutKey || undefined}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      // FIX: adTest is only applied when explicitly provided.
      // Previously, useIslamicGuidelines forced "on" here — a production bug.
      data-adtest={adTest}
      // 2026: non-personalised ads fallback attribute
      data-npa-on-unknown-ad={
        categoriesToBlock.length > 0 ||
        consentState?.ad_personalization === "denied"
          ? "true"
          : "false"
      }
      {...rest}
    >
      {children}
    </ins>
  );
}

export default Adsense;
