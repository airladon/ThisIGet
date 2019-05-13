// module.exports = async function tester(source) {
//   const mjAPI = require("mathjax-node");
//   mjAPI.config({
//     MathJax: {
//       // traditional MathJax configuration
//     },
//   });
//   mjAPI.start();

//   const yourMath = 'E = mc^2';
//   let output = 'Hello there';
//   // await mjAPI.typeset({
//   //   math: yourMath,
//   //   format: 'TeX', // or "inline-TeX", "MathML"
//   //   mml: true,      // or svg:true, or html:true
//   // }, (data) => {
//   //   if (!data.errors) {
//   //     console.log('asd')
//   //     // console.log(data);
//   //     // console.log(output)
//   //     output = data;
//   //     // console.log(output)
//   //   }
//   // });
//   const p = mjAPI.typeset({
//     math: yourMath,
//     format: 'TeX', // or "inline-TeX", "MathML"
//     svg: true,      // or svg:true, or html:true
//   });
//   await p.then((data) => {
//     output = data;
//     console.log(data);
//   });
//   return output;
// }

module.exports = async function tester(callback, source, map, meta) {
  const mjAPI = require("mathjax-node");
  mjAPI.config({
    MathJax: {
      // traditional MathJax configuration
    },
  });
  mjAPI.start();
  const lines = source.split('\n').map((l) => l.trim());
  // console.log(lines)
  const outLines = [];
  for ([i, line] of lines.entries()) {
  // for ([i, line] of lines.entries()) {
    // console.log(i, line)
    const split = line.split('$$');
    if (split.length === 1) {
      outLines.push(line);
      continue;
    }
    const inlineStart = '<span style="display:inline-block;"><html>';
    const inlineEnd = '</html></span>';
    for ([index, text] of split.entries()) {
      if (index % 2 === 0) {
        continue;
      }
      await mjAPI.typeset({
        math: text,
        format: 'TeX', // or "inline-TeX", "MathML"
        svg: true,      // or svg:true, or html:true
      }).then((data) => {
        split[index] = `${inlineStart}${data.svg}${inlineEnd}`;
      });
    };
    // console.log(split)
    const combined = split.join('');
    // console.log(combined)
    // lines[i] = combined;
    outLines.push(combined)
  };
  // console.log(outLines)
  callback(null, outLines.join('\n'), map, meta);
}





// module.exports = function tester(source) {
//   const mjAPI = require("mathjax-node");
//   mjAPI.config({
//     MathJax: {
//       // traditional MathJax configuration
//     },
//   });
//   mjAPI.start();

//   const yourMath = 'E = mc^2';
//   let output = 'Hello there';
//   let flag = false;
//   // await mjAPI.typeset({
//   //   math: yourMath,
//   //   format: 'TeX', // or "inline-TeX", "MathML"
//   //   mml: true,      // or svg:true, or html:true
//   // }, (data) => {
//   //   if (!data.errors) {
//   //     console.log('asd')
//   //     // console.log(data);
//   //     // console.log(output)
//   //     output = data;
//   //     // console.log(output)
//   //   }
//   // });
//   const p = mjAPI.typeset({
//     math: yourMath,
//     format: 'TeX', // or "inline-TeX", "MathML"
//     svg: true,      // or svg:true, or html:true
//   }, function(data) {
//     output = data;
//     flag = true;
//     console.log('asdf');
//   });
//   // while(flag === false) {
//   // };
//   return output;
// }

