// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'angle1',
  'angle2',
  'angle3',
  'angles',
  'disabled',
  'parallel',
  'pads',
  'sideLengths',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.03;
  const exampleTri = {
    method: 'polyLine',
    options: {
      width: layout.width,
      color: colors.lines,
      close: true,
    },
  };

  const tri1 = joinObjects({}, exampleTri, {
    name: 'tri1',
    options: {
      points: [
        [-0.5, -0.5],
        [0, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-1.7, 0),
    },
  });

  const tri2 = joinObjects({}, exampleTri, {
    name: 'tri2',
    options: {
      points: [
        [-0.5, -0.5],
        [0.5, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-0.15, 0),
    },
  });

  const tri3 = joinObjects({}, exampleTri, {
    name: 'tri3',
    options: {
      points: [
        [-0.3, -0.5],
        [-0.8, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(1.7, 0),
    },
  });

  const triangleExamples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      tri1,
      tri2,
      tri3,
    ],
  };

  // ////////////////////////////////////////////////////////
  //   Variable Triangle
  // ////////////////////////////////////////////////////////
  layout.defaultTri = [
    [2, -1.1],
    [-2, -1.1],
    [-1, 0.7],
  ];
  layout.customTriangle = {
    name: 'customTriangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      pad: {
        color: colors.pads,
        radius: 0.2,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.9, -1.9, 5.8, 3.3],
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        autoRightAngle: false,
      },
      side: {
        offset: 0.3,
        color: colors.sideLengths,
        showLine: true,
        width: layout.width / 2,
        vertexSpaceStart: 'center',
        arrows: {
          width: 0.08,
          height: 0.08,
        },
      },
    },
    mods: {
      _pad0: { scenarios: { props: { position: layout.defaultTri[0] } } },
      _pad1: { scenarios: { props: { position: layout.defaultTri[1] } } },
      _pad2: { scenarios: { props: { position: layout.defaultTri[2] } } },
    },
  };

  // ////////////////////////////////////////////////////////
  //   Total Angle
  // ////////////////////////////////////////////////////////

  layout.triangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      pad: {
        color: colors.diagram.background,
        radius: 0.2,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.5, -1.7, 5, 3],
      },
      // angle: {
      //   color: colors.angles,
      //   curve: {
      //     radius: 0.3,
      //     width: layout.width,
      //   },
      //   autoRightAngle: false,
      // },
      side: {
        label: {
          text: '',
        },
      },
    },
  };

  layout.fixedTriangle = {
    name: 'fixedTriangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
    },
  };

  // layout.fixedTriangleWindow = new Rect(-2.5, -1.7, 5, 3);
  layout.fixedTriangleCenter = new Point(0, -0.2);

  const angles = {
    method: 'angle',
    options: {
      curve: {
        width: layout.width,
        radius: 0.3,
        label: {
          radius: 0.31,
        },
      },
    },
  };

  layout.angleA = joinObjects({}, angles, {
    name: 'angleA',
    options: { color: colors.angle1, label: { text: 'a' } },
  });

  layout.angleB = joinObjects({}, angles, {
    name: 'angleB',
    options: { color: colors.angle2, label: { text: 'b' } },
  });

  layout.angleC = joinObjects({}, angles, {
    name: 'angleC',
    options: { color: colors.angle3, label: { text: 'c' } },
  });

  layout.angleATop = joinObjects({}, angles, {
    name: 'angleATop',
    options: { color: colors.angle1, label: { text: 'a' } },
  });

  layout.angleBTop = joinObjects({}, angles, {
    name: 'angleBTop',
    options: { color: colors.angle2, label: { text: 'b' } },
  });

  layout.topParallel = {
    name: 'topParallel',
    method: 'line',
    options: {
      length: 5.5,
      width: layout.width / 3,
      color: colors.parallel,
      vertexSpaceStart: 'center',
    },
    mods: { scenarios: { offscreen: { position: [0, 2] } } },
  };

  layout.bottomParallel = {
    name: 'bottomParallel',
    method: 'line',
    options: {
      length: 5.5,
      width: layout.width / 3,
      color: colors.parallel,
      vertexSpaceStart: 'center',
    },
    mods: { scenarios: { offscreen: { position: [0, -2] } } },
  };

  layout.totalAngle = {
    name: 'totalAngle',
    method: 'collection',
    addElements: [
      layout.angleA,
      layout.angleB,
      layout.angleC,
      layout.angleATop,
      layout.angleBTop,
      layout.bottomParallel,
      layout.topParallel,
      layout.triangle,
      layout.fixedTriangle,
    ],
  };
  layout.addElements = [
    triangleExamples,
    layout.customTriangle,
    layout.totalAngle,
  ];
  return layout;
}
