/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Ignore the missing module
      config.resolve.alias['./lib/text-encoding'] = false;
      return config;
    },
  };
  
  export default nextConfig;