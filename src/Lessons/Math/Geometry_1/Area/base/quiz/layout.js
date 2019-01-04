// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Rect, Point } = Fig;
// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.input = new Point(0, -1.7);
  layout.quiz = {
    position: new Point(0, 0),
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0, -1.7),
    newProblem: new Point(0, -1.7),
    showAnotherAnswer: new Point(1.8, -1.7),
  };
  layout.answerBox = new Point(0, 1.45);

  layout.adjustableRect = {
    points: [
      new Point(-0.51, -0.51),
      new Point(-0.51, 0.51),
      new Point(0.51, 0.51),
      new Point(0.51, -0.51),
    ],
    width: 0.03,
    limits: new Rect(-2.5, -1.3, 5, 2.6),
    minSide: 0.2,
    labelOffset: 0.08,
    position: new Point(0, 0),
  };
  return layout;
}
