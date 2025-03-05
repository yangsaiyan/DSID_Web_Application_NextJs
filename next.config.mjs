/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'text-encoding': require.resolve('text-encoding'),
      };
  
      return config;
    }
  };
  
  export default nextConfig;