// https://nextjs.org/blog/next-10-2#routing-based-on-headers-and-query-string-parameters
module.exports = {
  async redirects() {
    return [
      {
        source: "/explore/storybook",
        destination: "/explore/storybook/index.html",
        permanent: false,
      },
    ];
  },
  // faster minification directly with swc (currently rc will be default in next@12.2.0) - https://nextjs.org/blog/next-12-1#faster-minification-with-swc
  swcMinify: true,
};
