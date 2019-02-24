const postcss = require('postcss');

const extendClassRuleName = 'extend-class';
const extendRuleName = 'extend';

const plugin = postcss.plugin('postcss-modules-extend-class', () => root => {
  root.walkAtRules(atRule => {
    if (atRule.name === extendClassRuleName) {
      const classname = `.${atRule.params}`;
      atRule.replaceWith(
        postcss.atRule({ name: extendRuleName, params: classname })
      );
    }
  });
});

module.exports = plugin;
