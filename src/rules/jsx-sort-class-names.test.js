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
      },
      {
        code: '<input className={classNames("p-8 -m-1", leading && "pl-0 ml-0", trailing && "pr-0 mr-0")} />',
        output: '<input className={classNames("-m-1 p-8", leading && "ml-0 pl-0", trailing && "mr-0 pr-0")} />',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<input className={classNames("p-8 -m-1", { "pl-0 ml-0": leading, "pr-0 mr-0": trailing })} />',
        output: '<input className={classNames("-m-1 p-8", { "ml-0 pl-0": leading, "mr-0 pr-0": trailing })} />',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<div className="gap-16 md:gap-24 lg:gap-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">...</div>',
        options: [{ modifiers: ["md", "lg"] }],
        output: '<div className="gap-16 grid grid-cols-1 md:gap-24 md:grid-cols-2 lg:gap-32 lg:grid-cols-3">...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      }
    ]
  }
);
