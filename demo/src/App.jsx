// src/App.tsx
import React from "react";
import { AdSenseProvider, AdSense } from "react-nextjs-adsense";

function App() {
  return (
    <AdSenseProvider client="ca-pub-6380030036040607">
      <div className="App">
        <h1>React NextJS AdSense Demo</h1>

        <h2>Standard Responsive Ad</h2>
        <AdSense slot="8412192778" />

        <h2>In-Article Ad</h2>
        <AdSense slot="8412192778" format="fluid" layout="in-article" />

        <h2>In-Feed Ad</h2>
        <AdSense
          slot="8412192778"
          format="fluid"
          layout="in-feed"
          layoutKey="-fb+5w+4e-db+86"
        />
      </div>
    </AdSenseProvider>
  );
}

export default App;
