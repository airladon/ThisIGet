//https://webpack.js.org/api/loaders/

async function mathparser(callback, source, map, meta) {
  if (source.match('$$') == null) {
    callback(null, source, map, meta);
    return;
  }
  const mjAPI = require("mathjax-node");
  mjAPI.config({
    MathJax: {
      extensions: 'TeX/color.js',
      // traditional MathJax configuration
    },
  });
  mjAPI.start();
  const lines = source.split('\n').map((l) => l.trim());
  const outLines = [];
  for ([i, line] of lines.entries()) {
    const split = line.split('$$');
    if (split.length === 1) {
      outLines.push(line);
      continue;
    }
    const inlineStart = '';
    const inlineEnd = '';
    for ([index, text] of split.entries()) {
      if (index % 2 === 0) {
        continue;
      }
      await mjAPI.typeset({
        math: text,
        format: 'TeX', // or "inline-TeX", "MathML"
        svg: true,      // or svg:true, or html:true
        // equationNumbers: 'AMS',
      }).then((data) => {
        if (data.errors) {
          split[index] = `Data Errors ${data.errors}`;
        } else {
          split[index] = `${inlineStart}${data.svg}${inlineEnd}`;
        }
      }).catch((err) => {
        split[index] = 'Error ${err}';
      });
    };
    const combined = split.join('');
    outLines.push(combined)
  };
  callback(null, outLines.join('\n'), map, meta);
}

module.exports = function(source, map, meta) {
  const callback = this.async();
  mathparser(callback, source, map, meta)
};
