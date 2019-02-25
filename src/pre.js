import chainPlugins from "postcss-plugin-chain";
import extendRule from "postcss-extend-rule";
import extendFrom from "./plugins/postcss-modules-extend-from";

const plugin = chainPlugins("postcss-modules-extend-rule/pre", [
  extendFrom,
  extendRule
]);

export default plugin;
