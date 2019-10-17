// Copy and past the async function mathparser from math-loader to below
// (don't overwrite the module.exports = )
// Then run math-loader-tester.js to test.

// This is not a good way to test, but was fast for development and needs to
// be moved to jest in future.
module.exports = async function mathparser(callback, source, map, meta) {
  const mjAPI = require("mathjax-node");
  mjAPI.config({
    MathJax: {
      extensions: 'TeX/color.js',
      // traditional MathJax configuration
    },
  });
  mjAPI.start();

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
  //   console.log(split)
  //   for ([index, text] of split.entries()) {
  //     if (index % 2 === 0) {
  //       continue;
  //     }
  //     await mjAPI.typeset({
  //       math: text,
  //       format: 'TeX', // or "inline-TeX", "MathML"
  //       svg: true,      // or svg:true, or html:true
  //       extensions: 'color.js'
  //     }).then((data) => {
  //       if (data.errors) {
  //         split[index] = `Error ${data.errors}`;
  //       } else {
  //         split[index] = `${inlineStart}${data.svg}${inlineEnd}`;
  //       }
  //     }).catch((err) => {
  //       split[index] = 'err';
  //     });
  //   };
  //   const combined = split.join('');
  //   outLines.push(combined)
  // };
  // callback(null, outLines.join('\n'), map, meta);
  callback(null, newSource, map, meta);
};
