// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../../explanation/base/layout';
// import { Point } from '../../../../../../js/diagram/tools/g2';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.position = new Point(0, 0.45);
  return layout;
}
