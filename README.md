# react-nextjs-adsense

A flexible and easy-to-use AdSense component for React and Next.js applications.

## Installation

```bash
npm install react-nextjs-adsense
```

or

```bash
yarn add react-nextjs-adsense
```

## Usage

### 1. Wrap your app with AdSenseProvider (optional, but recommended)

```jsx
import { AdSenseProvider } from 'react-nextjs-adsense';

function MyApp({ Component, pageProps }) {
  return (
    <AdSenseProvider client="ca-pub-XXXXXXXXXXXXXXXX">
      <Component {...pageProps} />
    </AdSenseProvider>
  );
}

export default MyApp;
```

### 2. Use the AdSense component in your pages or components

```jsx
import { AdSense } from 'react-nextjs-adsense';

function MyPage() {
  return (
    <div>
      <h1>My Content</h1>
      
      {/* Standard responsive ad */}
      <AdSense slot="XXXXXXXXXX" />
      
      {/* In-article ad */}
      <AdSense slot="XXXXXXXXXX" format="fluid" layout="in-article" />
      
      {/* In-feed ad */}
      <AdSense 
        slot="XXXXXXXXXX" 
        format="fluid" 
        layout="in-feed" 
        layoutKey="-fb+5w+4e-db+86"
      />
      
      {/* Display ad */}
      <AdSense slot="XXXXXXXXXX" format="rectangle" responsive={false} />
    </div>
  );
}

export default MyPage;
```

## Props

The `AdSense` component accepts the following props:

- `client` (optional): Your AdSense client ID. If not provided, it will use the one from AdSenseProvider.
- `slot` (required): The ad unit ID.
- `format` (optional): Ad format. Can be 'auto', 'fluid', 'rectangle', 'vertical', or 'horizontal'. Default is 'auto'.
- `responsive` (optional): Whether the ad should be responsive. Default is true.
- `style` (optional): Additional styles for the ad container.
- `className` (optional): Additional CSS classes for the ad container.
- `layout` (optional): Can be 'in-article' or 'in-feed' for specific ad layouts.
- `layoutKey` (optional): Required for some ad layouts like 'in-feed'.
- `fullWidthResponsive` (optional): Whether the ad should be full-width responsive. Default is false.

## Advanced Usage

### Using the useAdSense hook

You can use the `useAdSense` hook to access the AdSense context in your components:

```jsx
import { useAdSense } from 'react-nextjs-adsense';

function MyComponent() {
  const { isEnabled, isLoaded, error } = useAdSense();

  if (!isLoaded) return <div>Loading ads...</div>;
  if (error) return <div>Error loading ads: {error}</div>;
  if (!isEnabled) return null;

  return <div>Ads are ready to be displayed</div>;
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.