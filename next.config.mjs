/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/financial/heloc',
        destination: '/financial/heloc-calculator',
        permanent: true,
      },
      {
        source: '/financial/inflation',
        destination: '/financial/inflation-calculator',
        permanent: true,
      },
      {
        source: '/financial/loan-calculator',
        destination: '/financial/bike-emi-calculator',
        permanent: true,
      },
      {
        source: '/body-fat',
        destination: '/body-fat-calculator',
        permanent: true,
      },
      {
        source: '/fitness/body-fat',
        destination: '/body-fat-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
