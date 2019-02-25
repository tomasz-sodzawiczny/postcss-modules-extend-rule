import extendFrom from "../src/plugins/postcss-modules-extend-from";

const process = css => extendFrom.process(css).css;

describe("postcss-modules-extend-from", () => {
  it("works with a single extend", () => {
    const css = ".a { @extend .red from 'colors'; }";

    expect(process(css)).toMatchSnapshot();
  });

  it("works with multiple classes extending single class", () => {
    const css =
      ".a { @extend .red from 'colors'; } .b { @extend .red from 'colors'; }";

    expect(process(css)).toMatchSnapshot();
  });

  it("works with multiple classes extending multiple classes from one file", () => {
    const css =
      ".a { @extend .red from 'colors'; } .b { @extend .blue from 'colors'; }";

    expect(process(css)).toMatchSnapshot();
  });

  it("works with extending classes from multiple files", () => {
    const css = ".a { @extend .red from 'red'; @extend .blue from 'blue';}";

    expect(process(css)).toMatchSnapshot();
  });
});
