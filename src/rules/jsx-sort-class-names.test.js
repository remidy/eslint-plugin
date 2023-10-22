const { RuleTester } = require("eslint");
const jsxSortClassNames = require("./jsx-sort-class-names");

const ruleTester = new RuleTester({ parserOptions: { ecmaFeatures: { jsx: true } } });
ruleTester.run(
  "jsx-sort-class-names",
  jsxSortClassNames,
  {
    valid: [
      {
        code: '<div className="gap-16 grid grid-cols-1">...</div>'
      },
      {
        code: '<input className={classNames("-m-1 p-8", leading && "ml-0 pl-0", trailing && "mr-0 pr-0")} />'
      },
      {
        code: '<input className={classNames("-m-1 p-8", { "ml-0 pl-0": leading, "mr-0 pr-0": trailing })} />'
      },
      {
        code: '<div className="gap-16 grid grid-cols-1 md:gap-24 md:grid-cols-2 lg:gap-32 lg:grid-cols-3">...</div>',
        options: [{ modifiers: ["md", "lg"] }]
      }
    ],
    invalid: [
      {
        code: '<div className="grid grid-cols-1 gap-16">...</div>',
        output: '<div className="gap-16 grid grid-cols-1">...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      }
    ]
  }
);
