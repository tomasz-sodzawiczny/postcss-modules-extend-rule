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

    const imports = {};

    root.walkAtRules(atRule => {
      if (atRule.name === extendRuleName) {
        const match = atRule.params.match(/\s*\.(\S+)\s+from\s+(.+)\s*/);
        if (match) {
          const importWhat = match[1];
          const importFrom = match[2];

          if (!imports[importFrom]) {
            imports[importFrom] = {};
          }
          if (!imports[importFrom][importWhat]) {
            imports[importFrom][importWhat] = getImportAs(importWhat);
          }
          const importAs = imports[importFrom][importWhat];

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

    // Based on https://github.com/css-modules/icss-utils/blob/2bfed2e97ee5409a6c0c0a36b298a078b11988e8/src/createICSSRules.js#L3
    // Some changes made to make it more suitable to work with in this case.
    const importRules = Object.keys(imports).map(path => {
      const aliases = imports[path];

      const declarations = Object.keys(aliases).map(value =>
        postcss.decl({
          prop: aliases[value],
          value,
          // compat: raws added not to break icss-utils versions <=4.0.0
          raws: { before: "\n  " }
        })
      );

      return postcss
        .rule({
          selector: `:import(${path})`,
          raws: { after: "\n" }
        })
        .append(declarations);
    });
    root.prepend(importRules);
  }
);

export default plugin;
