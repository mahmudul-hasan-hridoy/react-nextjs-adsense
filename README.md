# react-nextjs-adsense

A modern React component library for seamlessly integrating Google AdSense into your Next.js applications, with built-in ethical content filtering.

[![npm version](https://img.shields.io/npm/v/react-nextjs-adsense.svg)](https://www.npmjs.com/package/react-nextjs-adsense)
[![license](https://img.shields.io/npm/l/react-nextjs-adsense.svg)](https://github.com/mahmudul-hasan-hridoy/react-nextjs-adsense/blob/main/LICENSE)

Demo: [https://toolcluster.com/adsense-demo](https://toolcluster.com/adsense-demo)


## Why Choose react-nextjs-adsense?

- **Effortless Integration**: Simple, declarative API designed specifically for Next.js apps
- **Ethical Advertising**: Built-in Islamic content filtering to ensure your ads align with ethical standards
- **Developer-Friendly**: Comprehensive TypeScript support and intuitive props
- **Performance Optimized**: Minimizes impact on your site's loading speed and user experience

## Getting Started

### Installation

Choose your preferred package manager:

```bash
# Using npm
npm install react-nextjs-adsense

# Using yarn
yarn add react-nextjs-adsense

# Using pnpm
pnpm add react-nextjs-adsense
```

### Quick Start

Adding AdSense to your Next.js application is as simple as:

```jsx
import { AdSense } from 'react-nextjs-adsense';

function HomePage() {
  return (
    <div className="content">
      <h1>Welcome to My Site</h1>
      <p>Valuable content for my visitors</p>
      
      {/* Add your AdSense ad unit */}
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"  // Your AdSense Publisher ID
        slot="1234567890"                 // Your AdSense Ad Unit ID
      />
    </div>
  );
}
```

That's it! Your AdSense ads will display with ethical content filtering automatically enabled.

## Component API

### AdSense Props

| Prop | Type | Required | Default | Description |
|------|------|:--------:|---------|-------------|
| `client` | `string` | ✓ | - | Your Google AdSense publisher ID (format: 'ca-pub-XXXXXXXXXXXXXXXX') |
| `slot` | `string` | ✓ | - | Your AdSense ad unit ID |
| `format` | `string` | - | `'auto'` | Ad format specification (e.g., 'auto', 'rectangle', 'vertical') |
| `responsive` | `string` | - | `'false'` | Set to `'true'` for responsive ads that adapt to container width |
| `layout` | `string` | - | `''` | Ad layout format for advanced configurations |
| `layoutKey` | `string` | - | `''` | Layout key for customized ad formats |
| `className` | `string` | - | `''` | Additional CSS class to style the ad container |
| `style` | `React.CSSProperties` | - | `{ display: 'block' }` | Inline styles for customizing ad appearance |
| `pageLevelAds` | `boolean` | - | `false` | Enable Google's page-level ads |
| `adTest` | `string` | - | `undefined` | Ad test mode parameter (for development use) |
| `useIslamicGuidelines` | `boolean` | - | `true` | Enable ethical content filtering based on Islamic guidelines |
| `blockCategories` | `string[]` | - | `[]` | Additional ad categories you want to block |

## Ethical Content Filtering

Our library comes with a built-in ethical content filtering system based on Islamic guidelines, which is **enabled by default**. This means you don't need to configure anything to start benefiting from cleaner, more appropriate advertising on your site.

### What Gets Filtered?

The filtering system automatically blocks over 30 potentially problematic ad categories, including:

- Dating and relationship services
- Gambling and betting 
- Alcohol and tobacco products
- Adult and suggestive content
- Interest-based financial products
- Contentious political material
- And many more categories that may not align with ethical values

### Customizing Content Filtering

While the default settings work well for most users, you can easily customize the filtering:

```jsx
<AdSense
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="1234567890"
  // Block additional categories beyond the defaults
  blockCategories={["fashion", "travel", "entertainment"]}
/>
```

### Disabling Ethical Filtering

In specific cases where you need to disable the ethical filtering system:

```jsx
<AdSense
  client="ca-pub-XXXXXXXXXXXXXXXX"
  slot="1234567890"
  useIslamicGuidelines={false}
/>
```

## Integration Examples

### With Next.js App Router (Next.js 13+)

```jsx
// app/blog/[slug]/page.jsx
"use client";

import { AdSense } from 'react-nextjs-adsense';

export default function BlogPost() {
  return (
    <article className="blog-content">
      <h1>Blog Post Title</h1>
      
      {/* Top of article ad */}
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
        responsive="true"
        style={{ marginBottom: '2rem' }}
      />
      
      <div className="article-content">
        <p>Your valuable blog content here...</p>
      </div>
      
      {/* Bottom of article ad */}
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

### With Next.js Pages Router

```jsx
// pages/index.js
import { AdSense } from 'react-nextjs-adsense';

export default function Home() {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to My Website</h1>
      </header>
      
      <main>
        <section className="featured-content">
          {/* Content here */}
        </section>
        
        <AdSense
          client="ca-pub-XXXXXXXXXXXXXXXX"
          slot="1234567890"
          format="auto"
          responsive="true"
        />
        
        <section className="more-content">
          {/* More content here */}
        </section>
      </main>
    </div>
  );
}
```

## TypeScript Support

Our library includes comprehensive TypeScript definitions to enhance your development experience:

```typescript
import { 
  AdSense, 
  HaramCategory, 
  HARAM_AD_CATEGORIES 
} from 'react-nextjs-adsense';

// Type-safe access to the default blocked categories
const defaultCategories: readonly HaramCategory[] = HARAM_AD_CATEGORIES;

// Your component with typed props
interface ContentSectionProps {
  showAds: boolean;
}

function ContentSection({ showAds }: ContentSectionProps) {
  return (
    <section>
      {showAds && (
        <AdSense
          client="ca-pub-XXXXXXXXXXXXXXXX"
          slot="1234567890"
          blockCategories={["fashion", "beauty"]}
        />
      )}
    </section>
  );
}
```

## Best Practices

### Performance Optimization

- **Strategic Placement**: Place ads where they won't disrupt your content flow
- **Limit Ad Units**: Don't overwhelm your users with too many ads on one page
- **Responsive Design**: Use `responsive="true"` to ensure ads look good on all devices

### Maximizing Revenue While Maintaining Ethics

- **Quality Content First**: Focus on creating valuable content that attracts engaged users
- **Ad Placement Testing**: Experiment with different placements to find what works best
- **Ethical Balance**: Maintain a balance between monetization and user experience

### Troubleshooting

If your ads aren't displaying:

1. Verify your AdSense account is approved and active
2. Double-check your `client` and `slot` values
3. Ensure you've added the AdSense script to your Next.js application
4. Check your browser console for any error messages

## Support and Contribution

We welcome contributions and feedback! If you encounter issues or have suggestions for improvements, please open an issue on our GitHub repository.

## 🔗 Further Resources

- [Official Google AdSense Documentation](https://support.google.com/adsense/answer/1307042)
- [Google's Ad Category Controls](https://support.google.com/adsense/answer/164131)
- [Next.js Documentation](https://nextjs.org/docs)

## 📄 License

MIT

## 👋 Contributing

We welcome contributions to improve this library! Please feel free to submit issues or pull requests.