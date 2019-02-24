import chainPlugins from "postcss-plugin-chain";
import extendRule from "postcss-extend-rule";
import extendClass from "./plugins/postcss-modules-extend-class";

const plugin = chainPlugins("postcss-modules-extend-rule/pre", [
  extendClass,
  options => extendRule({ ...options, name: options.extendRuleName })
]);

export default plugin;
