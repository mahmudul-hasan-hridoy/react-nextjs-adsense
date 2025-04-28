"use client";
import React, { useEffect, useRef, useState } from "react";
import { 
  AdsenseProps, 
  EnhancedAdsenseProps, 
  HARAM_AD_CATEGORIES, 
  WindowWithAds 
} from "../types";

/**
 * Enhanced AdSense component with Islamic guidelines for blocking haram content
 * 
 * This component extends the standard AdSense implementation with powerful
 * content filtering capabilities to ensure ads comply with Islamic principles.
 * 
 * @param props EnhancedAdsenseProps - Standard AdSense props plus filtering options
 * @returns JSX.Element - The AdSense component
 */
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
  // Islamic guideline props
  blockCategories = [],
  useIslamicGuidelines = true,
  ...rest
}: EnhancedAdsenseProps) {
  // Reference to the ins element
  const insRef = useRef<HTMLModElement>(null);
  // Track if the ad has been loaded
  const [adLoaded, setAdLoaded] = useState(false);
  // Track initialization attempts to prevent multiple initializations
  const initAttemptedRef = useRef(false);

  // Combine default haram categories with user-defined ones if Islamic guidelines are enabled
  const categoriesToBlock = useIslamicGuidelines 
    ? [...HARAM_AD_CATEGORIES, ...blockCategories]
    : blockCategories;

  useEffect(() => {
    // Skip if already initialized or no ref available
    if (initAttemptedRef.current || !insRef.current || adLoaded) return;

    const currentIns = insRef.current;
    initAttemptedRef.current = true;

    // Initialize AdSense only if we're in the browser
    if (typeof window === 'undefined') return;

    // Base AdSense configuration
    const p: Record<string, any> = {};
    if (pageLevelAds) {
      p.google_ad_client = client;
      p.enable_page_level_ads = true;
    }

    try {
      const win = window as unknown as WindowWithAds;

      // Apply content filtering before pushing the ad
      if (win.googletag && win.googletag.cmd) {
        // Safely access googletag with checks for undefined
        const googletag = win.googletag;
        googletag.cmd.push(() => {
          // Apply category exclusions if available
          if (categoriesToBlock.length > 0) {
            const pubads = googletag.pubads();
            // Set privacy settings for restricted data processing
            pubads.setPrivacySettings({
              "restrictedDataProcessing": true,
            });
            // Apply each category exclusion
            categoriesToBlock.forEach(category => {
              pubads.setCategoryExclusion(category);
            });
            // Request non-personalized ads to further restrict content
            pubads.setRequestNonPersonalizedAds(1);
          }
        });
      }

      // Set up personalization preferences to restrict inappropriate ads
      // Use a safer approach to window.adsbygoogle
      const adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle = adsbygoogle;

      if (categoriesToBlock.length > 0) {
        // Opt out of personalized ads which could include haram content
        (window as any).adsbygoogle.requestNonPersonalizedAds = 1;
      }

      // Only push once to prevent multiple initializations
      if (!adLoaded) {
        // Create a new ad slot
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (error) {
      
      initAttemptedRef.current = false; // Reset on error to allow retrying
    }

    // Cleanup function that preserves the ad when component rerenders
    return () => {
      // We intentionally don't clear the ad HTML to prevent flashing
      // Only clean up if the component is truly unmounting (checking parent)
      if (currentIns && !currentIns.parentElement) {
        initAttemptedRef.current = false;
        setAdLoaded(false);
      }
    };
  }, [client, slot]); // Only re-run if client or slot changes, not on every state change

  // Render the AdSense ins element
  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={useIslamicGuidelines ? "on" : adTest}
      data-npa-on-unknown-ad={useIslamicGuidelines ? "true" : "false"}
      data-ad-channel="islamic_guidelines_compliant"
      {...rest}
    >
      {children}
    </ins>
  );
}

export default Adsense;