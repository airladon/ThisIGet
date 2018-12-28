// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';
// import { Point } from '../../../../../js/diagram/tools/g2';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.position = new Point(0, 0.3);
  return layout;
}
