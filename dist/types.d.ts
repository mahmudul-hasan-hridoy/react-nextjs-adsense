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
        setPrivacySettings: (settings: {
            restrictedDataProcessing?: boolean;
        }) => void;
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
            setPrivacySettings: (settings: {
                restrictedDataProcessing?: boolean;
            }) => void;
            setRequestNonPersonalizedAds: (value: number) => void;
        };
    };
    adsbygoogle?: any[];
}
/**
 * Default haram categories according to Islamic guidelines
 * These categories are considered inappropriate under Islamic law
 */
export declare const HARAM_AD_CATEGORIES: readonly ["dating", "gambling", "alcohol", "cigars", "drug_related", "adult", "provocative", "religion_related", "politics", "interest_based", "birth_control", "astrology", "esoteric", "cosmetic_procedures", "body_modification", "consumer_loans", "downloadable_utilities", "supplements", "get_rich_quick", "sex_related", "sensationalism", "reproductive_health", "skin_exposure", "social_casino", "video_games", "weight_loss", "questionable", "suggestive", "speculative", "non_family_safe"];
/**
 * Haram category type for type safety when referring to specific categories
 */
export type HaramCategory = typeof HARAM_AD_CATEGORIES[number];
