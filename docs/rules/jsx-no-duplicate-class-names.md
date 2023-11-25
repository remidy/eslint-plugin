# Disallow duplicate class names in JSX (`@remidy/jsx-no-duplicate-class-names`)

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div className="gap-16 grid grid-cols-1 grid">...</div>
```

Examples of **correct** code for this rule:

```jsx
<div className="gap-16 grid grid-cols-1">...</div>
```

## Rule Options

```js
...
"@remidy/jsx-no-duplicate-class-names": <enabled>
...
```
