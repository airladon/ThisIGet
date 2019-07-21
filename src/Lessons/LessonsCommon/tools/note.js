// @flow
import Fig from 'figureone';

const { colorArrayToRGBA } = Fig.tools.color;

const { generateUniqueId, joinObjects } = Fig.tools.misc;

function note(
  options: string | {
    top?: number | string,
    left?: number | string,
    right?: number | string,
    marginLeft?: number | string,
    marginRight?: number | string,
    size?: number | string,
    color?: Array<number>,
    className?: string,
    id?: string,
    label?: string,
    hint?: boolean,
    hAlign?: 'left' | 'center' | 'right',
  } = '',
  contentIn: string = '',
) {
  let content = '';
  // let text = '';
  let marginLeft = '';
  let marginRight = '';
  let left = '';
  let right = '';
  let top = '';
  let fontSize = '';
  let color = '';
  let id = '';
  let classNames = 'pres_lesson__note';
  let label = '';
  let hAlign = '';
  // let hint = false;

  if (typeof options === 'string') {
    content = options;
  } else {
    content = contentIn;
    if (options.top != null) {
      top = `top:${options.top}%;`;
    }
    if (options.marginLeft != null) {
      marginLeft = `margin-left:${options.marginLeft}%;`;
    }
    if (options.marginRight != null) {
      marginRight = `margin-right:${options.marginRight}%;`;
    }
    if (options.left != null) {
      left = `left:${options.left}%;`;
    }
    if (options.right != null) {
      right = `right:${options.right}%;`;
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
    if (options.hAlign != null) {
      hAlign = `text-align:${options.hAlign};`;
    }
    if (options.hint != null && options.hint === true) {
      label = 'Hint: ';
      // hint = true;
      if (options.label != null) {
        ({ label } = options);
      }
      label = `<div class="pres_lesson__note__label pres_lesson__hint_label action_word action_word_enabled interactive_word" id=${generateUniqueId()}>${label}</div>`;
      content = `${label}<div class="pres_lesson__hint__content pres_lesson__hint__content__hidden">${content}</div>`;
    } else if (options.label != null) {
      ({ label } = options);
      if (label.length > 0) {
        label = `<div class="pres_lesson__note__label">${label}</div>`;
      }
      content = `${label}<div class="pres_lesson__note__content">${content}</div>`;
    }
  }

  const inlineStyle = ` style="${top}${marginLeft}${marginRight}${fontSize}${color}${hAlign}${left}${right}"`;
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
    hAlign?: 'left' | 'center' | 'right',
  } = '',
  contentIn: string = '',
) {
  if (typeof options === 'string') {
    return note({ hint: true, label: 'Hint' }, options);
  }

  if (typeof options === 'number') {
    return note({ hint: true, label: `Hint ${options}` }, contentIn);
  }

  return note(joinObjects({ hint: true, label: 'Hint:' }, options), contentIn);
}

export { hint, note };
