const requestLogMiddleware = (req, res, next) => {
  console.log(`- URL: ${req.url}`);
  console.log(`- method: ${req.method}`);
  if (req.body) {
    console.log("- body: ");
    console.log(req.body);
  }
  if (Object.keys(req.query).length) {
    console.log("- query: ");
    console.log(req.query);
  }
  if (Object.keys(req.params).length) {
    console.log("- params: ");
    console.log(req.params);
  }
  console.log();

  next();
};

module.exports = requestLogMiddleware;
