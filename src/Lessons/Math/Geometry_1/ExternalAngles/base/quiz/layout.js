// @flow
// import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

// const {
//   // Point, Transform, Line
//   Rect,
// } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;
  layout.addElementsQuiz = [
    {
      name: 'fig',
      method: 'collection',
      addElements: [
        {
          name: 'externalAngle',
          method: 'angle',
          options: {
            color: colors.externalAngle,
            curve: {
              radius: 0.3,
              width: 0.01,
              sides: 100,
            },
            sides: {
              length: 0.6,
              color: colors.disabled,
              width: 0.03,
            },
            label: {
              text: '?',
            },
          },
        },
        {
          name: 'tri',
          method: 'polyLine',
          options: {
            width: 0.03,
            color: colors.sides,
            close: true,
            points: [[-1, -1], [0, 1], [1, -1]],
            angle: {
              color: colors.angles,
              curve: {
                radius: 0.3,
                width: 0.01,
                sides: 100,
              },
              autoRightAngle: false,
              label: {
                radius: 0.27,
                text: null,
                scale: 0.7,
                precision: 0,
              },
            },
            side: {},
            pad: {
              color: [0, 0, 0, 0.01],
              isMovable: true,
            },
          },
        },
      ],
    },
  ];

  // const min = 0.4;
  // const width = 1.6;
  // const height = 0.8;
  // layout.quadrants = {
  //   quad1: new Rect(0, 0, width, height),
  //   quad2: new Rect(-min - width, min + height / 2, width, height / 2),
  //   quad3: new Rect(-min - width, -min - height, width, height),
  //   quad4: new Rect(min + width / 2, -min - height, width / 2, height),
  // };
  return layout;
}
