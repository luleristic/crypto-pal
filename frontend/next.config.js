module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5003/api/:path*',
        },
      ]
    },
};
