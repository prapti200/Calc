/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/((?!api|_next|assets|css|js|favicon).*)',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
