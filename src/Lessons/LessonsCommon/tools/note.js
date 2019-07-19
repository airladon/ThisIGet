// @flow
import Fig from 'figureone';

const { colorArrayToRGBA } = Fig.tools.color;

const { generateUniqueId, joinObjects } = Fig.tools.misc;

function footnote(
  options: string | {
    top?: number | string,
    left?: number | string,
    right?: number | string,
    size?: number | string,
    color?: Array<number>,
    className?: string,
    id?: string,
    label?: string,
    hint?: boolean,
  } = '',
  contentIn: string = '',
) {
  let content = '';
  // let text = '';
  let marginLeft = '';
  let marginRight = '';
  let top = '';
  let fontSize = '';
  let color = '';
  let id = '';
  let classNames = 'pres_lesson__footnote';
  let label = '';
  // let hint = false;

  if (typeof options === 'string') {
    content = options;
  } else {
    content = contentIn;
    if (options.top != null) {
      top = `top:${options.top}%;`;
    }
    if (options.left != null) {
      marginLeft = `margin-left:${options.left}%;`;
    }
    if (options.right != null) {
      marginRight = `margin-right:${options.right}%;`;
    }
    if (options.size != null) {
      fontSize = `font-size:${options.size}em;`;
    }
    if (options.color != null) {
      color = `color:${colorArrayToRGBA(options.color)};`;
    }
    if (options.className != null) {
      classNames = `${classNames} ${options.className}`;
    }
    if (options.id != null) {
      id = ` id="${options.id}"`;
    }
    if (options.hint != null && options.hint === true) {
      label = 'Hint: ';
      // hint = true;
      if (options.label != null) {
        ({ label } = options);
      }
      label = `<div class="pres_lesson__footnote__label pres_lesson__hint_label action_word interactive_word" id=${generateUniqueId()}>${label}</div>`;
      content = `${label}<div class="pres_lesson__hint__content pres_lesson__hint__content__hidden">${content}</div>`;
    } else if (options.label != null) {
      ({ label } = options);
      if (label.length > 0) {
        label = `<div class="pres_lesson__footnote__label">${label}</div>`;
      }
      content = `${label}<div class="pres_lesson__footnote__content">${content}</div>`;
    }
  }

  const inlineStyle = ` style="${top}${marginLeft}${marginRight}${fontSize}${color}"`;
  return `<div class="${classNames}"${id}${inlineStyle}>${content}</div>`;
}

function hint(
  options: string | number | {
    top?: number | string,
    left?: number | string,
    right?: number | string,
    size?: number | string,
    color?: Array<number>,
    className?: string,
    id?: string,
    label?: string,
  } = '',
  contentIn: string = '',
) {
  if (typeof options === 'string') {
    return footnote({ hint: true, label: 'Hint' }, options);
  }

  if (typeof options === 'number') {
    return footnote({ hint: true, label: `Hint ${options}` }, contentIn);
  }

  return footnote(joinObjects(options, { hint: true, label: 'Hint:' }), contentIn);
}

export { hint, footnote };
