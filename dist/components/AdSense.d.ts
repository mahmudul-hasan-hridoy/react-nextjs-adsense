import React from "react";
import { EnhancedAdsenseProps } from "../types";
/**
 * Enhanced AdSense component with Islamic guidelines for blocking haram content
 *
 * This component extends the standard AdSense implementation with powerful
 * content filtering capabilities to ensure ads comply with Islamic principles.
 *
 * @param props EnhancedAdsenseProps - Standard AdSense props plus filtering options
 * @returns JSX.Element - The AdSense component
 */
export declare function Adsense({ className, style, client, slot, layout, layoutKey, format, responsive, pageLevelAds, adTest, children, blockCategories, useIslamicGuidelines, ...rest }: EnhancedAdsenseProps): React.JSX.Element;
export default Adsense;
