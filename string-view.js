const Renderer = require('./renderer');

class StringView {
  constructor(ctx) {
    const { config } = ctx.app;

    this.ctx = ctx;
    this.config = config.stringView || { assets: {} };
  }

  get assets() {
    const { assets } = this.config;
    return assets instanceof Function ? assets(this.ctx) : assets;
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