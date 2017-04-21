# Universal Webpack Assets

**Requires Webpack 2**

This webpack plugin creates a manifest of assets that are compiled during a build (ie. images) using url-loader/file-loader.

It comes with a loader to reference these assets when using webpack to create your server build.


## Client

```js
// webpack.config.js
const UniversalWebpackAssetsPlugin = require('universal-webpack-assets');

module.exports = {
  ...
  plugins: [
    new UniversalWebpackAssetsPlugin({
      regex: /\.(jpe?g|png|gif|svg)$/,
      manifestFile: 'universal-assets.json',
    }),
  ],
};
```

## Server

```js
//webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'universal-webpack-assets/loader',
          options: {
            manifestFile: path.join(baseDir, 'universal-assets.json'),
            context: __dirname,
          },
        }],
      },
    ],
  },
};
```
