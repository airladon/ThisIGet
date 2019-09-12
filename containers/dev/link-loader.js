// https://webpack.js.org/api/loaders/

// This loader looks for [[label]]((method,parameter,color)) strings
// and replaces them with <a> links
async function linkparser(callback, source, map, meta) {
  const lines = source.split('\n').map(l => l.trim());
  const outLines = [];
  let counter = Math.floor(Math.random() * 1000000000);
  lines.forEach((line) => {
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
      // console.log(label);
      // console.log(parameters);
      const id = `id__topic__simple_qr__link_${counter}`;
      counter += 1;
      newLine.push(`<html><a href="javascript:window.topicFunctions.${method}('${id}',${parametersToUse});" style="color:${color};font-weight: 800;" id="${id}" class="topic__qr_action_word">${label}</a></html>`);
    });
    outLines.push(newLine.join(''));
  });
  // console.log(outLines);
  callback(null, outLines.join('\n'), map, meta);
}

// eslint-disable-next-line func-names
module.exports = function (source, map, meta) {
  let callback = (a, b) => {
    // eslint-disable-next-line no-console
    console.log(b);
  };
  if (this.async != null) {
    callback = this.async();
  }
  linkparser(callback, source, map, meta);
};
