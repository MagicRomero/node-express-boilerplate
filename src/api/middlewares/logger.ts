import winston from "winston";
import expressWinston from "express-winston";
import appRoot from "app-root-path";

const options = {
  file: {
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
};

export default expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ ...options.file, level: "error" }),
    new winston.transports.File({ ...options.file, level: "warning" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg:
    "HTTP {{req.method}} {{req.url}} {{req.statusCode}} {{req.responseTime}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
});
