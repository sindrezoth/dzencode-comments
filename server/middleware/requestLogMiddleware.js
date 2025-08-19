const requestLogMiddleware = (req, res, next) => {
  console.log(`URL: ${req.url}`);
  console.log("body: ");
  console.log(req.body);
  console.log();

  next();
};

module.exports = requestLogMiddleware;
