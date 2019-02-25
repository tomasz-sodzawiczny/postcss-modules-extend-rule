import pre from "../src/pre";

const process = css =>
  pre.process(css, { from: undefined }).then(result => result.css);

describe("pre", () => {
  it("works with both extends and extends-from syntaxes", async () => {
    const css =
      ".blue {color: blue} .a { @extend .blue; } .b { @extend .red from 'red' }";

    expect(await process(css)).toMatchSnapshot();
  });
});
