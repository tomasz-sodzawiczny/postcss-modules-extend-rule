⚠ Work in progress! ⚠

# PostCSS Modules Extend Rule

To be used with [`postcss-extend-class`](../postcss-extend-class)

#### In

```css
.foo {
  @extend .some-class from 'some-module';
}
```

#### Out

```css
:import('some-module') {
  __extends_from_0_some-class: some-class;
}
.foo {
  @extend-class __extends_from_0_some-class;
}
```
