// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.triangles.congruent = {
    points: [
      new Point(-0.8, -0.5),
      new Point(0.8, -0.5),
      new Point(0.5, 0.5),
    ],
    tri1: {
      scenario: { position: new Point(-1.2, -0.2), rotation: 0 },
    },
    tri2: {
      scenario: { position: new Point(1.2, -0.2), rotation: 0 },
    },
    tri1CongruencyTests: {
      scenario: { position: new Point(1, 0), rotation: 0, scale: new Point(1.2, 1.2) },
    },
  };
  layout.label = {
    position: new Point(1, -1),
  };
  return layout;
}
