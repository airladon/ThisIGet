// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';
// import { Point } from '../../../../../../js/diagram/tools/g2';
const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.areaPosition = new Point(0, 0.6);
  layout.squareA.width = 0.05;
  layout.squareA.labelOffset = -1.1;
  layout.circleA.width = 0.05;
  layout.circleA.labelOffset = -1.1;
  layout.triangleA.width = 0.07;
  layout.triangleA.labelOffset = -0.9;

  layout.rectPosition = new Point(0, 0.3);
  layout.rectNumSquaresEqnPosition = new Point(0, -0.05);

  layout.squarePosition = new Point(0, 0.2);
  return layout;
}
