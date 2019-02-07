⚠ Work in progress! ⚠

# PostCSS Modules Extend Rule

To be used with [`postcss-modules-extend-from`](../postcss-modules-extend-from)

#### In

```css
.foo {
  /* notice no dot before the class name */
  @extend-class some-class;
}
```

#### Out

```css
.foo {
  @extend .some-class;
}
```
