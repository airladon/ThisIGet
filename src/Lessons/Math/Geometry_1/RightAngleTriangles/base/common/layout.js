// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Transform,
  // Line,
  getPoint,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'rightAngle',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const leftSide = 3;
  const p0 = new Point(0, 0);
  const p1 = p0
    .add(leftSide * Math.cos(Math.PI / 6), leftSide * Math.sin(Math.PI / 6));
  const height = p1.y - p0.y;
  const p2 = new Point(
    p1.x + height / Math.tan(Math.PI / 3),
    p0.y,
  );
  const triPoints = [p0, p1, p2];
  const tri2Points = triPoints.map(p => p.transformBy(
    (new Transform().rotate(Math.PI / 6 * 5).translate(leftSide, 0)).m(),
  ));

  const angle = (color = colors.angles, radius = 0.3) => ({
    curve: {
      radius,
      sides: 100,
    },
    autoRightAngle: true,
    color,
  });
  const side = (text, scale) => ({
    label: {
      text, location: 'outside', offset: 0.05, scale,
    },
  });

  const tri = (name, points = triPoints, position = [0, 0], rotation = 0, scale = 1, textScale = 1) => ({
    name,
    method: 'polyLine',
    options: {
      color: colors.sides,
      close: true,
      width: 0.03,
      points,
      side: [
        side('A', textScale),
        side('B', textScale),
        side('C', textScale),
      ],
      angle: [
        angle(colors.angles, 0.4),
        angle(colors.rightAngle, 0.4),
        angle(),
      ],
    },
    mods: {
      scenarios: {
        default: { position, rotation, scale },
        split: {
          position: [getPoint(position).x / 1.3, getPoint(position).y / 2],
          rotation: 0,
          scale,
        },
        together: { position: [0, 0], rotation: 0, scale: 0.5 },
        normalSize: { position: [0, 0], rotation: 0, scale: 1 },
      },
    },
  });

  const heightLine = {
    name: 'height',
    method: 'collection',
    addElements: [
      {
        name: 'angle',
        method: 'angle',
        options: {
          color: colors.sides,
          autoRightAngle: true,
          curve: {
            radius: 0.2,
          },
          position: [p1.x, p0.y],
          rotation: 0,
          angle: Math.PI / 2,
        },
      },
      {
        name: 'line',
        method: 'line',
        options: {
          color: colors.sides,
          position: [p1.x, p0.y],
          angle: Math.PI / 2,
          vertexSpaceStart: 'start',
          width: 0.01,
          dashStyle: {
            style: [0.05],
          },
          length: height,
          label: {
            text: 'height',
            orientation: 'horizontal',
            location: 'left',
            offset: 0.06,
          },
        },
      },
    ],
  };

  const base = {
    name: 'base',
    method: 'line',
    options: {
      color: colors.sides,
      p1: p0,
      p2,
      width: 0.01,
      label: {
        text: 'base',
        location: 'bottom',
        offset: 0.06,
      },
    },
  };

  const baseA = {
    name: 'baseA',
    method: 'line',
    options: {
      color: colors.sides,
      p1: p0,
      p2: p1,
      width: 0.01,
      label: {
        text: 'base',
        location: 'outside',
        offset: 0.06,
      },
    },
  };

  const heightB = {
    name: 'heightB',
    method: 'line',
    options: {
      color: colors.sides,
      p1,
      p2,
      width: 0.01,
      label: {
        text: 'height',
        location: 'outside',
        offset: 0.06,
      },
    },
  };

  const mainTri = {
    name: 'main',
    method: 'collection',
    addElements: [
      tri('tri'),
      heightLine,
      heightB,
      base,
      baseA,
    ],
    mods: {
      scenarios: {
        default: { position: [-1.7, -0.8], rotation: 0, scale: 1 },
        aDown: { position: [1.7, -0.7], rotation: Math.PI / 6 * 5, scale: 1 },
      },
    },
  };

  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  const scale = 0.5;
  const textScale = 1;
  const sideA = scale * leftSide;
  const sideB = scale * height / Math.sin(Math.PI / 3);
  const AB = sideA + sideB;
  const pythagorusSquare = {
    name: 'pythagorusSquare',
    method: 'collection',
    addElements: [
      tri('bottomLeft', tri2Points, [0, 0], 0, scale, textScale),
      tri('bottomRight', tri2Points, [AB, 0], Math.PI / 2, scale, textScale),
      tri('topRight', tri2Points, [AB, AB], Math.PI, scale, textScale),
      tri('topLeft', tri2Points, [0, AB], Math.PI * 3 / 2, scale, textScale),
    ],
    mods: {
      scenarios: {
        default: { position: [-1, -1.4] },
        left: { position: [-2.5, -1.4] },
        split: { position: [-1.5, -1.4] },
        together: { position: [-0.5, -0.5] },
        normalSize: { position: [-1.5, -1] },
      },
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      mainTri,
      pythagorusSquare,
    ],
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: 1 },
      },
    },
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
