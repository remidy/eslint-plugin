# Enforce class names alphabetical sorting (`@remidy/jsx-sort-class-names`)

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/use/command-line-interface#--fix).

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div className="grid grid-cols-1 gap-16">...</div>
```

Examples of **correct** code for this rule:

```jsx
<div className="gap-16 grid grid-cols-1">...</div>

<input className={classNames("-m-1 p-8", leading && "ml-0 pl-0", trailing && "mr-0 pr-0")} />

<input className={classNames("-m-1 p-8", { "ml-0 pl-0": leading, "mr-0 pr-0": trailing })} />
```

## Rule Options

```js
...
"@remidy/jsx-sort-class-names": [<enabled>, { modifiers: <modifiers> }]
...
```

### `modifiers`

Optional array of strings.

```jsx
// "@remidy/jsx-sort-class-names": ["error", { modifiers: ["md", "lg"] }]

<div className="gap-16 grid grid-cols-1 md:gap-24 md:grid-cols-2 lg:gap-32 lg:grid-cols-3">...</div>
```
