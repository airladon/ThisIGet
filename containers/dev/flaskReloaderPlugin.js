

class FlaskReloaderPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('Hello World Plugin', (
    ) => {
      console.log('Hello World!');
    });
  }
  // apply(compiler) {
  //   compiler.hooks.watchClose.tap('Flask Reloader Plugin', () => {
  //     console.log('Should be reloading flask');
  //   });
  // }
}

module.exports = FlaskReloaderPlugin;
