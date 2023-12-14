const jsxNoDuplicateClassNames = require("./src/rules/jsx-no-duplicate-class-names");
const jsxSortClassNames = require("./src/rules/jsx-sort-class-names");

module.exports = {
  meta: {
    name: "@remidy/eslint-plugin",
    version: "1.1.2"
  },
  rules: {
    "jsx-no-duplicate-class-names": jsxNoDuplicateClassNames,
    "jsx-sort-class-names": jsxSortClassNames
  }
};
