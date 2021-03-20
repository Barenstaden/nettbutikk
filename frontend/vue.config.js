module.exports = {
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:1337',
      },
    },
  },
};
