// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point, Rect } = Fig;

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
  const len = 1.7;
  layout.position = new Point(0, 0);
  layout.line = {
    length: {
      full: len,
      end: len / 3,
      middle: len / 3,
    },
    width: 0.02,
    boundary: new Rect(-3, -1.7, 6, 3),
  };

  layout.quiz = {
    position: new Point(0, 0),
    line1: {
      position: new Point(-1, 0),
      rotation: Math.PI / 2,
    },
    line2: {
      position: new Point(1, 0),
      rotation: Math.PI / 4,
    },
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0, -1.7),
  };
  // layout.quiz2 = {
  //   first: {
  //     line1: {
  //       position: new Point(0, 0),
  //       rotation: 0,
  //     },
  //     line2: {
  //       position: new Point(0, 0),
  //       rotation: 0,
  //     },
  //     line3: {
  //       position: new Point(0, 0),
  //       rotation: 0,
  //     },
  //     line4: {
  //       position: new Point(0, 0),
  //       rotation: 0,
  //     },
  //     line5: {
  //       position: new Point(0, 0),
  //       rotation: 0,
  //     },
  //   },
  // };

  // layout.line.boundary = new Rect(-2.5, -1.7, 5, 3);
  return layout;
}
