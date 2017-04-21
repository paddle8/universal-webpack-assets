'use strict';

let fs = require('fs'); // eslint-disable-line prefer-const
const path = require('path');
const loaderUtils = require('loader-utils');

module.exports = function universalWebpackAssetsLoader() {
  const options = loaderUtils.getOptions(this);
  const defaults = {
    manifestFile: path.join(options.context, 'universal-assets.json'),
  };

  const config = Object.assign({}, defaults, options);

  const manifestPath = config.manifestFile;

  // addDependency tells webpack to bust cache when specified file changes
  this.addDependency(manifestPath);

  // uncomment this.cacheable(false) for development
  // this.cacheable(false);

  const manifest = JSON.parse(fs.readFileSync(manifestPath).toString());
  const assets = manifest.assets;
  const asset = assets.filter(i => i.resourcePath === this.resourcePath)[0];
  return asset.compiled;
};
