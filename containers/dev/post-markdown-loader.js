// https://webpack.js.org/api/loaders/

function parseHints(source) {
  const re = /<hint>([\s\S]*?)<\/hint>/;
  let out = source;
  let match = re.exec(out);
  while (match != null) {
    const { index } = match;
    const [str, content] = match;
    const m = content.match(/\[([^\]]*)\](.*)/);
    let hint = '';
    let label = 'Hint';
    if (m != null) {
      [, label, hint] = m;
    } else {
      hint = content;
    }
    const replacement = `<div class="simple__hint">
    <div class="simple__hint_label">
      ${label} 
    </div>
    <div class="simple__hint_contents simple__hint_hidden">
      ${hint}
    </div>
  </div>`;
    out = `${out.substring(0, index)}${replacement}${out.substring(index + str.length)}`;
    match = re.exec(out);
  }
  return out;
}

function parseLowHints(source) {
  const re = /<hintLow>([\s\S]*?)<\/hintLow>/;
  let out = source;
  let match = re.exec(out);
  while (match != null) {
    const { index } = match;
    const [str, content] = match;
    const m = content.match(/\[([^\]]*)\]([\s\S]*)/);
    let hint = '';
    let label = 'Hint';
    if (m != null) {
      [, label, hint] = m;
    } else {
      hint = content;
    }
    const replacement = `<div class="simple__hint_low">
    <div class="simple__hint_label_low">
      ${label} 
    </div>
    <div class="simple__hint_contents_low simple__hint_hidden">
      ${hint}
    </div>
  </div>`;
    out = `${out.substring(0, index)}${replacement}${out.substring(index + str.length)}`;
    match = re.exec(out);
  }
  return out;
}

function parseLinks(source) {
  const re = /\[([^[][^\]]*)\]\(([^)]*)\)/;
  let out = source;
  let match = re.exec(out);
  while (match != null) {
    const { index } = match;
    const [str, label, link] = match;
    const replacement = `
  <a class="topic__link" href=${link}">
    ${label}
  </a>`;
    out = `${out.substring(0, index)}${replacement}${out.substring(index + str.length)}`;
    match = re.exec(out);
  }
  return out;
}

// This loader looks for [[label]]((method,parameter,color)) strings
// and replaces them with <a> links
async function quizparser(callback, source, map, meta) {
  let out = source;
  out = parseHints(out);
  out = parseLowHints(out);
  out = parseLinks(out);
  callback(null, out, map, meta);
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
  quizparser(callback, source, map, meta);
};
