// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  // centerV,
} = Fig.tools.html;

const { colorArrayToRGBA } = Fig.tools.color;

const layout = lessonLayout();
const { colors } = layout;

// const footnote = () => {

// }
function footnoteold(
  options: string | Array<string> | {
    top?: number | string,
    className?: string,
    id?: string,
    label?: string,
    hint?: boolean,
  } = '',
  textIn?: string | Array<string>,
) {
  let text = '';
  let top = '90';
  let classNames = 'pres_lesson__footnote';
  let id = '';
  let label = '';
  if (Array.isArray(options) || typeof options === 'string') {
    text = style({}, options);
  } else {
    if (options.top != null) {
      top = `${options.top}`;
    }
    if (options.className != null) {
      classNames = `${classNames} ${options.className}`;
    }
    if (options.id != null) {
      id = ` id="${options.id}"`;
    }
    if (options.label != null) {
      label = `<span class="pres_lesson__footnote__label">${options.label}</span> `;
    }
    if (options.hint) {
      let labelToUse = 'Hint:';
      if (options.label != null) {
        labelToUse = options.label;
      }
      label = `<span class="pres_lesson__footnote__hint_label action_word">${labelToUse}</span> `;
    }
    if (textIn != null) {
      if (typeof textIn === 'string') {
        text = style({}, `${label}${textIn}`);
      } else {
        text = style({}, [label, ...textIn]);
      }
    }
    // if (options.hint) {
    //   text = `<div class="press_lesson__footnote__hint>${text}</div>`;
    // }
  }
  return `<div style="top:${top}%" class="${classNames}"${id}>${text}</div>`;
}

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
      label = `<div class="pres_lesson__footnote__hint_label">${label}</div>`;
      content = `${label}<div class="pres_lesson__footnote__content">${content}</div>`;
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

// function hint(
//   options: string | Array<string> | {
//     top?: number | string,
//     className?: string,
//     id?: string,
//     label?: string,
//   } = '',
//   textIn?: string | Array<string>,
// ) {
//   let text = '';
//   let top = '90';
//   let classNames = 'pres_lesson__footnote';
//   let id = '';
//   let label = '';
//   if (Array.isArray(options) || typeof options === 'string') {
//     text = style({}, options);
//   } else {
//     if (options.top != null) {
//       top = `${options.top}`;
//     }
//     if (options.className != null) {
//       classNames = `${classNames} ${options.className}`;
//     }
//     if (options.id != null) {
//       id = ` id="${options.id}"`;
//     }
//     if (options.label != null) {
//       label = `<span class="pres_lesson__footnote__label">${options.label}</span> `;
//     }
//     if (textIn != null) {
//       if (typeof textIn === 'string') {
//         text = style({}, `${label}${textIn}`);
//       } else {
//         text = style({}, [label, ...textIn]);
//       }
//     }
//   }
//   return `<div style="top:${top}%" class="${classNames}"${id}>${text}</div>`;
// }

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tri = coll._triangle;

    let common = {
      transitionFromAny: (done) => {
        coll.goToTri('default', 1, done);
      },
      setSteadyState: () => {
        tri.hideAngles();
        tri.hideSides();
        coll.enableUpdate = false;
      },
    };
    this.addSection(common, {
      setContent: [
        'You can create a |shape| with |three| connected |straight lines|.',
        footnote({ top: 85, label: 'Hint: ', hint: true }, 'You can change the shape by dragging its corners |test|.'),
        footnote({ label: 'Note:' }, 'You can change the shape by dragging its corners.'),
      ],
      modifiers: {
        shape: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
        test: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
      },
      show: [tri._line, tri._pad0, tri._pad1, tri._pad2],
      setSteadyState: () => {
        coll.enableUpdate = false;
      },
    });
    this.addSection(common, {
      setContent: [
        'This has three |angles| and |side_lengths|.',
      ],
      modifiers: {
        shape: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
        angles: click(coll.pulseAngles, [coll], colors.angles),
        side_lengths: click(coll.pulseSides, [coll], colors.lines),
      },
      show: [tri],
      setSteadyState: () => {
        coll.enableUpdate = true;
      },
    });
    this.addSection(common, {
      setContent: [
        'The common name for this shape is |Triangle|.',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      modifiers: {
        shape: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
        angles: click(coll.pulseAngles, [coll], colors.angles),
        side_lengths: click(coll.pulseSides, [coll], colors.lines),
      },
      setEnterState: () => {
        coll.enableUpdate = false;
      },
      show: [tri._line, tri._pad0, tri._pad1, tri._pad2],
    });
    // let content = {
    //   setContent: [
    //     'Such a shape has |three_angles|.',
    //   ],
    // };
    // this.addSection(common, content, {
    //   modifiers: {
    //     shape: click(coll.goToTri, [coll, 'random', null, false], colors.lines),
    //   },
    //   show: [tri],
    // });
    // this.addSection(common, {
      
    //   show: [tri, tri._angle0, tri._angle1, tri._angle2],
    // });
  }
}

export default Content;
