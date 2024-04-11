const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    appBuild: resolveApp('dist'),
    appServerTs: resolveApp('app.ts'),
    apPackageJson: resolveApp('package.json'),
    appNodeModule: resolveApp('node_modules'),
    appLog: resolveApp('logs'),
    appBackup: resolveApp('backups'),
};
