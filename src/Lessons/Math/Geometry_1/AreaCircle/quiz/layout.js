// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';
// const cssColorNames = [
//   'latin',
//   'line',
// ];

const { Point, Transform, polarToRect } = Fig.tools.g2;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.quiz = {
    check: new Point(2.2, -1.7),
    input: new Point(0, -1.7),
    // position: new Point(0, 0),
    // answer: new Point(0, -1.7),
    // nextSteps: new Point(0, -1.9),
    inputInteractiveLocation: new Point(-0.54, 0.15),
    checkInteractiveLocation: new Point(-0.28, 0.15),
    newProblem: new Point(2.2, -1.7),
    // showAnotherAnswer: new Point(-1, -1.7),
  };

  const width = 0.01;
  const rad = 1;
  layout.circle = {
    radius: rad,
    sides: 100,
    width: width * 3,
    color: layout.colors.lines,
    transform: new Transform().translate(0, 0),
  };
  layout.area = {
    fill: {
      radius: rad,
      sides: 100,
      fill: true,
      color: layout.colors.areaPoly,
      transform: new Transform().translate(0, 0),
    },
    label: {
      label: 'Area = ?',
      color: layout.colors.lines,
      scale: 0.7,
    },
    positions: {
      middle: new Point(0, 0),
      low: new Point(0, -0.4),
    },
  };
  layout.radius = {
    vertexSpaceStart: 'start',
    length: rad - width,
    width,
    angle: 0,
    color: layout.colors.radius,
    label: {
      text: 'r',
      location: 'top',
      orientation: 'horizontal',
      offset: 0.02,
    },
  };
  layout.diameter = {
    vertexSpaceStart: 'center',
    length: (rad - width) * 2,
    width,
    angle: 0,
    color: layout.colors.radius,
    label: {
      text: 'r',
      location: 'top',
      orientation: 'horizontal',
      offset: 0.02,
    },
  };
  layout.circumference = {
    line: {
      radius: rad * 1.2,
      sides: 100,
      sidesToDraw: 100 * 0.99,
      width: width * 0.9,
      color: layout.colors.radius,
      transform: new Transform().translate(0, 0),
    },
    arrow: {
      width: width * 7,
      height: width * 7,
      rotation: Math.PI,
      position: new Point(rad * 1.2 - width * 0.45, -width),
      color: layout.colors.radius,
      tip: new Point(0, 0),
    },
    label: {
      label: 'c',
      color: layout.colors.radius,
      hAlign: 'left',
      vAlign: 'bottom',
      scale: 0.7,
      position: polarToRect(rad * 1.3, 1),
    },
  };
  layout.question = {
    label: '?',
    color: layout.colors.diagram.text.base,
    hAlign: 'center',
    scale: 1,
    position: new Point(0, 1.8),
  };
  return layout;
}
