import React from "react";
interface AdsenseProps {
    className?: string;
    style?: React.CSSProperties;
    client: string;
    slot: string;
    layout?: string;
    layoutKey?: string;
    format?: string;
    responsive?: string;
    pageLevelAds?: boolean;
    adTest?: string;
    children?: React.ReactNode;
}
export declare function Adsense({ className, style, client, slot, layout, layoutKey, format, responsive, pageLevelAds, adTest, children, ...rest }: AdsenseProps): React.JSX.Element;
export default Adsense;
