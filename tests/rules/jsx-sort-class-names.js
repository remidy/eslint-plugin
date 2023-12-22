const { RuleTester } = require("eslint");
const jsxSortClassNames = require("../../src/rules/jsx-sort-class-names");

const ruleTester = new RuleTester({ parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 2015 } });
ruleTester.run(
  "jsx-sort-class-names",
  jsxSortClassNames,
  {
    valid: [
      {
        code: '<div className="a b c">...</div>'
      },
      {
        code: '<div className={classNames("d e f", b && "b c", a && "a")}>...</div>'
      },
      {
        code: '<div className={classNames("d e f", { "b c": b, a })}>...</div>'
      },
      {
        code: '<div className="a-1 b-1 c-1 x:a-2 x:b-2 x:c-2 y:a-3 y:b-3 z:a-4">...</div>',
        options: [{ modifiers: ["x", "y", "z"] }]
      }
    ],
    invalid: [
      {
        code: '<div className="-c b a">...</div>',
        output: '<div className="a b -c">...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<div className={classNames("c b a", d && "d", e && "f e")}>...</div>',
        output: '<div className={classNames("a b c", d && "d", e && "e f")}>...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }, { messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<div className={classNames("c b a", { d, "f e": e })}>...</div>',
        output: '<div className={classNames("a b c", { d, "e f": e })}>...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }, { messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<div className="a-1 x:a-2 y:a-3 z:a-4 b-1 x:b-2 y:b-3 c-1 x:c-2">...</div>',
        output: '<div className="a-1 b-1 c-1 x:a-2 x:b-2 x:c-2 y:a-3 y:b-3 z:a-4">...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      },
      {
        code: '<div className="a-1 x:a-2 y:a-3 z:a-4 b-1 x:b-2 y:b-3 c-1 x:c-2">...</div>',
        options: [{ modifiers: ["x", "y", "z"] }],
        output: '<div className="a-1 b-1 c-1 x:a-2 x:b-2 x:c-2 y:a-3 y:b-3 z:a-4">...</div>',
        errors: [{ messageId: "sortClassNamesAlphabetically" }]
      }
    ]
  }
);
