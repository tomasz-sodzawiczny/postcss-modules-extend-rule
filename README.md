# postcss-modules-extend-rule [<img src="https://raw.githubusercontent.com/css-modules/logos/master/css-modules-logo.png" alt="CSS Modules Logo" width="120" height="120" align="right">][css modules]

[![License: MIT][mit-img]][mit-url]
[![NPM version][npm-img]][npm-url]
[![Build Status][build-img]][build-url]

[PostCSS] plugin for using `@extend` at-rule with [CSS Modules].

```pcss
.myClass {
  @extend .someClass from 'module';
}
```

This package is using [PostCSS Extend Rule] plugin internally - extending it's behaviour to work with CSS Modules easily.

## Motivation

> **TODO:** Describe why `composes` isn't enough.

## Installation

```sh
yarn add --dev postcss-modules-extend-rule
```

## Usage

This package consists of two PostCSS plugins. To use it, your setup must allow
both _pre-bundling_ and _post-bundling_ PostCSS processing. First, before the
CSS Modules bundling, all modules must be tranformed with
`postcss-modules-extend-rule/pre` plugin. Then, the final bundle must be
processed with `postcss-modules-extend-rule/post`.

> **TODO:** article on why it's needed

```js
const { pre, post } = require('postcss-modules-extend-rule');
// or
const pre = require('postcss-modules-extend-rule/pre'); // use me before bundling happens
const post = require('postcss-modules-extend-rule/post'); // use me on the final CSS bundle
```

#### With webpack

Pre-bundling and post-bundling processing can be implemented in webpack environment by combining [PostCSS Loader] and [PostCSSAssetsPlugin]:

```js
// in CSS loader chain
{
  loader: 'postcss-loader',
  options: {
    plugins: [require('postcss-modules-extend-rule/pre')]
  }
}
```

```js
// in plugins
new PostCSSAssetsPlugin({
  test: /\.css$/,
  plugins: [require('postcss-modules-extend-rule/post')],
});
```

Example working setup can be fun in our test [`webpack.config.js`][example-webpack-config].

> **TODO:** article with details and other setups (e.g. `style-loader`)

## Options

This package supports all [options from PostCSS Extend Rule][postcss-extend-rule-options]. Both `pre` and `post` plugins accept the same set of options.

```js
postcssModuleExtends.pre({ onFunctionalSelector: 'warn' });
```

## Caveats

### Functional selectors

[Functional selectors] (e.g. `%foo`) are not supported yet. Contributions are very welcome!

## License

[MIT](./LICENSE)

<!-- badges -->

[mit-img]: https://img.shields.io/badge/License-MIT-blue.svg
[mit-url]: https://opensource.org/licenses/MIT
[npm-img]: https://img.shields.io/npm/v/postcss-modules-extend-rule.svg
[npm-url]: https://www.npmjs.com/package/postcss-modules-extend-rule
[build-img]: https://img.shields.io/travis/tomasz-sodzawiczny/postcss-modules-extend-rule.svg
[build-url]: https://travis-ci.org/tomasz-sodzawiczny/postcss-modules-extend-rule

<!-- links -->

[postcss]: https://postcss.org/
[css modules]: https://github.com/css-modules/css-modules#readme
[icss]: https://github.com/css-modules/icss#readme
[webpack]: https://webpack.js.org/
[postcss extend rule]: https://github.com/jonathantneal/postcss-extend-rule
[postcss-extend-rule-options]: https://github.com/jonathantneal/postcss-extend-rule#options
[postcss loader]: https://github.com/postcss/postcss-loader
[postcssassetsplugin]: https://github.com/klimashkin/postcss-assets-webpack-plugin
[functional selectors]: https://jonathantneal.github.io/specs/css-extend-rule/#functional-selector
[example-webpack-config]: ./__test_project__/webpack.config.js
