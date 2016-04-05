'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;

const Plugin = rewire('../index');

describe('Plugin', () => {
  const context = {
    options: {
      output: {
        publicPath: '/publicPath/',
      },
      universalWebpackAssetsConfig: {
        manifestFile: 'testing-assets.json',
        regex: /\.wow$/,
      },
    },
  };
  const stats = {
    compilation: {
      options: {
        context: '/rootPath/',
      },
    },
    toJson: () => ({
      modules: [
        {
          name: 'path/to/resource.wow',
          assets: [
            'HASH1234.wow',
          ],
        },
      ],
    }),
  };

  it('should create a manifest of compiled assets', () => {
    Plugin.__with__('fs', {
      writeFileSync(path, content) {
        const manifest = JSON.parse(content);
        expect(path).to.equal('testing-assets.json');
        expect(manifest.assets[0].resourcePath).to.equal('/rootPath/path/to/resource.wow');
        expect(manifest.assets[0].compiled).to.equal('module.exports = "/publicPath/HASH1234.wow"');
      },
    })(() => {
      const plugin = new Plugin();
      plugin.apply({
        plugin: (event, callback) => {
          expect(event).to.equal('done');
          const boundCB = callback.bind(context);
          boundCB(stats);
        },
      });
    });
  });
});
