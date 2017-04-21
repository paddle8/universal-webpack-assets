/* eslint-disable object-shorthand */

'use strict'; // eslint-disable-line strict

let fs = require('fs'); // eslint-disable-line prefer-const
const path = require('path');

function universalWebpackAssetsPluginApply(options, compiler) {
  compiler.plugin('done', function WriteStatsPluginDone(stats) {
    const defaults = {
      manifestFile: 'universal-assets.json',
      regex: /\.(jpe?g|png|gif|svg)$/,
    };

    const config = Object.assign({}, defaults, options);

    const publicPath = this.options.output.publicPath;
    const json = stats.toJson();

    const getCompiledAsset = function getCompiledAsset(asset) {
      let compiled;
      if (asset.assets.length) {
        compiled = `module.exports = "${publicPath}${asset.assets[0]}"`;
      } else {
        compiled = asset.source;
      }
      return compiled;
    };

    // Find compiled assets in modules
    // it will be used to map original filename to the compiled one
    // for server side rendering
    const assetRegex = config.regex;
    const assets = json.modules
      .filter(module => assetRegex.test(module.name))
      .map(asset =>
        ({
          resourcePath: path.join(stats.compilation.options.context, asset.name),
          compiled: getCompiledAsset(asset),
        })
      );

    const content = { assets };

    const manifestFile = config.manifestFile;

    fs.writeFileSync(manifestFile, JSON.stringify(content));
  });
}

module.exports = function universalWebpackAssetsPlugin(options) {
  return {
    apply: universalWebpackAssetsPluginApply.bind(this, options),
  };
};
