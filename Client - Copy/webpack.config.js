module.exports = {
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      util: require.resolve("util/"),
    },
  },
};
