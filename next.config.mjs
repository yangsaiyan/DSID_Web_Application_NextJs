/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
      };
  
      config.plugins.push(
        new (require('webpack')).ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
  
      return config;
    },
  };
  
  export default nextConfig;