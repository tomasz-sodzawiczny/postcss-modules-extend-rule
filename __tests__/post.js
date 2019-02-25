import post from "../src/post";

const process = css =>
  post.process(css, { from: undefined }).then(result => result.css);

describe("postcss-modules-extends-rule/post", () => {
  it("works", async () => {
    const css =
      ".blue {color: blue} .a { @postcss-modules-extend-class blue; }";

    expect(await process(css)).toMatchSnapshot();
  });
});
