// https://webpack.js.org/api/loaders/

function convertMultiChoice(str, name, options) {
  const lines = str.trim().split('\n').map(l => l.trim());
  let out = `
<html>
<div class="topic__multiple_choice" ${options}>`;
  lines.forEach((line) => {
    const value = line.charAt(0) === '+' ? 'correct' : 'incorrect';
    const html = `
  <div class="approach__quiz_selection">
    <div class="approach__quiz__radio_mark"></div>
    <div class="approach__quiz__radio_button">
      <input type="radio" name="${name}" value="${value}">
      ${line.slice(1).trim()}
    </div>
  </div>`;
    out = `${out}${html}`;
  });
  out = `${out}
  <div class="approach__quiz__submit">
    <button class="approach__quiz__submit_button approach__quiz__multichoice_submit_button">Check</button>
  </div>
</div>
</html>
`;
  return out;
}

function convertEntry(contents, entryType, options) {
  let answerType = 'approach__quiz__answer__type_string';
  let filter = 'function() {return true;}';
  let inputType = 'text';
  if (entryType === 'string' || entryType === '') {
    answerType = 'approach__quiz__answer__type_string';
  } else if (entryType === 'integer') {
    answerType = 'approach__quiz__answer__type_integer';
    filter = 'return function isNumberKey(evt){var charCode=(evt.which)?evt.which:event.keyCode;if(charCode>31&&(charCode<48||charCode>57)){return false;}return true;}(event)';
    inputType = 'number';
  } else if (entryType === 'number') {
    answerType = 'approach__quiz__answer__type_number';
    filter = 'return function isNumberKey(evt){var charCode=(evt.which)?evt.which:event.keyCode;if(charCode>31&&(charCode!=46&&(charCode<48||charCode>57))){return false;}return true;}(event)';
    inputType = 'number';
  } else {
    const decimals = parseInt(entryType, 10);
    if (!Number.isNaN(decimals)) {
      answerType = `approach__quiz__answer__type_${decimals}`;
    }
    filter = 'return function isNumberKey(evt){var charCode=(evt.which)?evt.which:event.keyCode;if(charCode>31&&(charCode!=46&&(charCode<48||charCode>57))){return false;}return true;}(event)';
    inputType = 'number';
  }

  return `<html>
  <div class="approach__quiz_entry" ${options}>
      <div class="approach__quiz__mark"></div>
      <div class="approach__quiz_entry_input">
        <input type="${inputType}" onkeypress="${filter}">
      </div>
      <div class="approach__quiz__entry_submit">
        <button class="approach__quiz__submit_button approach__quiz__entry_submit_button">Check</button>
      </div>
    <div class="approach__quiz__answer ${answerType}">
      ${contents}
    </div>
  </div>
</html>`;
}

function convertQuiz(str, nameIndex) {
  const match = /<quiz *([^ >]*)/.exec(str);
  const type = match[1].trim().toLowerCase();
  const contents = /<quiz[^>]*>([\s\S]*)<\/quiz>/.exec(str)[1];
  if (type === 'multichoice') {
    const options = /<quiz *multichoice *([^>]*)>/.exec(str)[1];
    return convertMultiChoice(contents, `${nameIndex}`, options || '');
  }
  if (type.startsWith('entry')) {
    const entryType = /<quiz *entry([^ >]*)/.exec(str)[1].toLowerCase();
    const options = /<quiz *entry[^ ]* *([^>]*)>/.exec(str)[1];
    return convertEntry(contents, entryType, options);
  }
  return '';
}

function parseQuiz(source) {
  const re = /<quiz([\s\S]*?)<\/quiz>/;
  let out = source;
  let match = re.exec(out);
  let nameIndex = 0;
  while (match != null) {
    const { index } = match;
    const [str] = match;
    out = `${out.substring(0, index)}${convertQuiz(str, nameIndex)}${out.substring(index + str.length)}`;
    match = re.exec(out);
    nameIndex += 1;
  }
  return out;
}

// function parseHints(source) {
//   const re = /<hint>([\s\S]*?)<\/hint>/;
//   let out = source;
//   let match = re.exec(out);
//   while (match != null) {
//     const { index } = match;
//     const [str, content] = match;
//     const m = content.match(/\[([^\]]*)\](.*)/);
//     let hint = '';
//     let label = 'Hint';
//     if (m != null) {
//       [, label, hint] = m;
//     } else {
//       hint = content;
//     }
//     const replacement = `
//   <div class="simple__hint">
//     <div class="simple__hint_label">
//       ${label} 
//     </div>
//     <div class="simple__hint_contents simple__hint_hidden">
//       ${hint}
//     </div>
//   </div>`;
//     out = `${out.substring(0, index)}${replacement}${out.substring(index + str.length)}`;
//     match = re.exec(out);
//   }
//   return out;
// }

// function parseLinks(source) {
//   const re = /\[([^[][^\]]*)\]\(([^)]*)\)/;
//   let out = source;
//   let match = re.exec(out);
//   while (match != null) {
//     const { index } = match;
//     const [str, label, link] = match;
//     const replacement = `
//   <a class="topic__link" href=${link} rel="noreferrer noopener" target="_blank">
//     ${label}
//   </a>`;
//     out = `${out.substring(0, index)}${replacement}${out.substring(index + str.length)}`;
//     match = re.exec(out);
//   }
//   return out;
// }

function convertID(str) {
  const contents = str.trim().replace(/^\$\|/, '').replace(/\|\$$/, '');
  let tag = 'span';
  if (contents.split(' ').length > 1) {
    [tag] = contents.split(' ');
  }
  const id = contents.split(' ').slice(-1)[0];

  let out = `<${tag} class="topic__variable_${id} topic__variable">${id}</${tag}>`;
  if (str.charAt(0) === ' ') {
    out = ` ${out}`;
  }
  return out;
}

function parseIDs(source) {
  const re = /([^\\]\$\||^{{)((?!\|\$).)*\|\$/;
  let out = source;
  let match = re.exec(out);
  while (match != null) {
    const { index } = match;
    const [str] = match;
    out = `${out.substring(0, index)}${convertID(str)}${out.substring(index + str.length)}`;
    match = re.exec(out);
    // nameIndex += 1;
  }
  return out;
}

// This loader looks for [[label]]((method,parameter,color)) strings
// and replaces them with <a> links
async function quizparser(callback, source, map, meta) {
  let out = source;
  // out = parseHints(out);
  // out = parseLinks(out);
  out = parseQuiz(out);
  out = parseIDs(out);
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
