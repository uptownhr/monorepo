const { VueLoaderPlugin } = require('vue-loader');
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  console.log('config', config.plugins);

  config.module.rules.unshift({
    test: /\.vue$/,
    loader: 'vue-loader'
  })
  const merged =  merge(config, {
    // overwrite values here
    plugins: [new VueLoaderPlugin()]
  });

  console.log('merged', merged.module.rules, merged.plugins)
  return merged
};
