const app = require("./app");

const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("listen on:", PORT);
});
