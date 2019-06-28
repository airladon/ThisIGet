//https://webpack.js.org/api/loaders/

async function mathparser(callback, source, map, meta) {
  // callback(null, source, map, meta);
  // return;
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
  // mjAPI.start();

  let newSource = `${source}`;
  let m = newSource.match(/\$\$((?!\$\$).)*\$\$/);
  while (m != null) {
    const text = m[0].split('$$')[1];
    let svg = '';
    // eslint-disable-next-line no-await-in-loop
    await mjAPI.typeset({
      math: text,
      format: 'TeX', // or "inline-TeX", "MathML"
      svg: true,      // or svg:true, or html:true
      // extensions: 'color.js'
    }).then((data) => {
      if (data.errors) {
        svg = `Error ${data.errors}`;
      } else {
        svg = `${data.svg}`;
      }
    }).catch((err) => {
      svg = '<<err>>';
    });
    newSource = `${newSource.slice(0, m.index)}${svg}${newSource.slice(m.index + m[0].length)}`;
    m = newSource.match(/\$\$((?!\$\$).)*\$\$/);
  }
  callback(null, newSource, map, meta);

  // const lines = source.split('\n').map((l) => l.trim());
  // const outLines = [];
  // for ([i, line] of lines.entries()) {
  //   const split = line.split('$$');
  //   if (split.length === 1) {
  //     outLines.push(line);
  //     continue;
  //   }
  //   const inlineStart = '';
  //   const inlineEnd = '';
  //   for ([index, text] of split.entries()) {
  //     if (index % 2 === 0) {
  //       continue;
  //     }
  //     await mjAPI.typeset({
  //       math: text,
  //       format: 'TeX', // or "inline-TeX", "MathML"
  //       svg: true,      // or svg:true, or html:true
  //       // equationNumbers: 'AMS',
  //     }).then((data) => {
  //       if (data.errors) {
  //         split[index] = `Data Errors ${data.errors}`;
  //       } else {
  //         split[index] = `${inlineStart}${data.svg}${inlineEnd}`;
  //       }
  //     }).catch((err) => {
  //       split[index] = 'Error ${err}';
  //     });
  //   };
  //   const combined = split.join('');
  //   outLines.push(combined)
  // };
  // callback(null, outLines.join('\n'), map, meta);
}

module.exports = function(source, map, meta) {
  const callback = this.async();
  mathparser(callback, source, map, meta)
};
