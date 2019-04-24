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
  'measure',
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
      color: colors.measure,
    },
  };

  const measureLengthMeasureLine = {
    name: 'measureLine',
    method: 'line',
    options: {
      width: 0.01,
      color: colors.measure,
      length: 4,
      vertexSpaceStart: 'center',
    },
  };

  const measureLengthLabel = {
    name: 'label',
    method: 'text',
    options: {
      color: colors.measure,
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
      color: colors.measure,
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
      color: colors.measure,
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

  const gridL = 5;
  const gridW = 2.5;
  layout.grid = {
    length: gridL,
    height: gridW,
  };

  const measureAreaGrid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-2.5, -1.5, 5, 2.5),
      xStep: 0.25,
      yStep: 0.25,
      numLinesThick: 2,
      color: colors.grid,
    },
  };
  const measureAreaCircle = {
    name: 'circle',
    method: 'polygon',
    options: {
      width: 0.03,
      color: colors.sides,
      sides: 100,
      radius: 0.625,
      position: [-1.75, -0.37],
    },
  };
  const measureAreaSquare = {
    name: 'square',
    method: 'polygon',
    options: {
      width: 0.03,
      color: colors.sides,
      sides: 4,
      radius: 0.89,
      rotation: Math.PI / 4,
      position: [0, -0.37],
    },
  };
  const measureAreaTriangle = {
    name: 'triangle',
    method: 'polygon',
    options: {
      width: 0.05,
      color: colors.sides,
      sides: 3,
      radius: 0.84,
      rotation: -Math.PI / 6,
      position: [1.7, -0.58],
    },
  };
  const measureArea = {
    name: 'area',
    method: 'collection',
    addElements: [
      measureAreaGrid,
      measureAreaCircle,
      measureAreaTriangle,
      measureAreaSquare,
    ],
  };
  const measure = {
    name: 'measure',
    method: 'collection',
    addElements: [
      measureLength,
      measureAngle,
      measureArea,
    ],
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const unitShapeCircle = {
    name: 'circle',
    method: 'polygon',
    options: {
      width: 0.01,
      color: colors.grid,
      sides: 100,
      radius: 0.125,
      trianglePrimitives: true,
    },
  };

  layout.genericGrid = {
    position: new Point(0, 0.2),
    smallPosition: new Point(-2, 0),
    sideLength: 0.3,
    waveMag: 0.015,
    width: 0.01,
    segments: 20,
  };

  const unitShape = {
    name: 'unitShape',
    method: 'collection',
    addElements: [
      unitShapeCircle,
    ],
  };

  layout.addElements = [
    examples,
    measure,
    unitShape,
  ];
  return layout;
}
