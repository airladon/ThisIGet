// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Rect,
  Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrAreaTriangle_sides',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const lineWidth = 0.02;
  const tri1 = [
    new Point(-1.5, -0.75),
    new Point(1.5, -0.75),
    new Point(0.3, 0.4),
  ];
  const tri = (name, points) => ({
    name,
    method: 'polyLine',
    options: {
      points,
      width: lineWidth,
      color: colors.qrAreaTriangle_sides,
      close: true,
    },
  });

  const base = (name, p1, p2, yOffset, text) => ({
    name,
    method: 'line',
    options: {
      width: lineWidth / 2,
      p1: p1.add(0, yOffset),
      p2: p2.add(0, yOffset),
      color: colors.qrAreaTriangle_sides,
      arrows: {
        width: lineWidth * 3,
        height: lineWidth * 3,
      },
      label: {
        text,
        offset: 0.01,
        location: 'bottom',
      },
    },
  });


  const side = new Line(tri1[0], tri1[2]);
  const t = new Transform().rotate(-side.ang + Math.PI).translate(0, -0.9);
  const temp = tri1.map(p => p.transformBy(t.m()));
  const tri2 = [temp[2], temp[0], temp[1]];

  const half = { frac: ['_1', '_2', 'v', 0.6] };

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      color: colors.diagram.text.base,
      elements: {
        Area: { color: colors.qrAreaTriangle_sides },
        equals: '  =  ',
        mul: ' \u00D7 ',
        _1: '1',
        _2: '2',
        v: { symbol: 'vinculum' },
        base: { color: colors.qrAreaTriangle_sides },
        height: { color: colors.qrAreaTriangle_sides },
      },
      forms: {
        '10': [
          'Area', 'equals', half, '  ', 'height', 'mul', 'base',
        ],
      },
    },
    mods: {
      scenarios: {
        qr: { position: [-0.6, 0.7] },
      },
    },
  };

  const heightLine = (position, length) => ({
    name: 'height',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'line',
        options: {
          angle: Math.PI / 2,
          color: colors.qrAreaTriangle_sides,
          width: 0.01,
          length,
          dashStyle: {
            style: [0.05, 0.02],
          },
          label: {
            text: 'height',
            orientation: 'horizontal',
            offset: 0.07,
            location: 'left',
          },
        },
      },
      {
        name: 'angle',
        method: 'angle',
        options: {
          angle: Math.PI / 2,
          color: colors.qrAreaTriangle_sides,
          autoRightAngle: true,
          curve: {
            width: 0.01,
            radius: 0.2,
          },
        },
      },
    ],
    options: {
      position,
    },
  });

  const height1 = {
    name: 'height1',
    method: 'collection',
    addElements: [
      base('base', tri1[0], tri1[1], -0.3, 'base'),
      heightLine([tri1[2].x, tri1[0].y], tri1[2].y - tri1[0].y),
      tri('tri', tri1),
    ],
    mods: {
      scenarios: {
        qr: { position: [-1.4, -0.25], scale: 0.8 },
      },
    },
  };

  const height2 = {
    name: 'height2',
    method: 'collection',
    addElements: [
      heightLine([tri2[2].x, tri2[0].y], tri2[2].y - tri2[0].y),
      {
        name: 'baseExtension',
        method: 'line',
        options: {
          color: colors.qrAreaTriangle_sides,
          width: 0.01,
          length: 0.8,
          angle: Math.PI,
          position: tri2[0],
          dashStyle: {
            style: [0.05, 0.02],
          },
          vertexSpaceStart: 'start',
        },
      },
      base('base', tri2[0], tri2[1], -0.3, 'base'),
      tri('tri', tri2),
    ],
    mods: {
      scenarios: {
        qr: { position: [1.3, 0], scale: 0.8 },
      },
    },
  };

  layout.addElements = [
    eqn,
    height1,
    height2,
  ];
  return layout;
}
