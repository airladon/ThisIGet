// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.lines = colors.get('blue').rgb;
  colors.sideLengths = colors.get('yellow').rgb;
  colors.angles = colors.get('green').rgb;
  colors.angle1 = colors.get('green').rgb;
  colors.angle2 = colors.get('red').rgb;
  colors.angle3 = colors.get('yellow').rgb;
  colors.disabled = colors.get('grey', 'darker').rgb;
  colors.parallel = colors.get('red').rgb;
  colors.pads = colors.get('red', 'lighter').rgb;
  layout.width = 0.03;
  const exampleTri = {
    method: 'polyline',
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
    method: 'polyline',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      pointsAt: 'autoInside',
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
    method: 'polyline',
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
    method: 'polyline',
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
        radius: 0.4,
        sides: 400,
      },
      label: {
        radius: 0.4,
        scale: 1,
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

  layout.eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      elements: {
        a: { color: colors.angle1 },
        b: { color: colors.angle2 },
        c: { color: colors.angle3 },
        equals: '  =  ',
        _180: '180º',
        plus: ' + ',
        plus_: ' + ',
      },
      scale: 1,
      color: colors.diagram.text.base,
      forms: {
        '0': ['a', 'plus', 'b', 'plus_', 'c', 'equals', '_180'],
      },
    },
    mods: {
      scenarios: {
        top: { position: [-1.6, 1.22], scale: 1 },
      },
    },
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
      layout.eqn,
    ],
  };

  // ////////////////////////////////////////////////////////
  //   Triangle Types
  // ////////////////////////////////////////////////////////
  layout.triangleTypes = {
    name: 'triangleType',
    method: 'polyline',
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
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        label: {
          radius: 0.31,
        },
        autoRightAngle: true,
      },
      side: {
        label: {
          // text: '',
          offset: 0.1,
        },
      },
    },
    mods: {
      scenarios: {
        left: { position: [1, 0.3], scale: 0.8 },
      },
    },
  };

  layout.typeDefinition = {
    name: 'definition',
    method: 'textHTML',
    options: {
      // size: 0.15,
      // color: colors.diagram.text.base,
      id: 'triangle_type_definition',
      text: 'test',
      yAlign: 'top',
      xAlign: 'center',
      position: [1.3, -0.8],
    },
  };

  layout.addElements = [
    layout.typeDefinition,
    triangleExamples,
    layout.customTriangle,
    layout.totalAngle,
    layout.triangleTypes,
  ];
  return layout;
}
