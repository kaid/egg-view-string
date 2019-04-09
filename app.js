const StringView = require('./string-view');

class StringViewAppHook {
  constructor(app) {
    this.app = app;
    this.app.view.use('stringView', StringView);
  }
}

module.exports = StringViewAppHook;