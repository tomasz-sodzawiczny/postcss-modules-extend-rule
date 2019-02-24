import chainPlugins from "postcss-plugin-chain";
import extendRule from "postcss-extend-rule";
import extendFrom from "./plugins/postcss-modules-extend-from";

const plugin = chainPlugins("postcss-modules-extend-rule/pre", [
  extendFrom,
  options => extendRule({ ...options, name: options && options.extendRuleName })
]);

export default plugin;
