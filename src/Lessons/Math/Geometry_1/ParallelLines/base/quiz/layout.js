// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Rect } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;
  layout.line.options.move.translationBounds = new Rect(-2.5, -1.5, 5, 3);
  layout.line.options.move.type = 'translation';
  layout.line.options.color = colors.notParallel;
  layout.line1 = joinObjects({}, layout.line, { name: 'line1' });
  layout.line2 = joinObjects({}, layout.line, { name: 'line2' });
  layout.line3 = joinObjects({}, layout.line, { name: 'line3' });
  layout.line4 = joinObjects({}, layout.line, { name: 'line4' });
  layout.line5 = joinObjects({}, layout.line, { name: 'line5' });
  layout.line6 = joinObjects({}, layout.line, { name: 'line6' });

  layout.addElements = [
    layout.line1,
    layout.line2,
    layout.line3,
    layout.line4,
    layout.line5,
    layout.line6,
  ];
  return layout;
}
