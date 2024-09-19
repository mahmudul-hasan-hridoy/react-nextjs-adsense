import React from "react";
import { AdSenseContextType } from "../types";
export declare const AdSenseContext: React.Context<AdSenseContextType>;
export declare const AdSenseProvider: React.FC<{
    client: string;
    children: React.ReactNode;
}>;
