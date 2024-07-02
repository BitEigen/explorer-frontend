async function headers() {
  return [
    {
      source: '/:path*',
      headers: [
        // security headers from here - https://nextjs.org/docs/advanced-features/security-headers
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Content-Security-Policy',
          // eslint-disable-next-line max-len
          value: `frame-ancestors https://explorer.bitgrid3s.network 'self' http://localhost:* https://*.vercel.app https://*.ngrok-free.app https://secure-mobile.walletconnect.com https://secure.walletconnect.com; object-src 'none'`,
        },
      ],
    },
  ];
}

module.exports = headers;
