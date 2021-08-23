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
};
