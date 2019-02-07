const postcss = require('postcss');

let seqNo = -1;
const getImportAs = function(original) {
  seqNo++;
  return '__extends_from_' + seqNo + '_' + original;
};
const plugin = postcss.plugin('postcss-modules-extend-from', () => root => {
  root.walkAtRules(atRule => {
    if (atRule.name === 'extend') {
      const match = atRule.params.match(/\s*.(\S+)\s+from\s+(.+)\s*/);
      if (match) {
        // TODO sanity checks
        const importWhat = match[1];
        const importAs = getImportAs(importWhat);
        const importFrom = match[2];

        root.prepend(
          postcss
            .rule({ selector: ':import(' + importFrom + ')' })
            .prepend(postcss.decl({ prop: importAs, value: importWhat }))
        );
        atRule.replaceWith(
          postcss.atRule({ name: 'extend-class', params: importAs })
        );
      }
    }
  });
});

module.exports = plugin;
