const { reduce } = require('lodash/fp');

const renderCSS = src => (src ? `<link rel="stylesheet" href="${src}">` : '');
const renderJS = src => (src ? `<script src="${src}"></script>` : '');

class Renderer {
  constructor({ entries = [], assets = {}, template = () => '' } = {}) {
    this.template = template;

    const entryAssets = reduce(
      (result, item) => [
        ...result,
        ...(assets[item] || []),
      ],
      [],
      entries,
    );

    this.assets = reduce(
      (result, item) => ({
        js: [
          ...result.js,
          ...(item.match(/\.js$/) ? [renderJS(item)] : []),
        ],

        css: [
          ...result.css,
          ...(item.match(/\.css$/) ? [renderCSS(item)] : []),
        ],
      }),
      { js: [], css: [] },
      entryAssets,
    );
  }

  render(locals = {}) {
    return this.template(locals, this.assets);
  }
}

module.exports = Renderer;