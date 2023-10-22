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
      const values = value.value.split(" ");
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

      const firstPartsA = firstPartA.split(":");
      const firstPartsB = firstPartB.split(":");

      for (let index = 0; index < firstPartsA.length; index += 1) {
        if (!firstPartsB[index]) {
          return 1;
        }

        if (firstPartsA[index] !== firstPartsB[index]) {
          return modifierIndices.get(firstPartsA[index]) < modifierIndices.get(firstPartsB[index]) ? -1 : 1;
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
