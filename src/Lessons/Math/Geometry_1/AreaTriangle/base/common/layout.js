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
  'angles',
  'grid',
  'area',
  'disabled',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const introTriangle = {
    name: 'triangle',
    method: 'polygon',
    options: {
      width: 0.05,
      color: colors.sides,
      sides: 3,
      radius: 0.84,
      rotation: -Math.PI / 6,
      position: [0, -0.58],
    },
  };

  const grid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-1.5, -1.25, 3, 1.75),
      xStep: 0.25,
      yStep: 0.25,
      numLinesThick: 2,
      color: colors.grid,
    },
  };

  const intro = {
    name: 'intro',
    method: 'collection',
    addElements: [
      grid,
      introTriangle,
    ],
    options: {
      position: [0, 0.2],
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const w = 3;
  const h = 1.5;
  const lineWidth = 0.02;
  const line = (name, position, angle, length, text) => ({
    name,
    method: 'line',
    options: {
      position,
      angle,
      length,
      vertexSpaceStart: 'center',
      label: {
        text,
        location: 'outside',
        offset: 0.1,
      },
      color: colors.sides,
      width: lineWidth,
    },
  });

  const rectangle = {
    name: 'rectangle',
    method: 'collection',
    addElements: [
      line('left', [-w / 2, 0], Math.PI / 2, h + lineWidth, 'B'),
      line('right', [w / 2, 0], -Math.PI / 2, h + lineWidth, 'B'),
      line('top', [0, h / 2], 0, w + lineWidth, 'A'),
      line('bottom', [0, -h / 2], -Math.PI, w + lineWidth, 'A'),
      line('diagonal', [0, 0], -Math.atan(h / w), Math.sqrt(w * w + h * h), ''),
    ],
    options: {
      position: [0, -0.4],
    },
  };

  const rectEqn = {
    name: 'rectEqn',
    method: 'addEquation',
    options: {
      position: [0, 0.9],
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      color: colors.diagram.text.base,
      elements: {
        Area: { color: colors.area },
        rect: { text: 'rectangle', color: colors.sides },
        tri: { text: 'triangle', color: colors.sides },
        equals: '  =  ',
        A: { color: colors.sides },
        B: { color: colors.sides },
        mul: ' \u00D7 ',
        _1: '1',
        _2: '2',
        v: { symbol: 'vinculum' },
      },
      forms: {
        'rect': [
          { sub: ['Area', 'rect'] }, 'equals', 'A', 'mul', 'B',
        ],
        'tri': [
          { sub: ['Area', 'tri'] },
          'equals',
          { frac: ['_1', '_2', 'v', 0.7] },
          ' ', 'A', 'mul', 'B',
        ],
      },
    },
  };

  layout.addElements = [
    intro,
    rectangle,
    rectEqn,
  ];
  return layout;
}
