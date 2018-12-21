// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.position = new Point(0, -0.1);
  layout.triangleAreaEquation = new Point(0, 1.6);
  return layout;
}
