/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/financial/8th-pay-commission',
        destination: '/financial/8th-pay-commission-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/8th-cpc-calculator',
        destination: '/financial/8th-pay-commission-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/pay-commission',
        destination: '/financial/8th-pay-commission-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/pay-commission-calculator',
        destination: '/financial/8th-pay-commission-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/8th-cpc-salary-calculator',
        destination: '/financial/8th-pay-commission-salary-calculator',
        permanent: true,
      },
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
        source: '/financial/in-hand-salary-calculator',
        destination: '/financial/salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/ctc-to-in-hand-calculator',
        destination: '/financial/salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/take-home-salary-calculator',
        destination: '/financial/salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/adp-paycheck-calculator',
        destination: '/financial/adp-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/adp-paycheck',
        destination: '/financial/adp-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/adp-salary',
        destination: '/financial/adp-salary-calculator',
        permanent: true,
      },
      {
        source: '/financial/us-paycheck-calculator',
        destination: '/financial/adp-salary-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
