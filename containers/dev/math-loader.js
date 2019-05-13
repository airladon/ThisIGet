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
  const mjpage = require("mathjax-node-page").mjpage;
  // mjAPI.config({
  //   MathJax: {
  //     // traditional MathJax configuration
  //   },
  // });
  // mjAPI.start();
  // const split = source.split('$$');
  // if (split.length === 1) {
  //   callback(null, source, map, meta);
  //   return;
  // }
  // const count = Math.floor(split.length / 2);
  const done = (a) => {
    callback(null, a, map, meta);
  }
  // console.log(split)
  await mjpage(source, {
    format: 'inline-TeX', // or "inline-TeX", "MathML"
    output: 'svg',
  }, {
    svg: true,      // or svg:true, or html:true
  }, done);
}

module.exports = function(source, map, meta) {
  const callback = this.async();
  tester(callback, source, map, meta)
};
