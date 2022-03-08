import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import {
  Logger,
  createLogger,
  LoggerOptions,
  format,
  transports,
} from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");

const {
  combine,
  timestamp,
  printf,
  prettyPrint,
  colorize,
  json,
  errors,
} = format;

const logDirectory = "logs";
const filename = join(logDirectory, "app-%DATE%.log");
const level = process.env.NODE_ENV === "production" ? "info" : "debug";

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}

// Console log output format setting
const consoleOutputFormat = combine(
  colorize(),
  prettyPrint(),
  json(),
  printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

// File log output format setting
const fileOutputFormat = combine(
  printf(info => {
    if (info.stack) {
      return `${info.timestamp} ${info.level} ${info.message} : ${info.stack}`;
    }

    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

const options: LoggerOptions = {
  level,
  exitOnError: false,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
  ),
  transports: [
    // Console log output
    new transports.Console({
      handleExceptions: true,
      format: consoleOutputFormat,
    }),
    // File log output
    new DailyRotateFile({
      handleExceptions: true,
      format: fileOutputFormat,
      filename,
    }),
  ],
};

const logger: Logger = createLogger(options);

export { logger };
