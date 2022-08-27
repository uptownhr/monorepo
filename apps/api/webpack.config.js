const { VueLoaderPlugin } = require('vue-loader');
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  config.module.rules.unshift({
    test: /\.vue$/,
    loader: 'vue-loader'
  })
  const merged =  merge(config, {
    // overwrite values here
    plugins: [new VueLoaderPlugin()]
  });

  return merged
};
