// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const packageName = 'qtv-multichannel';
!fs.existsSync('logs') && fs.mkdirSync('logs');
!fs.existsSync(`logs/${packageName}`) && fs.mkdirSync(`logs/${packageName}`);
module.exports = {
  apps: [
    {
      name: `qtv-multichannel`,
      script: `dist/src/main.js`,
      args: `src/main.ts`,
      wait_ready: true,
      error_file: `./logs/${packageName}/err.log`,
      out_file: `./logs/${packageName}/out.log`,
      log_file: `./logs/${packageName}/combined.log`,
      log_date_format: '',
      min_uptime: 10000,
      max_restarts: 3,
      instances: 1,
      namespace: packageName,
    },
  ],
};
