// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const packageName = process.env.npm_package_name;
!fs.existsSync('logs') && fs.mkdirSync('logs');
!fs.existsSync(`logs/${packageName}`) && fs.mkdirSync(`logs/${packageName}`);
const isGateway = packageName.includes('gateway');
const pathType = isGateway ? 'gateways' : 'services';
module.exports = {
  apps: [
    {
      name: `${packageName}`,
      script: `dist/${packageName}/${pathType}/${packageName}/src/main.js`,
      args: `${pathType}/${packageName}/src/main.ts`,
      wait_ready: true,
      error_file: `./logs/${packageName}/err.log`,
      out_file: `./logs/${packageName}/out.log`,
      log_file: `./logs/${packageName}/combined.log`,
      log_date_format: '',
      min_uptime: 10000,
      max_restarts: 3,
      instances: 1,
      namespace: pathType,
    },
  ],
};
