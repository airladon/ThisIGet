// @flow
// import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

// const {
//   Point,
//   Transform,
//   // Line,
// } = Fig;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'pads',
  // 'disabled',
  // 'construction',
  'highlight',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.02;

  // const onePropAngle = (rc, rt, color = colors.angles) => ({
  //   color,
  //   curve: {
  //     radius: rc,
  //     width: layout.width,
  //   },
  //   sides: {
  //     width: 0.001,
  //   },
  //   label: {
  //     text: null,
  //     showRealAngle: true,
  //     precision: 0,
  //     radius: rt,
  //   },
  //   autoRightAngle: true,
  //   rightAngleRange: 1 * Math.PI / 180,
  // });

  // const onePropPad = isMovable => ({
  //   color: isMovable ? colors.pads : [0, 0, 0, 0.001],
  //   isMovable,
  //   sides: 20,
  //   radius: 0.07,
  //   touchRadius: 0.8,
  //   fill: true,
  // });

  // const onePropSide = (color = colors.sides) => ({
  //   color,
  //   label: {
  //     text: null,
  //     offset: 0.1,
  //     location: 'outside',
  //   },
  // });


  layout.tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
      ],
      color: colors.sides,
      width: layout.width,
      close: true,
      makeValid: {
        shape: 'triangle',
        hide: {
          minAngle: 15 * Math.PI / 180,
          maxAngle: 150 * Math.PI / 180,
          minSide: 0.8,
        },
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
          sides: 100,
        },
        label: {
          radius: 0.31,
        },
        autoRightAngle: true,
      },
      pad: {
        color: [1, 1, 1, 0.01],
        radius: 0.3,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.8, -1.9, 5.6, 3.2],
      },
      side: {
        label: {
          offset: 0.1,
          precision: 2,
        },
      },
    },
  };

  layout.addElements = [
    // layout.oneProp,
    layout.tri,
    // layout.angleTri,
  ];

  return layout;
}
