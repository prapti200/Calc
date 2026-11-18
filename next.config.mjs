/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/financial/loan-calculator',
        destination: '/financial/bike-emi-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
