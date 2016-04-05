# Universal Webpack Assets

This webpack plugin creates a manifest of assets that are compiled during a build (ie. images) using url-loader/file-loader.

It comes with a loader to reference these assets when using webpack to create your server build.


## Client

```
// webpack.config.js
const UniversalWebpackAssetsPlugin = require('universal-webpack-assets');

module.exports = {
  ...
  universalWebpackAssetsConfig: {
    regex: /\.(jpe?g|png|gif|svg)$/,
    manifestFile: 'universal-assets.json',
  },
  plugins: [
    new UniversalWebpackAssetsPlugin(),
  ],
};
```

## Server

```
//webpack.config.js
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'universal-webpack-assets/loader',
      },
    ],
  },
  universalWebpackAssetsConfig: {
    manifestFile: path.resolve('universal-assets.json'),
  },
};
```
