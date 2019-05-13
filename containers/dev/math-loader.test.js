const mathloader = require('./mathjax.js');

const callback = (a, b, c, d) => {
  console.log(b);
}

const c = async () => {
  const a = 'asdf';
  await mathloader(callback, 'This is a $$mc ^ 2$$ so there');
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




