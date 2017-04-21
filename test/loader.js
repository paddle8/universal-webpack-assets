'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;

const loader = rewire('../loader');

describe('Loader', () => {
  const context = {
    query: {
      context: '/rootPath/',
      manifestFile: '/rootPath/test-manifest.json',
    },
    resourcePath: '/rootPath/path/to/resource.wow',
    cacheable() {},
    addDependency() {},
  };
  const manifest = {
    assets: [
      {
        resourcePath: '/rootPath/path/to/resource.wow',
        compiled: 'module.exports = "/publicPath/HASH1234.wow"',
      },
    ],
  };
  it('should return an import for the resource', () => {
    loader.__with__('fs', {
      readFileSync(path) {
        expect(path).to.equal('/rootPath/test-manifest.json');
        return JSON.stringify(manifest);
      },
    })(() => {
      const result = loader.bind(context)();
      expect(result).to.equal('module.exports = "/publicPath/HASH1234.wow"');
    });
  });
});
