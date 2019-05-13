module.exports = async function tester(source) {
  const mjAPI = require("mathjax-node");
  mjAPI.config({
    MathJax: {
      // traditional MathJax configuration
    },
  });
  mjAPI.start();

  const yourMath = 'E = mc^2';
  let output = 'Hello there';
  // await mjAPI.typeset({
  //   math: yourMath,
  //   format: 'TeX', // or "inline-TeX", "MathML"
  //   mml: true,      // or svg:true, or html:true
  // }, (data) => {
  //   if (!data.errors) {
  //     console.log('asd')
  //     // console.log(data);
  //     // console.log(output)
  //     output = data;
  //     // console.log(output)
  //   }
  // });
  const p = mjAPI.typeset({
    math: yourMath,
    format: 'TeX', // or "inline-TeX", "MathML"
    svg: true,      // or svg:true, or html:true
  });
  await p.then((data) => {
    output = data;
    console.log(data);
  });
  return output;
}

