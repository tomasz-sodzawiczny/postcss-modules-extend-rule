import postcss from "postcss";
import { extendClassTemporaryRuleName, defaultExtendRuleName } from "./shared";

let nextId = 0;
const getImportAs = original => {
  nextId += 1;
  return `__extends_from_${nextId}__${original}`;
};

const plugin = postcss.plugin(
  "postcss-modules-extend-from",
  options => (root, result) => {
    const extendRuleName =
      (options && options.extendRuleName) || defaultExtendRuleName;

    root.walkAtRules(atRule => {
      if (atRule.name === extendRuleName) {
        const match = atRule.params.match(/\s*\.(\S+)\s+from\s+(.+)\s*/);
        if (match) {
          const importWhat = match[1];
          const importAs = getImportAs(importWhat);
          const importFrom = match[2];

          root.prepend(
            postcss
              .rule({ selector: `:import(${importFrom})` })
              .prepend(postcss.decl({ prop: importAs, value: importWhat }))
          );
          atRule.replaceWith(
            postcss.atRule({
              name: extendClassTemporaryRuleName,
              params: importAs
            })
          );
        } else {
          const errorMatch = atRule.params.match(/\s*(\S+)\s+from\s+(.+)\s*/);
          if (errorMatch) {
            const importWhat = errorMatch[1];

            if (importWhat[0] === "%") {
              // TODO: support functional selectors https://jonathantneal.github.io/specs/css-extend-rule/#functional-selector
              atRule.warn(
                result,
                "@extends from syntax can only be used with CSS classes - functional selectors (e.g. %foo) are not supported yet",
                { word: importWhat }
              );
            } else {
              atRule.warn(
                result,
                "@extends from syntax can only be used with CSS classes",
                { word: importWhat }
              );
            }
          }
        }
      }
    });
  }
);

export default plugin;
