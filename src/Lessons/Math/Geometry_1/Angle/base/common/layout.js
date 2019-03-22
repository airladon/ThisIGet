// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const cssColorNames = [
  'lines',
  'angles',
  'moreSharp',
  'lessSharp',
  'center',
  'arrow',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  layout.position = new Point(0, 0);

  const width = 0.02;
  const scenarios = {
    left: { position: new Point(-1.5, 0) },
    center: { position: new Point(0, -0.2) },
    right: { position: new Point(1.5, 0) },
  };

  const d = 0.5;
  const cornerLength = 0.1;
  const square = [
    [-d, -d],
    [d, -d],
    [d, d],
    [-d, d],
  ];

  const t = d * 1.3;
  const angles = [
    210 * Math.PI / 180,
    90 * Math.PI / 180,
    -30 * Math.PI / 180,
  ];
  const tri = [
    [t * Math.cos(angles[0]), t * Math.sin(angles[0])],
    [t * Math.cos(angles[1]), t * Math.sin(angles[1])],
    [t * Math.cos(angles[2]), t * Math.sin(angles[2])],
  ];

  const pent = [
    [-0.5, -0.5],
    [0.5, -0.2],
    [0.3, 0.1],
    [0.5, 0.5],
    [-0.2, 0.4],
  ];

  layout.shape1 = {
    name: 'shape1',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: { points: square, color: colors.lines, width },
      },
      {
        name: 'corners',
        method: 'polyLineCorners',
        options: {
          points: square, color: colors.lines, width: width * 3, cornerLength,
        },
      },
      {
        name: 'lessSharpCorners',
        method: 'polyLineCorners',
        options: {
          points: square, color: colors.lessSharp, width: width * 3, cornerLength,
        },
      },
    ],
    mods: { scenarios },
    scenario: 'left',
  };

  layout.shape2 = {
    name: 'shape2',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: { points: tri, color: colors.lines, width },
      },
      {
        name: 'corners',
        method: 'polyLineCorners',
        options: {
          points: tri, color: colors.lines, width: width * 3, cornerLength,
        },
      },
      {
        name: 'moreSharpCorners',
        method: 'polyLineCorners',
        options: {
          points: tri, color: colors.moreSharp, width: width * 3, cornerLength,
        },
      },
    ],
    mods: { scenarios },
    scenario: 'center',
  };

  const corner = (index, color, p1, p2, p3) => ({
    name: `corner${index}`,
    method: 'polyLineCorners',
    options: {
      points: [p1, p2, p3],
      color,
      width: width * 3,
      cornerLength,
      close: false,
    },
  });

  layout.shape3 = {
    name: 'shape3',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: { points: pent, color: colors.lines, width },
      },
      {
        name: 'corners',
        method: 'polyLineCorners',
        options: {
          points: pent, color: colors.lines, width: width * 3, cornerLength,
        },
      },
      {
        name: 'moreSharpCorners',
        method: 'collection',
        addElements: [
          corner(1, colors.moreSharp, pent[4], pent[0], pent[1]),
          corner(2, colors.moreSharp, pent[0], pent[1], pent[2]),
          corner(3, colors.moreSharp, pent[2], pent[3], pent[4]),
        ],
      },
      {
        name: 'lessSharpCorners',
        method: 'collection',
        addElements: [
          corner(1, colors.lessSharp, pent[1], pent[2], pent[3]),
          corner(2, colors.lessSharp, pent[3], pent[4], pent[0]),
        ],
      },
    ],
    mods: { scenarios },
    scenario: 'right',
  };

  layout.shapes = {
    name: 'shapes',
    method: 'collection',
    addElements: [
      layout.shape1,
      layout.shape2,
      layout.shape3,
    ],
    mods: {
      scenarios: {
        center: { position: new Point(0, 0 ) },
      },
    },
    scenario: 'center',
  };

  // //////////////////////////////////////////////////
  // Angle
  // //////////////////////////////////////////////////
  const length = 1.5;
  const lineWidth = 0.03;
  const angleRadius = 0.3;
  layout.angle = {
    name: 'angle',
    method: 'collection',
    mods: {
      scenarios: {
        center: { position: new Point(0, 0) },
      },
    },
    scenario: 'center',
    addElements: [
      {
        name: 'fill',
        method: 'polygon',
        options: {
          radius: angleRadius,
          fill: true,
          color: colors.angles,
          sides: 200,
        },
      },
      {
        name: 'line1',
        method: 'line',
        options: {
          length,
          width: lineWidth,
          color: colors.lines,
          move: {
            type: 'rotation',
            middleLengthPercent: 0,
          },
        },
      },
      {
        name: 'line2',
        method: 'line',
        options: {
          length,
          width: lineWidth,
          color: colors.lines,
        },
      },
    ],
  };


  layout.addElements = [
    layout.shapes,
    layout.angle,
  ];
  return layout;
}
