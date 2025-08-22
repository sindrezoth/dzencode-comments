const requestLogMiddleware = (req, res, next) => {
  console.log(`URL: ${req.url}`);
  console.log("body: ");
  console.log(req.body);
  console.log("query: ");
  console.log(req.query);
  console.log("params: ");
  console.log(req.params);
  console.log();

  next();
};

module.exports = requestLogMiddleware;
