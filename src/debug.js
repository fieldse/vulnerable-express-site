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
