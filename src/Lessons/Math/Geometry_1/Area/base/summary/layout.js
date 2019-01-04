// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  // layout.summaryMeasPosition = new Point(0, -0.3);
  layout.measurePosition = new Point(0, -0.3);
  layout.squareA.labelOffset = -1.15;
  layout.triangleA.labelOffset = -0.95;
  layout.circleA.labelOffset = -1.15;
  layout.rectNumSquaresEqnPosition = new Point(0, 0);
  layout.rectPosition = new Point(0, -0.2);
  layout.rect = {
    position: new Point(0, 0),
    length: 3,
    height: 2,
    width: 0.03,
    labelOffset: 0.1,
  };
  return layout;
}
