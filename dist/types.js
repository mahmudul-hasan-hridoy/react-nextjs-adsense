"use strict";
// src/types.ts
// Updated for 2026 Google AdSense compliance:
// - IAB TCF v2.3 mandatory (March 1, 2026)
// - Google Consent Mode v2 support
// - pauseAdRequests pattern for consent-gate loading
// - data-privacy-treatments API support
// - Authorized Buyers (replaces Ad Networks blocking)
// - adTest bug fix (was always forced "on" when useIslamicGuidelines=true)
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARAM_AD_CATEGORIES = void 0;
/**
 * Ad categories blocked by Islamic-content guidelines.
 * Categories follow Google's documented sensitive category labels.
 */
exports.HARAM_AD_CATEGORIES = [
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
];
