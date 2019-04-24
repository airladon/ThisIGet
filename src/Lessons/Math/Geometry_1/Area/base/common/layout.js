// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'example1',
  'example2',
  'disabled',
  'grid',
  'angles',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const exampleSquareLarge = {
    name: 'largeSquare',
    method: 'rectangle',
    options: {
      width: 2,
      height: 2,
      color: colors.example1,
      position: [-1, 0],
    },
  };

  const exampleSquareSmall = {
    name: 'smallSquare',
    method: 'rectangle',
    options: {
      width: 1,
      height: 1,
      color: colors.example2,
      position: [1.2, 0],
    },
  };

  const exampleCircleLarge = {
    name: 'largeCircle',
    method: 'polygon',
    options: {
      fill: true,
      radius: 1,
      sides: 200,
      color: colors.example1,
      position: [-1, 0],
    },
  };

  const examples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      exampleSquareLarge,
      exampleSquareSmall,
      exampleCircleLarge,
    ],
    options: {
      position: [0, -0.2],
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////

  const measureLengthTicks = {
    name: 'ticks',
    method: 'grid',
    options: {
      bounds: new Rect(-2, -0.05, 4, 0.1),
      xStep: 1,
      yStep: 0,
      numLinesThick: 2,
      color: colors.grid,
    },
  };

  const measureLengthMeasureLine = {
    name: 'measureLine',
    method: 'line',
    options: {
      width: 0.01,
      color: colors.grid,
      length: 4,
      vertexSpaceStart: 'center',
    },
  };

  const measureLengthLabel = {
    name: 'label',
    method: 'text',
    options: {
      color: colors.grid,
      text: '1m',
      position: [-1.5, 0.15],
      size: 0.15,
    },
  };

  const measureLengthLine = {
    name: 'line',
    method: 'line',
    options: {
      width: 0.03,
      color: colors.sides,
      length: 4,
      vertexSpaceStart: 'center',
      position: [0, -0.5],
    },
  };

  const measureLength = {
    name: 'length',
    method: 'collection',
    addElements: [
      measureLengthTicks,
      measureLengthMeasureLine,
      measureLengthLabel,
      measureLengthLine,
    ],
  };

  const measureAngleRadius = 2.2;
  const measureAngleAngle = {
    name: 'angle',
    method: 'polyLine',
    options: {
      points: [
        [measureAngleRadius, 0],
        [0, 0],
        [
          measureAngleRadius * Math.cos(Math.PI / 3),
          measureAngleRadius * Math.sin(Math.PI / 3),
        ],
      ],
      width: 0.02,
      color: colors.sides,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: 0.02,
        },
        label: {
          text: null,
          radius: 0.3,
        },
      },
    },
  };

  const measureAngleDegrees = {
    name: 'degrees',
    method: 'radialLines',
    options: {
      innerRadius: measureAngleRadius + 0.25,
      outerRadius: measureAngleRadius + 0.3,
      width: 0.01,
      color: colors.grid,
      dAngle: Math.PI / 180,
      angle: Math.PI / 3,
    },
  };

  const measureAngle10Degrees = {
    name: 'degrees10',
    method: 'radialLines',
    options: {
      innerRadius: measureAngleRadius + 0.2,
      outerRadius: measureAngleRadius + 0.3,
      width: 0.01,
      color: colors.grid,
      dAngle: Math.PI / 18,
      angle: Math.PI / 3,
    },
  };

  const measureAngle = {
    name: 'angle',
    method: 'collection',
    addElements: [
      measureAngleAngle,
      measureAngleDegrees,
      measureAngle10Degrees,
    ],
    options: {
      position: [-1.25, -1.5],
    },
  };


  const measure = {
    name: 'measure',
    method: 'collection',
    addElements: [
      measureLength,
      measureAngle,
    ],
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////

  layout.addElements = [
    examples,
    measure,
  ];
  return layout;
}
