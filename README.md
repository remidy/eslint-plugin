# @remidy/eslint-plugin

ESLint rules to enforce consistent code.

## Installation

```sh
npm install @remidy/eslint-plugin --save-dev
```

Add "@remidy" to the plugins section of your configuration file.

```js
{
  plugins: [
    "@remidy"
  ]
}
```

Enable the rules that you would like to use.

## List of supported rules

| Name                                                                       | Description                              |
|----------------------------------------------------------------------------|------------------------------------------|
| [jsx-no-duplicate-class-names](docs/rules/jsx-no-duplicate-class-names.md) | Disallow duplicate class names in JSX    |
| [jsx-sort-class-names](docs/rules/jsx-sort-class-names.md)                 | Enforce class names alphabetical sorting |
