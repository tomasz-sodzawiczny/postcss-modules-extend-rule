import babel from "rollup-plugin-babel";

const shared = {
  external: ["postcss", "postcss-extend-rule", "postcss-plugin-chain"],
  plugins: [babel({ exclude: "node_modules/**" })]
};

const index = {
  ...shared,
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "cjs"
  }
};
const pre = {
  ...shared,
  input: "src/pre.js",
  output: {
    file: "pre.js",
    format: "cjs"
  }
};
const post = {
  ...shared,
  input: "src/post.js",
  output: {
    file: "post.js",
    format: "cjs"
  }
};

export default [index, pre, post];
