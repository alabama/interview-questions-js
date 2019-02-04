import winston from 'winston';

const errorStackFormat = winston.format(message => {
  if (message instanceof Error) {
    return Object.assign({}, message, {
      // stack: message.stack,
      message: message.message,
    });
  }
  return message;
});

function rest(info) {
  const leftoverParams = Object.assign({}, info, {
    level: undefined,
    message: undefined,
    timestamp: undefined,
    splat: undefined,
    label: undefined,
  });
  // CAREFUL: leftoverParams can have Symbols in it, which behave differently! https://javascript.info/symbol
  // JSON stringify will not return values for keys with undefined values!
  const containsInformation = Object.values(leftoverParams).filter(value => value !== undefined).length > 0;
  return containsInformation ? JSON.stringify(leftoverParams) : '';
}

const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.colorize({
      all: true,
      colors: { info: 'cyan' },
    }),
    errorStackFormat(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(info => `[${info.level}][${info.timestamp}]: ${info.message} ${rest(info)}`)
  ),
  transports: [new winston.transports.Console()],
});

export default Logger;
