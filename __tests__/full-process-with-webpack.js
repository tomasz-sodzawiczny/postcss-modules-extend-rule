import fs from "fs";
import path from "path";

describe("postcss-modules-extends-rule", () => {
  it("works in full webpack process", () => {
    expect(
      fs.readFileSync(
        path.resolve(__dirname, "../__test_project__/dist/main.css"),
        {
          encoding: "utf8"
        }
      )
    ).toMatchSnapshot();
  });
});
