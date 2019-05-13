//https://webpack.js.org/api/loaders/

// async function tester(callback, source, map, meta) {
//   const mjAPI = require("mathjax-node");
//   mjAPI.config({
//     MathJax: {
//       // traditional MathJax configuration
//     },
//   });
//   mjAPI.start();

//   const yourMath = 'E = mc^2';
//   mjAPI.typeset({
//     math: yourMath,
//     format: 'TeX', // or "inline-TeX", "MathML"
//     svg: true,      // or svg:true, or html:true
//   }, (data) => {
//     callback(null, data.svg, map, meta)
//   });
// }


async function tester(callback, source, map, meta) {
  const mjAPI = require("mathjax-node");
  mjAPI.config({
    MathJax: {
      // traditional MathJax configuration
    },
  });
  mjAPI.start();
  const split = source.split('$$');
  if (split.length === 1) {
    callback(null, source, map, meta);
    return;
  }

  for ([index, text] of split.entries()) {
    if (index % 2 === 0) {
      continue;
    }
    
    await mjAPI.typeset({
      math: text,
      format: 'TeX', // or "inline-TeX", "MathML"
      svg: true,      // or svg:true, or html:true
    }).then((data) => {
      split[index] = data.svg;
    });
  };
  const combined = split.join('');

  const inlineSplit = combined.split('%%');
  if (inlineSplit.length === 1) {
    callback(null, combined, map, meta);
    return;
  }

  for ([index, text] of inlineSplit.entries()) {
    if (index % 2 === 0) {
      continue;
    }
    
    await mjAPI.typeset({
      math: text,
      format: 'inline-TeX', // or "inline-TeX", "MathML"
      svg: true,      // or svg:true, or html:true
    }).then((data) => {
      inlineSplit[index] = data.svg;
    });
  };
  const inlineCombined = inlineSplit.join('');

  callback(null, inlineCombined, map, meta);
}

module.exports = function(source, map, meta) {
  const callback = this.async();
  tester(callback, source, map, meta)
};
