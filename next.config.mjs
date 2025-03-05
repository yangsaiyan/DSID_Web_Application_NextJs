import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'text-encoding': require.resolve('text-encoding-polyfill'),
        };
        return config;
      }
  
  // Optional: if you're using experimental features
  experimental: {
    // Add any experimental configs if needed
  }
};

export default nextConfig;