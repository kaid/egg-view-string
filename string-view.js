const Renderer = require('./renderer');

class StringView {
  constructor(ctx) {
    const { config = {}, assets = {} } = ctx.app;

    this.app = ctx.app;
    this.config = config;
  }

  get assets() {
    return this.app.assets;
  }

  render(fullPath, locals = {}) {
    const { entries, ...rest } = locals;

    const renderer = new Renderer({
      entries,
      assets: this.assets,
      template: require(fullPath),
    });

    return renderer.render(rest);
  }

  renderString(str = '') {
    return str;
  }
}

module.exports = StringView;