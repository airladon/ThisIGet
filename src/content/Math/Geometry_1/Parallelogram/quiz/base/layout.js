// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
//   // Transform,
//   // Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  // quiz: {
  //     check: new Point(2.4, -1.7),
  //     input: new Point(2.4, -1.3),
  //     newProblem: new Point(2.4, -1.7),
  //     // check: new Point(0, -1.7),
  //     position: new Point(0, 0),
  //     answer: new Point(0, -1.7),
  //     nextSteps: new Point(0, -1.9),
  //     // newProblem: new Point(0, -1.7),
  //     showAnotherAnswer: new Point(1.1, -1.7),
  //     choice: new Point(2.02, -1.1),
  //   },
  layout.quiz.choice = new Point(2.02, -0.6);
  // layout.quiz.check = new Point(2.1, -1.7)
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.diagonal = colors.get('grey').rgb;

  const pMarks = (name, num) => ({
    name,
    method: 'parallelMarks',
    options: {
      color: colors.sides,
      width: 0.01,
      step: 0.04,
      length: 0.1,
      num,
      rotation: 0,
      position: [0, 0],
    },
  });

  const lMarks = (name, num) => ({
    name,
    method: 'marks',
    options: {
      color: colors.diagonal,
      width: 0.01,
      step: 0.04,
      length: 0.12,
      num,
      rotation: 0,
      position: [0, 0],
    },
    mods: {
      pulseDefault: {
        scale: 3,
      },
    },
  });

  const dashed = name => ({
    name,
    method: 'line',
    options: {
      color: colors.diagonal,
      width: 0.004,
      p1: [0, 0],
      p2: [5, 0],
      dashStyle: {
        style: [0.03, 0.02],
      },
    },
  });

  const width = 0.015;
  const pgram = {
    name: 'pgram',
    method: 'polyLine',
    options: {
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
      color: colors.sides,
      width,
      close: true,
      pad: {
        color: [0, 0, 0, 0.001],
        isMovable: true,
        sides: 4,
        radius: 0.1,
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.2,
          width,
        },
        autoRightAngle: false,
        label: {
          text: null,
          precision: 0,
          scale: 0.7,
        },
      },
      side: {
        label: {
          text: null,
          location: 'outside',
        },
      },
    },
  };

  layout.addElementsQuiz = [
    dashed('d02'),
    dashed('d31'),
    lMarks('l02_1', 1),
    lMarks('l02_2', 1),
    lMarks('l31_1', 2),
    lMarks('l31_2', 2),
    pMarks('p01', 1),
    pMarks('p12', 2),
    pMarks('p23', 1),
    pMarks('p30', 2),
    pgram,
  ];

  return layout;
}
