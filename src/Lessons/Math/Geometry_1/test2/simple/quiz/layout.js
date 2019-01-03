// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;
// const cssColorNames = [
//   'latin',
//   'line',
//   'angleA',
//   'angleB',
//   'angleC',
//   'angleD',
//   'disabled',
//   'supplementary',
//   'intersectingLine',
//   'quizLine',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.input = new Point(0, -1.7);
  layout.quiz = {
    position: new Point(0, 0),
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0.7, -1.7),
    newProblem: new Point(0.9, -1.7),
  };
  layout.answerBox = new Point(-0.6, -1.45);

  layout.triangle.angle.radius = 0.2;
  layout.triangle.angle.labelRadius = 0.25;
  return layout;
}
