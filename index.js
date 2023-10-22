const jsxSortClassNames = require("./src/rules/jsx-sort-class-names");

module.exports = {
  meta: {
    name: "@remidy/eslint-plugin",
    version: "1.0.1"
  },
  rules: {
    "jsx-sort-class-names": jsxSortClassNames
  }
};
