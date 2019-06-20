const { exec } = require('child_process');

class FlaskReloaderPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.afterEmit.tap('Restarting Flask', (
    ) => {
      // eslint-disable-next-line no-console
      console.log('Restarting Flask');
      exec('touch ./app/my_app.py', (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Error restarting flask');
        }
      });
    });
  }
}

module.exports = FlaskReloaderPlugin;
