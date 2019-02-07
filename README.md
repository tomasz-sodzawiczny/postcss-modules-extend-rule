⚠ Work in progress! ⚠

# PostCSS Modules Extend Rule

[PostCSS](https://postcss.org/) plugin for using extend at-rule with CSS Modules.

```css
.foo {
  @extends .someClass from 'some-file';
}
```

## Installation

```sh
yarn add --dev postcss-modules-extend-from postcss-modules-extend-class postcss-extend-rule
```

## Usage

See [example webpack config](./packages/test/webpack.config.js)

Before CSS loader:

- `postcss-modules-extend-from`
- `postcss-extend-rule` (local extends)

After CSS loader:

- `postcss-modules-extend-class`
- `postcss-extend-rule` (imported extends)
