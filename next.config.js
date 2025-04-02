/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export in production, not in development
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  // Allow preview URLs to access resources
  allowedDevOrigins: ['utensils-preview.loca.lt'],
  // Enable hot reloading for the _pages directory
  reactStrictMode: false, // Set to false to prevent double-rendering in development
  // Tell webpack not to ignore the _pages directory
  webpack: (config, { dev }) => {
    if (dev) {
      // Ensure webpack is watching the _pages directory
      config.watchOptions = {
        ...config.watchOptions,
        // Poll for changes every 300ms
        poll: 300,
        // Don't ignore the _pages directory
        ignored: /node_modules/,
      };

      // Add the _pages directory to the watched paths
      config.snapshot = {
        ...config.snapshot,
        managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!_pages)/],
      };
    }
    return config;
  },
}

module.exports = nextConfig