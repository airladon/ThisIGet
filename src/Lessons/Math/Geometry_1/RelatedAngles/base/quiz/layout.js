// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Rect, Point } = Fig;

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
  // layout.colors = getCssColors(cssColorNames);
  const len = 2.4;
  layout.parallelLine.length = {
    full: len,
    end: len / 3,
    middle: len / 3,
  };
  layout.quiz = {
    position: new Point(0, 0),
    first: {
      line1: {
        position: new Point(-1, 0),
        rotation: Math.PI / 2,
      },
      line2: {
        position: new Point(1, 0),
        rotation: Math.PI / 4,
      },
    },
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0, -1.7),
    newProblem: new Point(0, -1.7),
  };
  layout.quizA1 = {
    minSeparation: 0.6,
    maxSeparation: 1.1,
    input: new Point(0, 1.35),
    position: new Point(0, -0.15),
  };
  layout.parallelLine.boundary = new Rect(-2.5, -1.7, 5, 3);
  return layout;
}
