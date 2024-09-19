# react-nextjs-adsense

A React component for easy integration of Google AdSense in Next.js applications.

## Installation

```bash
npm install react-nextjs-adsense
```

or

```bash
yarn add react-nextjs-adsense
```

## Usage

### Basic Usage

Here's a basic example of how to use the AdSense component in your Next.js application:

```jsx
import { AdSense } from 'react-nextjs-adsense';

const MyComponent = () => {
  return (
    <div>
      <h1>My Page Content</h1>
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
      />
    </div>
  );
};

export default MyComponent;
```

### Advanced Usage

You can customize the AdSense component with various props:

```jsx
import { AdSense } from 'react-nextjs-adsense';

const MyComponent = () => {
  return (
    <div>
      <h1>My Page Content</h1>
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        slot="1234567890"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
        responsive="true"
      />
    </div>
  );
};

export default MyComponent;
```

### Page-Level Ads

To enable page-level ads:

```jsx
import { AdSense } from 'react-nextjs-adsense';

const MyPage = () => {
  return (
    <div>
      <AdSense
        client="ca-pub-XXXXXXXXXXXXXXXX"
        pageLevelAds={true}
      />
      {/* Your page content */}
    </div>
  );
};

export default MyPage;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `client` | string | - | Your AdSense client ID (required) |
| `slot` | string | - | Your AdSense ad unit ID (required) |
| `className` | string | `''` | Additional CSS classes for the ad container |
| `style` | object | `{ display: 'block' }` | Inline styles for the ad container |
| `layout` | string | `''` | AdSense layout type |
| `layoutKey` | string | `''` | AdSense layout key |
| `format` | string | `'auto'` | AdSense format |
| `responsive` | string | `'false'` | Whether the ad should be responsive |
| `pageLevelAds` | boolean | `false` | Enable page-level ads |
| `adTest` | string | - | Set to 'on' to enable test ads |

## Notes

- Make sure you comply with Google AdSense policies when implementing ads.
- The component will automatically load the AdSense script if it hasn't been loaded yet.
- For Next.js applications, ensure you're using the component on the client-side (e.g., inside `useEffect` or by using dynamic imports with `ssr: false`).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
export default MyPage;