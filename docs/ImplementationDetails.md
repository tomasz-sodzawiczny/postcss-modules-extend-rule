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

# PostCSS Modules Extend Rule

To be used with [`postcss-modules-extend-class`](../postcss-modules-extend-class)

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
