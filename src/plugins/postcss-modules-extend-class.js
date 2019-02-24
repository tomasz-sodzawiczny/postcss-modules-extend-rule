import postcss from "postcss";
import { extendClassTemporaryRuleName, defaultExtendRuleName } from "./shared";

const plugin = postcss.plugin(
  "postcss-modules-extend-class",
  options => root => {
    const extendRuleName =
      (options && options.extendRuleName) || defaultExtendRuleName;

    root.walkAtRules(atRule => {
      if (atRule.name === extendClassTemporaryRuleName) {
        const classname = `.${atRule.params}`;
        atRule.replaceWith(
          postcss.atRule({ name: extendRuleName, params: classname })
        );
      }
    });
  }
);

export default plugin;
