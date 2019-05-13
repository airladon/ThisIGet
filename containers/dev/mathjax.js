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

  // console.log(split)
  await mjpage(source, {
    format: 'inline-TeX', // or "inline-TeX", "MathML"
    output: 'svg',
  }, {
    svg: true,      // or svg:true, or html:true
  }, callback);
  // for ([index, text] of split.entries()) {
  //   console.log(index, text)
  //   if (index % 2 === 0) {
  //     continue;
  //   }
    
  //   await mjAPI.typeset({
  //     math: text,
  //     format: 'TeX', // or "inline-TeX", "MathML"
  //     svg: true,      // or svg:true, or html:true
  //   }).then((data) => {
  //     split[index] = data.svg;
  //     // tempCallback()
  //     console.log(index);
  //   });
  //   console.log('done')
  // };
  // const combined = split.join('');
  // console.log('returning')
  // callback(null, combined, map, meta);
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

