const postcss = require('postcss');

const plugin = postcss.plugin('postcss-modules-extend-class', () => root => {
  root.walkAtRules(atRule => {
    if (atRule.name === 'extend-class') {
      // TODO sanity checks
      const classname = `.${atRule.params}`;
      atRule.replaceWith(postcss.atRule({ name: 'extend', params: classname }));
    }
  });
});

module.exports = plugin;
