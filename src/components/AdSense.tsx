// src/components/AdSense.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { AdsenseProps } from "../types";

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
  ...rest
}: AdsenseProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const currentIns = insRef.current;
    if (!currentIns) return;

    const p: Record<string, any> = {};
    if (pageLevelAds) {
      p.google_ad_client = client;
      p.enable_page_level_ads = true;
    }

    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          p,
        );
      }
    } catch (error) {
      console.error("Adsense error:", error);
    }

    return () => {
      if (currentIns.firstChild) {
        currentIns.innerHTML = "";
      }
    };
  }, [client, slot, pageLevelAds]);

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
      data-adtest={adTest}
      {...rest}
    >
      {children}
    </ins>
  );
}

export default Adsense;
