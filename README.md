# react-nextjs-adsense

A modern React component library for seamlessly integrating Google AdSense into your Next.js applications, with built-in ethical content filtering.

[![npm version](https://img.shields.io/npm/v/react-nextjs-adsense.svg)](https://www.npmjs.com/package/react-nextjs-adsense)
[![license](https://img.shields.io/npm/l/react-nextjs-adsense.svg)](https://github.com/mahmudul-hasan-hridoy/react-nextjs-adsense/blob/main/LICENSE)

Demo: [Click here to see the AdSense demo](https://toolhut.vercel.app/adsense-demo)

---

## Why Choose react-nextjs-adsense?

- **Effortless Integration**: Simple, declarative API designed specifically for Next.js apps
- **Ethical Advertising**: Built-in Islamic content filtering to ensure your ads align with ethical standards
- **Consent-Ready**: Supports Google's `pauseAdRequests` and non-personalised ads patterns for GDPR compliance
- **Developer-Friendly**: Comprehensive TypeScript support and intuitive props
- **Performance Optimized**: Lazy-loads via IntersectionObserver to minimise impact on Core Web Vitals

---

## Getting Started

### Installation

```bash
# npm
npm install react-nextjs-adsense

# yarn
yarn add react-nextjs-adsense

# pnpm
pnpm add react-nextjs-adsense
```

### 1. Add the AdSense script to your layout

Add the script **once** in your root layout. Google's generated ad code uses the `?client=` query param and `crossOrigin="anonymous"` — use this exact form.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> **Note:** Do not add a second copy of this script. The `<AdSense>` component handles calling `adsbygoogle.push({})` itself — you do not need to do it in the layout.

Alternatively, use Next.js `<Script>` with `strategy="afterInteractive"` if you prefer to defer loading:

```tsx
import Script from 'next/script';

<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

### 2. Place an ad unit

```tsx
"use client";
import { AdSense } from 'react-nextjs-adsense';

export default function BlogPost() {
  return (
    <article>
      <h1>Blog Post Title</h1>

      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
        format="auto"
        responsive="true"
      />

      <p>Your content here...</p>
    </article>
  );
}
```

That's it. Ethical content filtering is automatically enabled.

---

## Consent & Non-Personalised Ads

If you need to serve non-personalised ads to some users (e.g. users who have declined personalisation), pass `consentState` to the component. When personalisation is denied the component sets `requestNonPersonalizedAds=1`. When ad storage is denied entirely it uses `pauseAdRequests=1` to hold the request until consent is updated.

```tsx
import { AdSense, ConsentState } from 'react-nextjs-adsense';

// These values would come from your consent management solution
const consent: ConsentState = {
  ad_storage: "granted",          // "granted" | "denied"
  ad_personalization: "granted",  // "granted" | "denied"
};

<AdSense
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="1234567890"
  consentState={consent}
/>
```

**Behaviour by consent combination:**

| `ad_storage` | `ad_personalization` | Result |
|---|---|---|
| `"granted"` | `"granted"` | Normal personalised ads |
| `"granted"` | `"denied"` | Non-personalised ads |
| `"denied"` | any | Ad request paused — no ad fires |

If you have a TCF-integrated CMP on the page that already handles NPA signalling, set `tcfCompliant: true` so the component does not double-signal:

```tsx
const consent: ConsentState = {
  ad_storage: "granted",
  ad_personalization: "granted",
  tcfCompliant: true,
};
```

---

## Component API

### Props

| Prop | Type | Required | Default | Description |
|------|------|:--------:|---------|-------------|
| `client` | `string` | ✓ | — | Your AdSense publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) |
| `slot` | `string` | ✓ | — | Your ad unit ID |
| `format` | `string` | | `'auto'` | Ad format (`'auto'`, `'rectangle'`, `'vertical'`, `'fluid'`, etc.) |
| `responsive` | `string` | | `'false'` | Set `'true'` to make the ad adapt to container width |
| `layout` | `string` | | `''` | Ad layout (e.g. `'in-article'`) |
| `layoutKey` | `string` | | `''` | Layout key for customised ad formats |
| `className` | `string` | | `''` | CSS class on the `<ins>` element |
| `style` | `React.CSSProperties` | | `{ display: 'block' }` | Inline styles |
| `pageLevelAds` | `boolean` | | `false` | Enable Auto / page-level ads |
| `adTest` | `string` | | `undefined` | Set to `"on"` during development only — never in production |
| `useIslamicGuidelines` | `boolean` | | `true` | Enable Islamic-guidelines category blocklist |
| `blockCategories` | `string[]` | | `[]` | Additional ad categories to block |
| `consentState` | `ConsentState` | | `undefined` | Consent signals for non-personalised / paused ad handling |

### ConsentState type

```ts
interface ConsentState {
  ad_storage: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  /** Set true if a TCF CMP is active and already handles NPA signalling */
  tcfCompliant?: boolean;
}
```

---

## Ethical Content Filtering

Islamic-guidelines filtering is **enabled by default**. It automatically blocks 30+ ad categories using Google's `setCategoryExclusion` API.

Categories blocked by default include: dating, gambling, alcohol, tobacco, adult content, sex-related, interest-based loans (riba), speculative financial products (gharar), astrology, esoteric content, social casino, and more.

### Add extra categories

```tsx
<AdSense
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="1234567890"
  blockCategories={["fashion", "travel", "entertainment"]}
/>
```

### Disable Islamic filtering

```tsx
<AdSense
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="1234567890"
  useIslamicGuidelines={false}
/>
```

---

## Integration Examples

### App Router (Next.js 13+)

```tsx
// app/blog/[slug]/page.tsx
"use client";
import { AdSense } from 'react-nextjs-adsense';

export default function BlogPost() {
  return (
    <article className="blog-content">
      <h1>Blog Post Title</h1>

      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
        responsive="true"
        style={{ marginBottom: '2rem' }}
      />

      <div className="article-content">
        <p>Your content here...</p>
      </div>

      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="9876543210"
        responsive="true"
        style={{ marginTop: '2rem' }}
      />
    </article>
  );
}
```

### Pages Router

```tsx
// pages/index.tsx
import { AdSense } from 'react-nextjs-adsense';

export default function Home() {
  return (
    <main>
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
        format="auto"
        responsive="true"
      />
    </main>
  );
}
```

---

## TypeScript Support

```typescript
import {
  AdSense,
  ConsentState,
  HaramCategory,
  HARAM_AD_CATEGORIES,
} from 'react-nextjs-adsense';

const defaultCategories: readonly HaramCategory[] = HARAM_AD_CATEGORIES;

const consent: ConsentState = {
  ad_storage: "granted",
  ad_personalization: "denied",
};
```

---

## Best Practices

**Script setup**
- Load `adsbygoogle.js` once per page in your root layout
- Use the `?client=ca-pub-XXXXXXXXXXXXXXXX` query param — this is the format Google generates when you copy code from your AdSense account
- Do not call `adsbygoogle.push({})` in your layout; the `<AdSense>` component handles this

**Ad placement**
- Use `responsive="true"` on all units to prevent layout shift
- Keep to 3 or fewer ad units per page
- Place ads where they complement content rather than interrupt it

**Development vs production**
- Set `adTest="on"` during development to simulate ads without real impressions
- Remove `adTest` (or leave it `undefined`) before deploying — leaving it on means no real revenue is earned

**Troubleshooting**

If ads aren't showing:
1. Confirm your AdSense account is approved and the ad unit is active
2. Disable your ad blocker — it affects test ads too
3. Double-check your `client` and `slot` values
4. Confirm the `adsbygoogle.js` script is present in the page `<head>`
5. Check the browser console for `adsbygoogle` errors

---

## Further Resources

- [Official Google AdSense Documentation](https://support.google.com/adsense/answer/1307042)
- [Ad Personalization Settings & Code Examples](https://support.google.com/adsense/answer/9042142)
- [Google's Ad Category Controls](https://support.google.com/adsense/answer/164131)
- [Next.js Documentation](https://nextjs.org/docs)

---

## License

MIT

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/mahmudul-hasan-hridoy/react-nextjs-adsense).
