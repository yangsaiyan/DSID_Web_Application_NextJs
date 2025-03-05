import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      'gun/sea': path.resolve(__dirname, './node_modules/gun/sea.js'),
      'text-encoding': path.resolve(__dirname, './node_module/gun/lib/text-encoding/lib/encoding.js'),
    };

    return config;
  },
  
  // Optional: if you're using experimental features
  experimental: {
    // Add any experimental configs if needed
  }
};

export default nextConfig;