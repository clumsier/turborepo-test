const withTM = require("next-transpile-modules")(["ui"], { debug: true });

module.exports = withTM({
  reactStrictMode: true,
});
