// Logging functions for debugging requests
import { DEBUG } from './config.js';

export const logSuccess = (req, msg, ...opts) => {
  console.log(
    `=== [success][${req.method.toUpperCase()} ${req.path}] ${msg}`,
    ...opts
  );
};

export const logDebug = (req, msg, ...opts) => {
  if (DEBUG) {
    console.log(
      `=== [DEBUG][${req.method.toUpperCase()} ${req.path}] ${msg}`,
      ...opts
    );
  }
};

export const logErr = (req, err) => {
  console.log(
    `=== [error][${req.method.toUpperCase()} ${req.path}]`,
    err.message
  );
};

export default {
  logSuccess,
  logDebug,
  logErr,
};
