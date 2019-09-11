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

  // /////////////////////////////////////////////////////////////////
  // One Property
  // /////////////////////////////////////////////////////////////////
  const onePropAngle = (rc, rt, color = colors.angles) => ({
    color,
    curve: {
      radius: rc,
      width: layout.width,
    },
    sides: {
      width: 0.001,
    },
    label: {
      text: null,
      showRealAngle: true,
      precision: 0,
      radius: rt,
    },
    autoRightAngle: true,
    rightAngleRange: 1 * Math.PI / 180,
  });

  const onePropPad = isMovable => ({
    color: isMovable ? colors.pads : [0, 0, 0, 0.001],
    isMovable,
    sides: 20,
    radius: 0.07,
    touchRadius: 0.8,
    fill: true,
  });

  const onePropSide = (color = colors.sides) => ({
    color,
    label: {
      text: null,
      offset: 0.1,
      location: 'outside',
    },
  });


  layout.sideTri = {
    name: 'sideTri',
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
      angle: [
        onePropAngle(0.3, 0.3),
        onePropAngle(0.3, 0.3),
        onePropAngle(0.3, 0.3),
      ],
      pad: [
        onePropPad(true),
        onePropPad(false),
        onePropPad(false),
      ],
      side: [
        onePropSide(),
        onePropSide(colors.highlight),
        onePropSide(),
      ],
    },
  };

  layout.angleTri = {
    name: 'angleTri',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
      ],
      color: colors.sides,
      width: layout.width,
      makeValid: {
        shape: 'triangle',
        hide: {
          minAngle: 15 * Math.PI / 180,
          maxAngle: 150 * Math.PI / 180,
          minSide: 0.8,
        },
      },
      close: true,
      angle: [
        onePropAngle(0.3, 0.3),
        onePropAngle(0.3, 0.3),
        onePropAngle(0.3, 0.3, colors.highlight),
      ],
      pad: [
        onePropPad(true),
        onePropPad(true),
        onePropPad(false),
      ],
      side: [
        onePropSide(),
        onePropSide(),
        onePropSide(),
      ],
    },
  };

  layout.addElementsOnePro = [
    // layout.oneProp,
    layout.sideTri,
    layout.angleTri,
  ];

  return layout;
}
