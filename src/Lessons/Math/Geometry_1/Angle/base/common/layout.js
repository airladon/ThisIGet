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
    center: { position: new Point(0, 0) },
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
  const tri = [
    [-d, -d],
    [0, d],
    [d, -d],
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
  };

  layout.addElements = [
    layout.shapes,
  ];
  return layout;
}
