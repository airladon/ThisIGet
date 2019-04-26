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
  // const pent1 = [
  //   [-0.2, 0.4],
  //   [0.5, 0.5],
  //   [0.3, 0.1],
  //   [0.5, -0.2],
  //   [-0.5, -0.5],
  // ];

  layout.shape1 = {
    name: 'shape1',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points: square, color: colors.lines, width, close: true,
        },
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
        options: {
          points: tri, color: colors.lines, width, close: true,
        },
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
        options: {
          points: pent, color: colors.lines, width, close: true,
        },
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
  const angleRadius = 0.5;
  layout.arrowLocation = length * 0.9;
  layout.angle = {
    name: 'angle',
    method: 'collection',
    mods: {
      scenarios: {
        center: { position: new Point(0, -0.5) },
        summary: { position: new Point(0, -0.35), scale: 0.8 },
      },
    },
    scenario: 'center',
    addElements: [
      {
        name: 'anchor',
        method: 'polygon',
        options: {
          radius: 0.1,
          fill: true,
          sides: 40,
          color: colors.center,
        },
      },
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
        mods: {
          scenarios: {
            offScreen: { position: new Point(-5, 0), rotation: 0 },
            vertical: { position: new Point(-0.5, 0), rotation: Math.PI / 2 },
            start: { position: new Point(0, 0), rotation: 0 },
          },
          interactiveLocation: new Point(length * 0.8, 0),
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
        mods: {
          scenarios: {
            offScreen: { position: new Point(5, 0), rotation: Math.PI },
            vertical: { position: new Point(0.5, 0), rotation: Math.PI / 2 },
            start: { position: new Point(0, 0), rotation: 0 },
          },
        },
      },
      {
        name: 'arrow',
        method: 'arrow',
        options: {
          width: 0.1,
          legWidth: 0.05,
          height: 0.1,
          legHeight: 0.05,
          color: colors.arrow,
          tip: [0, 0],
          // position: [layout.arrowLocation, -lineWidth / 2],
        },
      },
    ],
  };

  // //////////////////////////////////////////////////
  // Example
  // //////////////////////////////////////////////////
  const points = pent;

  const shape = {
    name: 'shape',
    method: 'polyLine',
    options: {
      points,
      width,
      close: true,
      color: colors.lines,
      // close: true,
      // angle: {
      //   label: {
      //     text: null,
      //   },
      //   curve: {
      //     radius: 0.1,
      //   },
      // },
    },
  };

  const angle = (index, p1, p2, p3, r = 0.2) => ({
    name: `angle${index}`,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        width: width * 0.6,
        radius: r,
      },
      label: {
        text: index,
        textScale: 0.5,
        radius: r - 0.04,
      },
      color: colors.angles,
    },
  });

  layout.example = {
    name: 'example',
    method: 'collection',
    addElements: [
      shape,
      angle('a', pent[1], pent[0], pent[4]),
      angle('b', pent[2], pent[1], pent[0]),
      angle('c', pent[3], pent[2], pent[1], 0.11),
      angle('d', pent[4], pent[3], pent[2]),
      angle('e', pent[0], pent[4], pent[3]),
    ],
    mods: {
      scenarios: {
        main: { position: new Point(0, -0.2), scale: new Point(2.3, 2.3) },
      },
    },
    scenario: 'main',
  };

  layout.addElements = [
    layout.shapes,
    layout.angle,
    layout.example,
  ];
  return layout;
}
