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
  layout.input = new Point(0, -1.7);
  layout.quiz = {
    position: new Point(0, 0),
    answer: new Point(0, -1.7),
    nextSteps: new Point(0, -1.9),
    check: new Point(0.7, -1.7),
    newProblem: new Point(0.9, -1.7),
  };
  layout.answerBox = new Point(-0.4, 1.45);

  const min = 0.4;
  const width = 1.6;
  const height = 0.8;
  layout.quadPosition = new Point(0, -0.2);
  layout.angleRadius = 0.25;
  layout.angleLabelOffset = 0.02;
  layout.angleSides = 200;
  layout.pointRects = {
    quad1: new Rect(0, 0, width, height),
    quad2: new Rect(-min - width, min + height / 2, width, height / 2),
    quad3: new Rect(-min - width, -min - height, width, height),
    quad4: new Rect(min + width / 2, -min - height, width / 2, height),
  };
  return layout;
}
