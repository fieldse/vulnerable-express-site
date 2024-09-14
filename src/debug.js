// Logging functions for debugging requests

export const logSuccess = (req, msg, ...opts) => {
  console.log(
    `=== [success][${req.method.toUpperCase()} ${req.path}] ${msg}`,
    ...opts
  );
};

export const logDebug = (req, msg, ...opts) => {
  console.log(
    `=== [DEBUG][${req.method.toUpperCase()} ${req.path}] ${msg}`,
    ...opts
  );
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
