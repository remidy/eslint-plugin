# Disallow duplicate class names in JSX (`@remidy/jsx-no-duplicate-class-names`)

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div className="gap-16 grid grid-cols-1 grid">...</div>

<input className={classNames("-m-1 p-8", leading && "-m-1 ml-0 pl-0", trailing && "mr-0 p-8 pr-0")} />

<input className={classNames("-m-1 p-8", { "-m-1 ml-0 pl-0": leading, "mr-0 p-8 pr-0": trailing })} />
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
"@remidy/jsx-no-duplicate-class-names": <enabled>
...
```
