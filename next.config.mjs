/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Use null-loader to ignore the module
      config.module.rules.push({
        test: /text-encoding/, // Match any reference to "text-encoding"
        use: 'null-loader', // Ignore it
      });
      return config;
    },
  };
  
  export default nextConfig;