const fs = require('fs');

function recordBuildTime(appPath) {
  const appFileName = `${appPath}/buildTime.json`;
  const dateString = new Date().toISOString();
  const shortDate = dateString.replace(/[-:.TZ]/g, '');
  const build = {
    date: dateString,
    shortDate,
  };
  fs.writeFileSync(appFileName, JSON.stringify(build, null, 2));
  return build;
}

module.exports = recordBuildTime;
