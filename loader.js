'use strict';

let fs = require('fs'); // eslint-disable-line prefer-const
const path = require('path');

module.exports = function universalWebpackAssetsLoader() {
  const defaults = {
    manifestFile: path.join(this.options.context, 'universal-assets.json'),
  };

  const config = Object.assign({}, defaults, this.options.universalWebpackAssetsConfig);

  this.cacheable();
  const manifestPath = config.manifestFile;
  this.addDependency(manifestPath);
  const manifest = JSON.parse(fs.readFileSync(manifestPath).toString());
  const assets = manifest.assets;
  const asset = assets.filter(i => i.resourcePath === this.resourcePath)[0];
  return asset.compiled;
};
