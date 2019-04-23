// @flow
import Fig from 'figureone';

const { generateUniqueId, joinObjects } = Fig.tools.misc;
const { colorArrayToRGBA } = Fig.tools.color;

class Root {
  root: string;
  meaning: string;

  constructor(rootWord: string, meaning: string) {
    this.root = rootWord;
    this.meaning = meaning;
  }
}

const specialWords = {
  WHERE: 'where',
  AND: 'and',
  MEANING: 'meaning',
  MEANS: 'means',
};

class SpecialWord {
  word: string;

  constructor(word: string) {
    this.word = specialWords[word];
  }
}

class FromLanguage {
  language: string;
  roots: Array<Root | SpecialWord>;

  constructor(
    language: string,
    roots: Array<string> = [],
  ) {
    this.language = language;
    this.roots = [];
    for (let i = 0; i < roots.length; i += 1) {
      const rootWord = roots[i];
      if (specialWords[rootWord] != null) {
        this.roots.push(new SpecialWord(rootWord));
      } else {
        let rootWordMeaning = '';
        if (i + 1 < roots.length) {
          if (specialWords[roots[i + 1]] != null) {
            this.roots.push(new Root(rootWord, rootWordMeaning));
            this.roots.push(new SpecialWord(roots[i + 1]));
          } else {
            rootWordMeaning = roots[i + 1];
            this.roots.push(new Root(rootWord, rootWordMeaning));
          }
        }
        i += 1;
      }
    }
    // roots.forEach((rootWord, index) => {
    //   if (specialWords[rootWord] != null) {
    //     this.roots.push(new SpecialWord(rootWord));
    //   } else {

    //   }
    //   if (index % 2 === 0 && roots.length >= index) {
    //     this.roots.push(new Root(roots[index], roots[index + 1]));
    //   }
    // });
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

  html(optionsIn: {
      id?: string,
      classes?: string,
      wordClass?: string,
      color?: Array<number>,
    } | Array<number> = {}) {
    const defaultOptions = {
      id: generateUniqueId('definition'),
      classes: '',
      wordClass: '',
      color: '',
    };
    let options = defaultOptions;
    if (Array.isArray(optionsIn)) {
      defaultOptions.color = colorArrayToRGBA(optionsIn);
    } else {
      options = joinObjects(defaultOptions, optionsIn);
    }
    if (Array.isArray(options.color)) {
      options.color = colorArrayToRGBA(options.color);
    }
    const { id, classes } = options;
    let outStr = '';
    outStr += `<div id="${id}" class="lesson__definition_container ${classes}">`;
    let style = '';
    if (options.color) {
      style = ` style="color:${(options.color)}"`;
    }
    outStr += `<span class="lesson__definition_word ${options.wordClass}"${style}>`;
    outStr += this.word;
    outStr += '</span>';
    this.from.forEach((fromLanguage) => {
      let lang = `lesson__${fromLanguage.language.toLowerCase()}`;
      lang = lang.replace(/ /g, '_');
      outStr += ` - from <span class="${''}">${fromLanguage.language}</span> `;
      fromLanguage.roots.forEach((root, index) => {
        if (root instanceof Root) {
          outStr += `<span class="lesson__definition_root ${lang}">`;
          outStr += `${root.root}`;
          outStr += '</span>';
          // outStr += '';
          if (root.meaning) {
            if (root.root) {
              outStr += ': ';
            }
            outStr += `<span class="lesson__definition_meaning">${root.meaning}</span>`;
          }
          if (
            fromLanguage.roots.length > index + 1
            && fromLanguage.roots[index + 1] instanceof Root
          ) {
            outStr += ', ';
          }
        } else {
          outStr += ` ${root.word} `;
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
