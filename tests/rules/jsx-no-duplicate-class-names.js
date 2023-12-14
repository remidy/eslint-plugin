const { RuleTester } = require("eslint");
const jsxNoDuplicateClassNames = require("../../src/rules/jsx-no-duplicate-class-names");

const ruleTester = new RuleTester({ parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 6 } });
ruleTester.run(
  "jsx-no-duplicate-class-names",
  jsxNoDuplicateClassNames,
  {
    valid: [
      {
        code: '<div className="a b c">...</div>'
      }
    ],
    invalid: [
      {
        code: '<div className="a b c b">...</div>',
        errors: [{ messageId: "noDuplicateClassNames" }]
      },
      {
        code: '<div className={classNames("a b c", a && "a", b && "b c")}>...</div>',
        errors: [{ messageId: "noDuplicateClassNames" }, { messageId: "noDuplicateClassNames" }, { messageId: "noDuplicateClassNames" }]
      },
      {
        code: '<div className={classNames("a b c", { a, "b c": b })}>...</div>',
        errors: [{ messageId: "noDuplicateClassNames" }, { messageId: "noDuplicateClassNames" }, { messageId: "noDuplicateClassNames" }]
      }
    ]
  }
);
