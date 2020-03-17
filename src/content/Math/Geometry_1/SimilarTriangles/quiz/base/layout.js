// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

// const {
//   Point,
//   // Transform,
//   // Line,
// } = Fig;

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
  // layout.quiz.choice = new Point(1.95, -0.85);
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  const width = 0.015;
  const quizTri = {
    method: 'polyline',
    options: {
      points: [
        [0, 0],
        [0, 1.5],
        [1.5, 0],
      ],
      color: colors.sides,
      width,
      close: true,
      pad: {
        color: [0, 0, 0, 0.001],
        // color: colors.angles,
        isMovable: true,
        sides: 4,
        radius: 0.1,
      },
      makeValid: {
        shape: 'triangle',
        hide: {
          minAngle: 10 * Math.PI / 180,
          maxAngle: 170 * Math.PI / 180,
          minSide: 0.8,
        },
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

  const tri1 = joinObjects({}, quizTri, { name: 'tri1' });
  const tri2 = joinObjects({}, quizTri, { name: 'tri2' });

  layout.addElementsQuiz = [
    tri1,
    tri2,
  ];

  return layout;
}
