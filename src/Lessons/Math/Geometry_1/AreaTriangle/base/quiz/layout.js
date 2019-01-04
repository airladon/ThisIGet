// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point } = Fig;
// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.quiz = {
    position: new Point(0, 0),
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0, -1.7),
    newProblem: new Point(0, -1.7),
    showAnotherAnswer: new Point(1.8, -1.7),
  };

  layout.same.grid.height = 2.25;
  layout.same.baseY = -1.25;
  layout.samePosition = new Point(0, 0);
  return layout;
}
