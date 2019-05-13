const mathloader = require('./mathjax.js');

const callback = (a, b, c, d) => {
  console.log('done')
  console.log(a, b, c, d);
}

const c = async () => {
  const a = 'asdf';
  await mathloader(callback, '"When $$a \\ne 0$$, there are two solutions to $$(ax^2 + bx + c = 0)$$ and they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"');
};

c();

// async function tester(callback, source, map, meta) {
//   const mjAPI = require("mathjax-node");
//   mjAPI.config({
//     MathJax: {
//       // traditional MathJax configuration
//     },
//   });
//   mjAPI.start();

//   const split = source.split('$$');
//   if (split.length === 1) {
//     callback(null, source, map, meta);
//     return;
//   }
//   split.forEach((text, index) => {
//     if (index % 2 === 0) {
//       return;
//     }
//     await mjAPI.typeset({
//       math: yourMath,
//       format: 'TeX', // or "inline-TeX", "MathML"
//       svg: true,      // or svg:true, or html:true
//     }).then((data) => {
//       split[index] = data.svg;
//     });
//   });
  
//   const combined = split.join('');
//   callback(null, combined, map, meta);
// }

// const b = tester('asdf');
// console.log(b);

// a = 'This is a test $$e^2$$ and here $$we go$$ again';
// tester(a);




