// src/types.ts

import { HTMLAttributes } from "react";

/**
 * Base AdSense component props interface
 * Original properties for the AdSense component
 */
export interface AdsenseProps extends HTMLAttributes<HTMLModElement> {
  /** Additional CSS class name */
  className?: string;

  /** Custom style object */
  style?: React.CSSProperties;

  /** Google AdSense publisher ID (required) */
  client: string;

  /** AdSense ad unit ID (required) */
  slot: string;

  /** Ad layout format (optional) */
  layout?: string;

  /** Layout key for customized ads (optional) */
  layoutKey?: string;

  /** Ad format specification (default: "auto") */
  format?: string;

  /** Whether the ad is responsive (default: "false") */
  responsive?: string;

  /** Enable page-level ads (default: false) */
  pageLevelAds?: boolean;

  /** Ad test mode parameter (optional) */
  adTest?: string;
}

/**
 * Enhanced AdSense props with Islamic content filtering capabilities
 * Extends the base AdSense props with additional properties for haram content blocking
 */
export interface EnhancedAdsenseProps extends AdsenseProps {
  /** 
   * List of specific ad categories to block
   * These will be added to the default haram categories if useIslamicGuidelines is true
   */
  blockCategories?: string[];

  /**
   * Whether to use predefined Islamic guidelines to block haram content
   * When true, automatically blocks all categories defined in DEFAULT_HARAM_CATEGORIES
   * Default: true
   */
  useIslamicGuidelines?: boolean;
}

/**
 * Google Tag Manager window extensions
 * Used for TypeScript type safety when working with Google's ad APIs
 */
export interface GoogleTagManager {
  cmd: any[];
  pubads: () => {
    setCategoryExclusion: (category: string) => void;
    setPrivacySettings: (settings: {restrictedDataProcessing?: boolean}) => void;
    setRequestNonPersonalizedAds: (value: number) => void;
  };
}

/**
 * Google AdSense window extensions
 */
export interface GoogleAdSense {
  adsbygoogle: any[];
  requestNonPersonalizedAds?: number;
}

/**
 * Window interface extensions for Google ad services
 */
export interface WindowWithAds extends Window {
  googletag?: {
    cmd: any[];
    pubads: () => {
      setCategoryExclusion: (category: string) => void;
      setPrivacySettings: (settings: {restrictedDataProcessing?: boolean}) => void;
      setRequestNonPersonalizedAds: (value: number) => void;
    };
  };
  adsbygoogle?: any[];
}

/**
 * Default haram categories according to Islamic guidelines
 * These categories are considered inappropriate under Islamic law
 */
export const HARAM_AD_CATEGORIES = [
  // Original categories
  "dating",              // Dating
  "gambling",            // Gambling & betting
  "alcohol",             // Alcohol-related content
  "cigars",              // Tobacco products
  "drug_related",        // Drugs and prohibited substances
  "adult",               // Adult content
  "provocative",         // Suggestive content
  "religion_related",    // Content that could misrepresent Islamic beliefs
  "politics",            // Political content that may be divisive
  "interest_based",      // Interest-based ads which may include haram content

  // Additional categories identified as haram
  "birth_control",       // Birth control products and services
  "astrology",           // Astrology and esoteric content
  "esoteric",            // Esoteric practices
  "cosmetic_procedures", // Cosmetic procedures
  "body_modification",   // Body modification
  "consumer_loans",      // Consumer loans and interest-based financial products (riba)
  "downloadable_utilities", // Downloadable utilities (often contain malware/deception)
  "supplements",         // Supplements that may contain haram ingredients
  "get_rich_quick",      // Get rich quick schemes
  "sex_related",         // References to sex
  "sensationalism",      // Sensationalist content
  "reproductive_health", // Sexual and reproductive health
  "skin_exposure",       // Significant skin exposure
  "social_casino",       // Social casino games
  "video_games",         // Video games (casual & online)
  "weight_loss",         // Weight loss products that may use haram methods/ingredients

  // General catch-all categories
  "questionable",        // Content with questionable moral standing
  "suggestive",          // Suggestive content that may not be explicitly adult
  "speculative",         // Speculative financial products that may involve gharar
  "non_family_safe",     // Non-family safe content
] as const;

/**
 * Haram category type for type safety when referring to specific categories
 */
export type HaramCategory = typeof HARAM_AD_CATEGORIES[number];