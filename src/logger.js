const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const { combine, timestamp, label, printf, simple, splat } = format;
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  var levelUpper = level.toUpperCase();
  switch (levelUpper) {
    case "INFO":
      message = chalk.green(message);
      level = chalk.black.bgGreenBright.bold(level);
      break;

    case "WARN":
      message = chalk.yellow(message);
      level = chalk.black.bgYellowBright.bold(level);
      break;

    case "ERROR":
      message = chalk.red(message);
      level = chalk.black.bgRedBright.bold(level);
      break;

    default:
      break;
  }
  return `[${chalk.black.bgBlue.bold(label)}] [${chalk.black.bgWhiteBright(timestamp)}] [${level}]: ${message}`;
});
const fileFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`;
});
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Socialytics' }),
    timestamp(),
    format.splat(),
    consoleFormat

  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename:'logs/socialytics.log',
      format: combine(
        label({ label: 'Socialytics' }),
        timestamp(),
        format.splat(),
        fileFormat
      )
    })
  ]
});

module.exports = logger;
