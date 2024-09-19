// src/components/AdSense.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { AdSenseProps } from "../types";

const AdSense: React.FC<AdSenseProps> = ({
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
}) => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load AdSense script if not loaded already
    if (!scriptLoaded.current) {
      const adsScript = document.createElement("script");
      adsScript.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      adsScript.async = true;
      adsScript.crossOrigin = "anonymous";
      document.head.appendChild(adsScript);

      adsScript.onload = () => {
        scriptLoaded.current = true;
        initializeAds();
      };
    } else {
      initializeAds();
    }

    // Initialize Google AdSense
    function initializeAds() {
      try {
        if (typeof window === "object") {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({
            google_ad_client: client,
            enable_page_level_ads: pageLevelAds,
          });
        }
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }
  }, [client, slot, pageLevelAds]);

  return (
    <ins
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
};

export default AdSense;
