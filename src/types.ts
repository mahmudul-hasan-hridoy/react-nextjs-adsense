// src/types.ts
// Updated for 2026 Google AdSense compliance:
// - IAB TCF v2.3 mandatory (March 1, 2026)
// - Google Consent Mode v2 support
// - pauseAdRequests pattern for consent-gate loading
// - data-privacy-treatments API support
// - Authorized Buyers (replaces Ad Networks blocking)
// - adTest bug fix (was always forced "on" when useIslamicGuidelines=true)

import { HTMLAttributes } from "react";

/**
 * Consent mode status passed in by the parent app.
 * Mirrors Google Consent Mode v2 signal names.
 */
export interface ConsentState {
  /** Whether user has consented to ad storage / cookies */
  ad_storage: "granted" | "denied";
  /** Whether user has consented to ad personalisation */
  ad_personalization: "granted" | "denied";
  /**
   * Whether a TCF v2.3 CMP string is present on the page.
   * When true the component defers to the CMP and does not
   * forcibly set requestNonPersonalizedAds=1 itself.
   */
  tcfCompliant?: boolean;
}

/**
 * Base AdSense component props interface.
 * Matches the official <ins> data attributes Google documents as of 2026.
 */
export interface AdsenseProps extends HTMLAttributes<HTMLModElement> {
  /** Additional CSS class name */
  className?: string;

  /** Custom style object */
  style?: React.CSSProperties;

  /** Google AdSense publisher ID (required) — format: 'ca-pub-XXXXXXXXXXXXXXXX' */
  client: string;

  /** AdSense ad unit ID (required) */
  slot: string;

  /** Ad layout format (optional) */
  layout?: string;

  /** Layout key for customised ads (optional) */
  layoutKey?: string;

  /** Ad format specification (default: "auto") */
  format?: string;

  /** Whether the ad is responsive (default: "false") */
  responsive?: string;

  /** Enable page-level / Auto ads (default: false) */
  pageLevelAds?: boolean;

  /**
   * Ad test mode parameter.
   * NOTE: set to "on" only in development — never hard-code in production.
   * Previously this was accidentally always forced "on" when
   * useIslamicGuidelines=true; that bug is fixed in this version.
   */
  adTest?: string;

  /**
   * 2026: Consent state passed by the host application.
   * Required for correct behaviour in EEA / UK / Switzerland.
   * When ad_storage is "denied" the component pauses ad requests
   * (via pauseAdRequests) until consent is granted or falls back
   * to non-personalised ads.
   */
  consentState?: ConsentState;
}

/**
 * Enhanced AdSense props with content filtering.
 * Extends base props with category blocking (Islamic guidelines).
 */
export interface EnhancedAdsenseProps extends AdsenseProps {
  /**
   * Additional ad categories to block beyond the defaults.
   * These are passed as setCategoryExclusion() calls via GPT pubads().
   */
  blockCategories?: string[];

  /**
   * Enable predefined Islamic-guidelines category blocklist.
   * Default: true
   */
  useIslamicGuidelines?: boolean;
}

/**
 * Google Publisher Tag (GPT) minimal interface.
 * Used only for setCategoryExclusion and privacy calls.
 */
export interface GoogleTagManager {
  cmd: Array<() => void>;
  pubads: () => {
    setCategoryExclusion: (category: string) => void;
    setPrivacySettings: (settings: { restrictedDataProcessing?: boolean }) => void;
    setRequestNonPersonalizedAds: (value: 0 | 1) => void;
    enableLazyLoad?: (config?: object) => void;
  };
}

/**
 * Window extensions for Google ad services.
 */
export interface WindowWithAds extends Window {
  googletag?: GoogleTagManager;
  adsbygoogle?: AdsByGoogle;
  /** Google Consent Mode v2 dataLayer push function */
  gtag?: (...args: unknown[]) => void;
}

/**
 * adsbygoogle array with 2026 documented properties.
 */
export interface AdsByGoogle extends Array<object> {
  /** 1 = non-personalised; 0 = personalised (default) */
  requestNonPersonalizedAds?: 0 | 1;
  /**
   * 2026: Pause all ad requests until explicitly resumed.
   * Use before consent is obtained; set to 0 to resume.
   */
  pauseAdRequests?: 0 | 1;
}

/**
 * Ad categories blocked by Islamic-content guidelines.
 * Categories follow Google's documented sensitive category labels.
 */
export const HARAM_AD_CATEGORIES = [
  // Explicit haram content
  "dating",
  "gambling",
  "alcohol",
  "cigars",
  "drug_related",
  "adult",
  "provocative",
  "sex_related",
  "reproductive_health",
  "skin_exposure",
  "non_family_safe",
  "suggestive",

  // Financial (riba / gharar)
  "consumer_loans",
  "interest_based",
  "get_rich_quick",
  "speculative",

  // Esoteric / superstition
  "astrology",
  "esoteric",

  // Content quality / deception
  "downloadable_utilities",
  "sensationalism",
  "questionable",

  // Religious / political sensitivity
  "religion_related",
  "politics",

  // Social casino & gaming
  "social_casino",
  "video_games",

  // Other
  "birth_control",
  "cosmetic_procedures",
  "body_modification",
  "supplements",
  "weight_loss",
] as const;

export type HaramCategory = (typeof HARAM_AD_CATEGORIES)[number];
