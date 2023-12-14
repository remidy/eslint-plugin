module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noDuplicateClassNames: "No duplicate class names allowed"
    }
  },
  create(context) {
    function lint(node, value, classNames) {
      value.split(" ").filter(Boolean).forEach((className) => {
        if (classNames.has(className)) {
          context.report({
            node,
            messageId: "noDuplicateClassNames"
          });
        } else {
          classNames.add(className);
        }
      });
    }

    return {
      JSXAttribute(node) {
        if (node.name.name === "className") {
          const classNames = new Set();

          if (node.value.type === "Literal") {
            lint(node, node.value.value, classNames);
          } else if (node.value.type === "JSXExpressionContainer") {
            node.value.expression.arguments?.forEach((argument) => {
              if (argument.type === "Literal") {
                lint(node, argument.value, classNames);
              } else if (argument.type === "LogicalExpression") {
                lint(node, argument.right.value, classNames);
              } else if (argument.type === "ObjectExpression") {
                argument.properties.forEach((property) => {
                  lint(node, property.key[property.shorthand ? "name" : "value"], classNames);
                });
              }
            });
          }
        }
      }
    };
  }
};
