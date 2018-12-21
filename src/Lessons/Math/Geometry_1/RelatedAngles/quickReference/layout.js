// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';

const { Rect, Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const len = 2.4;
  layout.position = new Point(0, -0.2);
  layout.parallelLine = {
    length: {
      full: len,
      end: len / 3,
      middle: len / 3,
    },
    label: {
      length: len / 2,
    },
    width: 0.03,
    boundary: new Rect(-3, -1.7, 6, 3),
  };
  layout.minAngleThreshold = 1;
  layout.intersectingLine.width = 0.03;
  layout.angle.arc.width = 0.03;
  return layout;
}
