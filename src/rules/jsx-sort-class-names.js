module.exports = {
  meta: {
    type: "suggestion",
    schema: [{
      type: "object",
      properties: {
        modifiers: {
          type: "array",
          items: [{
            type: "string"
          }]
        }
      }
    }],
    fixable: "code",
    messages: {
      sortClassNamesAlphabetically: "Class names should be sorted alphabetically"
    }
  },
  create(context) {
    const modifiers = context.options[0]?.modifiers || [];
    const modifierIndices = new Map(modifiers.map((modifier, index) => [modifier, index]));

    function lint(node, value) {
      if (typeof value.value === "string") {
        const values = value.value.split(" ").filter(Boolean);
        if (values.length > 1) {
          const sortedValue = values.sort(sort).join(" ");
          if (value.value !== sortedValue) {
            context.report({
              node,
              messageId: "sortClassNamesAlphabetically",
              fix(fixer) {
                return fixer.replaceTextRange([value.range[0] + 1, value.range[1] - 1], sortedValue);
              }
            });
          }
        }
      }
    }

    function sort(a, b) {
      let [firstPartA, lastPartA] = getParts(a);
      let [firstPartB, lastPartB] = getParts(b);

      if ((firstPartA === lastPartA && firstPartB === lastPartB) || firstPartA === firstPartB) {
        return lastPartA < lastPartB ? -1 : 1;
      }

      if (firstPartA === lastPartA) {
        return -1;
      }

      if (firstPartB === lastPartB) {
        return 1;
      }

      if (modifiers.length === 0) {
        return firstPartA < firstPartB ? -1 : 1;
      }

      const modifiersA = firstPartA.split(":");
      const modifiersB = firstPartB.split(":");

      for (let index = 0; index < modifiersA.length; index += 1) {
        const modifierA = modifiersA[index];
        const modifierB = modifiersB[index];

        if (!modifierB) {
          return 1;
        }

        if (modifierA !== modifierB) {
          const indexA = modifierIndices.get(modifierA);
          const indexB = modifierIndices.get(modifierB);

          if (typeof indexA === "number" && typeof indexB === "number") {
            return indexA < indexB ? -1 : 1;
          }

          if (typeof indexA === "number") {
            return -1;
          }

          if (typeof indexB === "number") {
            return 1;
          }
        }
      }

      return -1;
    }

    function getParts(value) {
      const index = value.lastIndexOf(":");

      if (index === -1) {
        const part = value.startsWith("-") ? value.slice(1) : value;

        return [part, part];
      }

      const firstPart = value.slice(0, index);
      let lastPart = value.slice(index + 1);
      lastPart = lastPart.startsWith("-") ? lastPart.slice(1) : lastPart;

      return [firstPart, lastPart];
    }

    return {
      JSXAttribute(node) {
        if (node.name.name === "className") {
          if (node.value.type === "Literal") {
            lint(node, node.value);
          } else if (node.value.type === "JSXExpressionContainer") {
            node.value.expression.arguments?.forEach((argument) => {
              if (argument.type === "Literal") {
                lint(node, argument);
              } else if (argument.type === "LogicalExpression") {
                lint(node, argument.right);
              } else if (argument.type === "ObjectExpression") {
                argument.properties.filter((property) => property.key.value).forEach((property) => {
                  lint(node, property.key);
                });
              }
            });
          }
        }
      }
    };
  }
};
