// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.position = new Point(0, 0);
  layout.lines.position = new Point(0, 0);
  layout.complementary = {
    linesPosition: new Point(-0.5, -0.7),
    equationPosition: new Point(0, 0.8),
  };
  layout.equationScale = 1;
  layout.supplementary = {
    linesPosition: new Point(0, -0.7),
    equationPosition: new Point(0, 0.8),
  };
  layout.explementary = {
    linesPosition: new Point(0, -0.1),
    equationPosition: new Point(-0.05, 1.25),
  };
  return layout;
}
