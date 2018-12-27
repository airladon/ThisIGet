// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.selector.position = new Point(0, 1.7);
  layout.lines.position = new Point(1.4, 0);
  layout.equationPosition = new Point(-2, -1.1);
  return layout;
}
