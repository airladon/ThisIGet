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
  'grid',
  'sides',
  'areaTri',
  'areaTriLabel',
  'areaPoly',
  'areaPolyLabel',
  'areaCircle',
  'areaCircleLabel',
  'height',
  'border',
  'radius',
  'circumference',
  'disabled',
  'disabledLabel'
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const radius = 1.25;
  layout.radius = radius;
  const circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      radius,
      width: 0.03,
      sides: 200,
      color: colors.sides,
    },
  };

  const lightCircle = {
    name: 'lightCircle',
    method: 'polygon',
    options: {
      radius,
      width: 0.01,
      sides: 200,
      color: colors.disabled,
    },
  };

  const circleFill = {
    name: 'circleFill',
    method: 'polygon',
    options: {
      radius,
      fill: true,
      sides: 100,
      color: colors.areaCircle,
    },
  };

  const grid = {
    name: 'grid',
    method: 'grid',
    options: {
      xStep: 0.25,
      yStep: 0.25,
      bounds: new Rect(-radius, -radius, radius * 2, radius * 2),
      color: colors.grid,
    },
  };

  layout.polygonSides = [
    6,
    10,
    50,
  ];
  const triAngle = layout.polygonSides.map(a => Math.PI * 2 / a);
  const triPoints = triAngle.map(a => [
    [0, 0],
    [radius, 0],
    [radius * Math.cos(a), radius * Math.sin(a)],
  ]);

  const poly = (name, index) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'fill',
        method: 'polygon',
        options: {
          radius,
          fill: true,
          sides: layout.polygonSides[index],
          color: colors.areaPoly,
        },
      },
      {
        name: 'triFill',
        method: 'fan',
        options: {
          points: triPoints[index],
          color: colors.areaTri,
        },
      },
      {
        name: 'lines',
        method: 'radialLines',
        options: {
          outerRadius: radius,
          dAngle: Math.PI * 2 / layout.polygonSides[index],
          color: colors.sides,
          width: 0.008,
        },
      },
      {
        name: 'borderHighlight',
        method: 'polygon',
        options: {
          radius,
          width: 0.02,
          sides: layout.polygonSides[index],
          color: colors.border,
        },
      },
      {
        name: 'border',
        method: 'polygon',
        options: {
          radius,
          width: 0.008,
          sides: layout.polygonSides[index],
          color: colors.sides,
        },
      },
      {
        name: 'height',
        method: 'line',
        options: {
          p1: [0, 0],
          p2: [
            radius * Math.cos(triAngle[index] / 2) * Math.cos(triAngle[index] / 2),
            radius * Math.cos(triAngle[index] / 2) * Math.sin(triAngle[index] / 2),
          ],
          width: 0.015,
          label: {
            text: 'h',
            offset: 0.05,
            location: 'outside',
          },
          color: colors.height,
        },
      },
      {
        name: 'base',
        method: 'line',
        options: {
          p2: [radius, 0],
          p1: [
            radius * Math.cos(triAngle[index]),
            radius * Math.sin(triAngle[index]),
          ],
          width: 0.015,
          offset: 0.3,
          label: {
            text: 'b',
            offset: 0.05,
            location: 'outside',
          },
          arrows: {
            width: 0.05,
            height: 0.05,
          },
          color: colors.border,
        },
      },
    ],
  });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      circleFill,
      grid,
      circle,
      lightCircle,
      // polyFill('polyFill', layout.polygonSides[0]),
      // polyFill('polyFillMore', layout.polygonSides[1]),
      // polyFill('polyFillMost', layout.polygonSides[2]),
      poly('poly', 0),
      poly('polyMore', 1),
      poly('polyMost', 2),
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
        left: { position: [-1.2, -0.2] },
      },
    },
  };

  const AreaTri = {
    bottomComment: {
      content: 'Area', comment: 'tri', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaCirc = {
    bottomComment: {
      content: '_Area', comment: 'circle', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaAll = {
    bottomComment: {
      content: '__Area', comment: 'allTri', scale: 0.5, contentSpace: 0,
    },
  };
  const top = (content, commentText, symbol) => ({
    topComment: {
      content,
      comment: commentText,
      symbol,
    },
  });
  const half = { frac: ['_1', '_2', 'v', 0.6] };
  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      elements: {
        Area: { color: colors.sides },
        _Area: { text: 'Area', color: colors.sides },
        __Area: { text: 'Area', color: colors.sides },
        tri: { text: 'triangle', color: colors.sides },
        allTri: { text: 'all triangles', color: colors.sides },
        circle: { text: 'circle', color: colors.sides },
        equals: '  =  ',
        mul: ' \u00D7 ',
        _mul: ' \u00D7 ',
        h: { text: 'h', color: colors.height },
        b: { text: 'b', color: colors.border },
        border: { text: 'border', color: colors.border },
        r: { text: 'r', color: colors.radius },
        _r: { text: 'r', color: colors.radius },
        _1: '1',
        _2: '2',
        __2: '2',
        sides: { text: `${layout.polygonSides[0]}` },
        v: { symbol: 'vinculum' },
        brace: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.disabled,
        },
        sBrace: {
          symbol: 'brace', side: 'top', numLines: 1, color: colors.disabled,
        },
        s: { symbol: 'strike', color: colors.disabled },
        _s: { symbol: 'strike', color: colors.disabled },
      },
      forms: {
        '0': [AreaTri, 'equals', half, ' ', 'h', 'mul', 'b'],
        '1': [AreaAll, 'equals', half, ' ', 'h', 'mul', 'b', '_mul', 'sides'],
        '2': [
          AreaAll, 'equals', half, ' ', 'h', 'mul',
          top(['b', '_mul', 'sides'], 'border', 'brace'),
        ],
        '3': [AreaAll, 'equals', half, ' ', 'h', 'mul', 'border'],
      },
    },
    mods: {
      scenarios: {
        right: { position: [1.2, 0] },
      },
    },
  };


  layout.addElements = [
    fig,
    eqn,
  ];
  return layout;
}
