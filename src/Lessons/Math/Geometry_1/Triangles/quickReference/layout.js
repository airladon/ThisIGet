// @flow
import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';
// import { Rect, Point } from '../../../../../js/diagram/tools/g2';

const { Rect, Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.totalAngle.angle.radius = 0.3;
  layout.totalAngle.angle.lineWidth = 0.01;
  layout.totalAngle.pointPositions = {
    p1: new Point(-1, -0.5),
    p2: new Point(1, -0.5),
    p3: new Point(-0.5, 0.7),
  };
  layout.totalAngle.equation = {
    position: new Point(-0.5, 0.9),
    scale: 0.9,
  };
  layout.totalAngle.boundary = new Rect(
    -1, -0.7, 2, 1.4,
  );
  layout.totalAngle.randomBoundary = new Rect(
    0.5,
    0.3,
    1,
    0.5,
  );
  return layout;
}
