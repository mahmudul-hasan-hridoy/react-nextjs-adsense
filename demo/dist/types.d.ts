import React from 'react';
export interface AdsenseProps {
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
