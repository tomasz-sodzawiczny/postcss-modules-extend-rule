import extendClass from "../src/plugins/postcss-modules-extend-class";

const process = css => extendClass.process(css).css;

describe("postcss-modules-extend-class", () => {
  it("works", () => {
    const css = ".a { @postcss-modules-extend-class __some_class_name; }";

    expect(process(css)).toMatchSnapshot();
  });
});
