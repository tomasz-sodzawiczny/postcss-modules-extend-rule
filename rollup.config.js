import babel from "rollup-plugin-babel";

const shared = {
  external: ["postcss", "postcss-extend-rule", "postcss-plugin-chain"],
  plugins: [babel({ exclude: "node_modules/**" })]
};

const index = Object.assign({
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "cjs"
  }
});
const pre = Object.assign(
  {
    input: "src/pre.js",
    output: {
      file: "pre.js",
      format: "cjs"
    }
  },
  shared
);
const post = Object.assign(
  {
    input: "src/post.js",
    output: {
      file: "post.js",
      format: "cjs"
    }
  },
  shared
);
export default [index, pre, post];
