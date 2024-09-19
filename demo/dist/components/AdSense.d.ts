import React from 'react';
interface Props {
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
export default function AdSense({ className, style, client, slot, layout, layoutKey, format, responsive, pageLevelAds, adTest, children, ...rest }: Props): React.JSX.Element;
export {};
