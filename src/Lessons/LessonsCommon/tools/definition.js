// @flow

class Root {
  root: string;
  meaning: string;

  constructor(root: string, meaning: string) {
    this.root = root;
    this.meaning = meaning;
  }
}

class FromLanguage {
  language: string;
  roots: Array<Root>;

  constructor(
    language: string,
    roots: Array<string> = [],
  ) {
    this.language = language;
    this.roots = [];
    roots.forEach((root, index) => {
      if (index % 2 === 0 && roots.length >= index) {
        this.roots.push(new Root(roots[index], roots[index + 1]));
      }
    });
  }
}

// new Definition(
//   'Supplementary',
//   'Latin', ['supplementum', 'fill up or complete'],
//   'Greek', ['suppl', 'super', 'mentum', 'man'],
// )
export default class Definition {
  word: string;
  from: Array<FromLanguage>;

  constructor(...args: Array<string | Array<string>>) {
    this.word = '';
    this.from = [];
    args.forEach((arg, index) => {
      if (index === 0 && typeof arg === 'string') {
        this.word = arg;
      }
      if (index % 2 === 1 && args.length >= index) {
        const roots = args[index + 1];
        if (typeof arg === 'string' && Array.isArray(roots)) {
          this.from.push(new FromLanguage(arg, roots));
        }
      }
    });
  }

  html(id: string, classes: string = '') {
    let outStr = '';
    outStr += `<div id="${id}" class="lesson__definition_container ${classes}">`;
    outStr += '<span class="lesson__definition_word">';
    outStr += this.word;
    outStr += '</span>';
    this.from.forEach((fromLanguage) => {
      outStr += ` - from ${fromLanguage.language}`;
      fromLanguage.roots.forEach((root, index) => {
        outStr += '<span class="lesson__definition_root">';
        outStr += `${root.root}`;
        outStr += '</span>';
        outStr += '<span class="lesson__definition_meaning">';
        if (root.meaning) {
          outStr += `: "${root.meaning}"`;
        }
        outStr += '</span>';
        if (fromLanguage.roots.length > index + 1) {
          outStr += ', ';
        }
      });
    });
    outStr += '</div>';
    return outStr;
  }

  element(id: string) {
    const container = document.createElement('div');
    container.classList.add('lesson__definition_container');
    container.id = id;

    const word = document.createElement('span');
    word.innerHTML = this.word;
    word.classList.add('lesson__definition_word');
    container.appendChild(word);

    this.from.forEach((fromLanguage) => {
      const language = document.createElement('span');
      language.innerHTML = `from ${fromLanguage.language} `;
      container.appendChild(language);

      const { roots } = fromLanguage;
      roots.forEach((root, index) => {
        const rootElement = document.createElement('span');
        rootElement.innerHTML = root.root;
        rootElement.classList.add('lesson__definition_root');
        container.appendChild(rootElement);

        const meaningElement = document.createElement('span');
        meaningElement.classList.add('lesson__definition_meaning');
        let meaningString = `"${root.meaning}"`;
        if (roots.length > index + 1) {
          meaningString += ',';
        }
        meaningElement.innerHTML = meaningString;
        container.appendChild(meaningElement);
      });
    });
    return container;
  }
}
