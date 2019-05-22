// https://webpack.js.org/api/loaders/

async function linkparser(callback, source, map, meta) {
  const lines = source.split('\n').map(l => l.trim());
  const outLines = [];
  lines.forEach((line) => {
    // const splits = line.split('[[');
    // splits.forEach((split) => {
    const links = line.split(/(\[\[[^\]]*\]\]\(\([^)]*\)\))/g);
    const newLine = [];
    links.forEach((link, index) => {
      if (index % 2 === 0) {
        newLine.push(link);
        return;
      }
      const label = link.slice(2).replace(/\]\].*/, '');
      const [method, parameters, color] = link.replace(/^.*\(\(/, '').slice(0, -2).split(',');
      let parametersToUse = parameters;
      if (parametersToUse == null) {
        parametersToUse = '';
      }
      console.log(label);
      console.log(parameters);
      newLine.push(`<html><a href="javascript:window.lessonFunctions.${method}(${parametersToUse});" style="color:${color};">${label}</a></html>`);
    });
    // const newLine = links.join();
    outLines.push(newLine.join(''));
  });
  console.log(outLines)
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
  callback(null, outLines.join('\n'), map, meta);
}

// eslint-disable-next-line func-names
module.exports = function (source, map, meta) {
  let callback = (a, b) => {
    console.log(b);
  };
  if (this.async != null) {
    callback = this.async();
  }
  linkparser(callback, source, map, meta);
};
