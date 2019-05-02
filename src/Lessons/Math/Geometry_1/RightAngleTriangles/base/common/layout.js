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
  'description',
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
  const scale = 0.4;
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
        left: { position: [-2.7, -1.2] },
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

  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  const elements = {
    Area: { color: colors.sides },
    _Area: { text: 'Area', color: colors.sides },
    __Area: { text: 'Area', color: colors.sides },
    largeSquare: { text: 'large square', color: colors.sides },
    smallSquare: { text: 'small square', color: colors.sides },
    triangle: { text: 'triangle', color: colors.sides },
    lb: { symbol: 'bracket', side: 'left' },
    rb: { symbol: 'bracket', side: 'right' },
    A: { color: colors.sides },
    B: { color: colors.sides },
    _A: { text: 'A', color: colors.sides },
    _B: { text: 'B', color: colors.sides },
    __A: { text: 'A', color: colors.sides },
    __B: { text: 'B', color: colors.sides },
    ___A: { text: 'A', color: colors.sides },
    ___B: { text: 'B', color: colors.sides },
    _AB: { text: 'AB', color: colors.sides },
    AB: { text: 'AB', color: colors.sides },
    m2AB: { text: '-2AB', color: colors.description },
    _m2AB: { text: '-2AB', color: colors.description },
    C: { text: 'C', color: colors.sides },
    equals: '  =  ',
    plus: ' + ',
    _plus: ' + ',
    __plus: ' + ',
    ___plus: ' + ',
    _2a: '2',
    _2b: '2',
    _2c: '2',
    _2d: '2',
    _2e: '2',
    _2f: '2',
    _2g: '2',
    _1: '1',
    __2_: '2',
    _4: '4',
    mul: ' \u00D7 ',
    v: { symbol: 'vinculum' },
    'brace': {
      symbol: 'brace', side: 'top', numLines: 2, color: colors.description,
    },
    'x': { symbol: 'xStrike', color: colors.description },
    '_x': { symbol: 'xStrike', color: colors.description },
  };

  const top = (content, commentText, symbol) => ({
    topComment: {
      content,
      comment: commentText,
      symbol,
      includeInSize: false,
    },
  });
  const AreaTri = {
    bottomComment: {
      content: 'Area', comment: 'triangle', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaSSquare = {
    bottomComment: {
      content: '_Area', comment: 'smallSquare', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaLSquare = {
    bottomComment: {
      content: '__Area', comment: 'largeSquare', scale: 0.5, contentSpace: 0,
    },
  };
  const half = { frac: ['_1', '_2g', 'v', 0.7] };
  const sup = (content, s) => ({ sup: [content, ['  ', s]] });

  const ann = (content, annotation) => ({
    annotate: {
      content,
      withAnnotations: {
        annotation: {
          annotation,
          relativeToContent: ['center', 1.4],
          relativeToAnnotation: ['center', 'bottom'],
          scale: 0.5,
        },
      },
      includeAnnotationInSize: false,
    },
  });

  const eqn = (name, y, defaultFormSeries) => ({
    // name: 'eqn',
    name,
    method: 'addNavigator',
    options: {
      navType: 'description',
      color: colors.diagram.text.base,
      defaultFormAlignment: {
        alignH: 'center',
        alignV: 'baseline',
      },
      scale: 0.9,
      elements,
      forms: {
        '0': {
          content: [
            AreaLSquare, 'equals', '_4', 'mul', AreaTri, '__plus', AreaSSquare,
          ],
          description: 'Area of a large square:',
        },
        '0a': {
          content: [
            top(
              AreaLSquare,
              { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
              'brace',
            ),
            'equals', '_4', 'mul',
            AreaTri,
            '__plus',
            AreaSSquare,
          ],
          description: 'Large square side is A+B, and area is square of side:',
        },
        '0b': {
          content: [
            { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
            'equals', '_4', 'mul',
            AreaTri,
            '__plus',
            AreaSSquare,
          ],
          description: 'Large square side is A+B, and area is square of side:',
        },
        '0c': {
          content: [
            { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
            'equals', '_4', 'mul',
            top(AreaTri, [half, '_A', '_B'], '_brace'),
            '__plus',
            AreaSSquare,
          ],
          description: 'Right triangle area is half of product of two sides adjacent to right angle:',
        },
        '0d': {
          content: [
            { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
            'equals', '_4', 'mul',
            half, '_A', '_B',
            '__plus',
            AreaSSquare,
          ],
          description: 'Right triangle area is half of product of two sides adjacent to right angle:',
        },
        '0e': {
          content: [
            { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
            'equals', '_4', 'mul',
            half, '_A', '_B',
            '__plus',
            top(AreaSSquare, sup('C', '_2b'), '__brace'),
          ],
          description: 'Side length of small square is C, and area is side squared:',
        },
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        '1': {
          content: [
            { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
            'equals',
            '_4', 'mul', half, '_A', '_B',
            '__plus', sup('C', '_2b'),
          ],
          description: 'Substitute in areas:',
        },
        '1a': {
          content: [
            top(
              { sup: [{ brac: [['A', '___plus', 'B'], 'lb', 'rb'] }, '_2a'] },
              [
                sup('___A', '_2c'), 'plus', '_2f', '__A', '__B',
                '_plus', sup('___B', '_2d'),
              ],
              'brace',
            ),
            'equals',
            '_4', 'mul', half, '_A', '_B',
            '__plus', sup('C', '_2b'),
          ],
          description: 'Expand the left side',
        },

        '1b': {
          content: [
            sup('___A', '_2c'), 'plus', '_2f', '__A', '__B',
            '_plus', sup('___B', '_2d'),
            'equals',
            '_4', 'mul', half, '_A', '_B',
            '__plus', sup('C', '_2b'),
          ],
          description: 'Expand the left side',
        },

        '1c': {
          content: [
            sup('___A', '_2c'), 'plus', '_2f', '__A', '__B',
            '_plus', sup('___B', '_2d'),
            'equals',
            top(['_4', 'mul', half], '_2e', 'brace'),
            '_A', '_B',
            '__plus', sup('C', '_2b'),
          ],
          description: 'Simplify the right side',
        },

        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        // ////////////////////////////////////////////////////////////
        '2': {
          content: [
            sup('___A', '_2c'), 'plus', '_2f', '__A', '__B', '_plus', sup('___B', '_2d'),
            'equals',
            '_2e', '_A', '_B',
            '__plus', sup('C', '_2b'),
          ],
          description: 'Expand left side, and simplify the right:',
        },

        '2a': {
          content: [
            sup('___A', '_2c'), 'plus',
            ann({ strike: [['_2f', '__A', '__B'], 'x'] }, 'm2AB'),
            '_plus', sup('___B', '_2d'),
            'equals',
            ann({ strike: [['_2e', '_A', '_B'], '_x'] }, '_m2AB'),
            '__plus', sup('C', '_2b'),
          ],
          description: 'Expand left side, and simplify the right:',
        },


        '3': {
          content: [
            sup('___A', '_2c'), 'plus', sup('___B', '_2d'),
            'equals',
            sup('C', '_2b'),
          ],
          description: 'Subtract 2AB from both sides:',
        },
      },
      formSeries: {
        '1': ['0', '0a', '0b', '0c', '0d', '0e', '1'],
        '2': ['1', '1a', '1b', '1c', '2'],
        '3': ['2', '2a', '3'],
      },
      defaultFormSeries,
    },
    mods: {
      scenarios: {
        default: { position: [1.8, y] },
      },
    },
  });

  const nav = (name, y, interactive, defaultFormSeries = null) => ({
    name,
    method: 'addNavigator',
    options: {
      navType: 'description',
      equation: eqn(`${name}Eqn`, y, defaultFormSeries),
      interactive,
      alignV: 'middle',
    },
    mods: {
      scenarios: {
        default: { position: [0.2, y] },
      },
    },
  });

  layout.addElements = [
    fig,
    nav('0', 0.8, false),
    nav('1', 0.1, true, '1'),
    nav('2', -0.6, true, '2'),
    nav('3', -1.3, true, '3'),
  ];
  return layout;
}
