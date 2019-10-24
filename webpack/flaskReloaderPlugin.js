const { exec } = require('child_process');
const path = require('path');

class FlaskReloaderPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.afterEmit.tap('Restarting Flask', (
    ) => {
      // eslint-disable-next-line no-console
      console.log('Restarting Flask');
      const myAppPath = path.join(__dirname, '../app/my_app.py');
      exec(`touch ${myAppPath}`, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Error restarting flask');
        }
      });
    });
  }
}

module.exports = FlaskReloaderPlugin;
