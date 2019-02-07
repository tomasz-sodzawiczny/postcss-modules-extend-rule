# PostCSS Modules Extend Rule

[PostCSS] plugin for using extend at-rule with CSS Modules.

```css
.foo {
  @extends .someClass from 'some-file';
}
```

## Usage

See [example webpack config](./packages/test/webpack.config.js)

Before CSS loader:

- `postcss-modules-extend-from`
- `postcss-extend-rule` (local extends)

After CSS loader:

- `postcss-extend-class`
- `postcss-extend-rule` (imported extends)
