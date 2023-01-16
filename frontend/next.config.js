module.exports = {
  images: {
    domains: ['buzzlypostimages.s3.amazonaws.com']
  },
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5003/api/:path*',
        },
      ]
    },
};
