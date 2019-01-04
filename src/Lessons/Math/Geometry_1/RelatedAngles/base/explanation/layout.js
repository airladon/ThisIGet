// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Rect, Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const len = 2.4;
  layout.position = new Point(0, -0.4);
  layout.parallelLine = {
    length: {
      full: len,
      end: len / 3,
      middle: len / 3,
    },
    label: {
      length: len / 2,
    },
    width: 0.02,
    boundary: new Rect(-3, -1.7, 6, 3),
    interactive: new Point(-len / 3, 0),
  };
  layout.minAngleThreshold = 1;

  layout.equation2 = {
    b: new Point(-0.2, 1.515),
  };

  return layout;
}
