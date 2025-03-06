/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Use null-loader to ignore the module
      config.module.rules.push({
        test: /\/lib\/text-encoding\.js$/, // Match the problematic module
        use: 'null-loader', // Ignore it
      });
      return config;
    },
  };
  
  export default nextConfig;