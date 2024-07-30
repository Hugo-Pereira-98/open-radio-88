module.exports = {
  async redirects() {
    return [
      {
        source: '/auth/signin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'localhost:3000',
          },
        ],
        destination: '/',
        permanent: false,
      },
    ];
  },
};
