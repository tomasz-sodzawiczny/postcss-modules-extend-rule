const postcss = require('postcss');

const extendClassRuleName = 'extend-class';

const getImportAs = function(original) {
  const randomString = Math.random()
    .toString(36)
    .substring(2);
  return `__extends_from_${original}_${randomString}`;
};

const plugin = postcss.plugin(
  'postcss-modules-extend-from',
  () => (root, result) => {
    root.walkAtRules(atRule => {
      if (atRule.name === 'extend') {
        const match = atRule.params.match(/\s*\.(\S+)\s+from\s+(.+)\s*/);
        if (match) {
          const importWhat = match[1];
          const importAs = getImportAs(importWhat);
          const importFrom = match[2];

          root.prepend(
            postcss
              .rule({ selector: ':import(' + importFrom + ')' })
              .prepend(postcss.decl({ prop: importAs, value: importWhat }))
          );
          atRule.replaceWith(
            postcss.atRule({ name: extendClassRuleName, params: importAs })
          );
        } else {
          const errorMatch = atRule.params.match(/\s*(\S+)\s+from\s+(.+)\s*/);
          if (errorMatch) {
            const importWhat = errorMatch[1];

            if (importWhat[0] === '%') {
              // TODO: support functional selectors https://jonathantneal.github.io/specs/css-extend-rule/#functional-selector
              atRule.warn(
                result,
                '@extends from syntax can only be used with CSS classes - functional selectors (e.g. %foo) are not supported yet',
                { word: importWhat }
              );
            } else {
              atRule.warn(
                result,
                '@extends from syntax can only be used with CSS classes',
                { word: importWhat }
              );
            }
          }
        }
      }
    });
  }
);

module.exports = plugin;
