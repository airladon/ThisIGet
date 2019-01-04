// @flow
import Fig from 'figureone';
// import { Point } from '../../../../../js/diagram/tools/g2';
// import getCssColors from '../../../../../js/tools/getCssColors';
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
    // first: {
    //   line1: {
    //     position: new Point(-1, 0),
    //     rotation: Math.PI / 2,
    //   },
    //   line2: {
    //     position: new Point(1, 0),
    //     rotation: Math.PI / 4,
    //   },
    // },
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0.7, -1.7),
    newProblem: new Point(0.9, -1.7),
  };
  return layout;
}
