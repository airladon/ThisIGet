// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'highlight',
  'grey',
  'darkGrey',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const points = [
    new Point(-1.5, -1).add(0.3, 0),
    new Point(0, 1).add(0.3, 0),
    new Point(0, -1).add(0.3, 0),
  ];

  const split = [
    new Point(-1, -0.33).add(0.3, 0),
    new Point(0, -0.33).add(0.3, 0),
  ];

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points,
      color: colors.sides,
      close: true,
      width: 0.02,
      side: [
        side('M'),
        side('N'),
        side('B'),
      ],
    },
  };

  const label = (text, p1, p2) => ({
    name: `label${text}`,
    method: 'line',
    options: {
      p1,
      p2,
      offset: 0.4,
      label: {
        text,
        // offset: 0.05,
        location: 'outside',
        color: colors.sides,
      },
      arrows: {
        width: 0.05,
        height: 0.05,
      },
      color: colors.grey,
      dashStyle: {
        style: [(new Line(p1, p2)).distance / 2 - 0.05 - 0.2, 0.4],

      },
      width: 0.005,
    },
  });

  const splitLine = {
    name: 'split',
    method: 'line',
    options: {
      p1: split[0],
      p2: split[1],
      color: colors.sides,
      width: 0.02,
    },
  };

  const splitTri = {
    name: 'splitTri',
    method: 'polyLine',
    options: {
      // points: [
      //   split[0].add(0.025, 0),
      //   points[1].add(-0.02, -0.06),
      //   split[1].add(-0.02, 0),
      // ],
      points: [
        split[0],
        points[1],
        split[1],
      ],
      color: colors.highlight,
      close: true,
      width: 0.02,
      side: [
        side('m'),
        side('n'),
        side('b'),
      ],
      // transform: new Transform().translate(0, 0).scale(0.98),
    },
  };

  const construction = {
    name: 'construction',
    method: 'line',
    options: {
      p1: split[0],
      p2: points[2],
      color: colors.grey,
      width: 0.01,
    },
  };

  const areaLabel = (text, p) => ({
    name: `area${text}`,
    method: 'text',
    options: {
      text,
      position: p,
      size: 0.15,
      color: colors.grey,
    },
  });

  const rightAngle = (name, p1, p2, p3, color = colors.sides) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      color,
      curve: {
        radius: 0.2,
        width: 0.01,
      },
      autoRightAngle: true,
    },
  });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      rightAngle('rightAngle', points[1], points[2], points[0]),
      rightAngle('splitRightAngle', points[1], split[1], split[0], colors.sides),
      tri,
      splitLine,
      splitTri,
      construction,
      label('M', points[0], points[1]),
      label('N', points[1], points[2]),
      areaLabel('1', [-0.65, -0.75]),
      areaLabel('2', [0.05, -0.55]),
      areaLabel('3', [-0.05, 0]),
    ],
    mods: {
      scenarios: {
        left: { position: [-1.2, -0.3] },
        center: { position: [0.5, -0.3] },
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

  const anyTriPoints = [
    new Point(-1, -1),
    new Point(0.8, 1),
    new Point(1.5, -1),
  ];

  const vSplitPoint = new Point(0.8, -1);

  const anyTriSplit = [
    new Point(-0.37, -0.3),
    new Point(1.255, -0.3),
  ];

  const hSplitPoint = new Point(0.8, -0.3);

  const aTri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: anyTriPoints,
      color: colors.sides,
      close: true,
      width: 0.02,
    },
  };

  const aGreyTri = {
    name: 'greyTri',
    method: 'polyLine',
    options: {
      points: anyTriPoints,
      color: colors.darkGrey,
      close: true,
      width: 0.02,
    },
  };

  const vSplit = {
    name: 'vSplit',
    method: 'line',
    options: {
      dashStyle: {
        style: [0.03, 0.01],
      },
      width: 0.01,
      color: colors.sides,
      p1: anyTriPoints[1],
      p2: [anyTriPoints[1].x, anyTriPoints[0].y],
    },
  };

  const hSplit = {
    name: 'hSplit',
    method: 'line',
    options: {
      width: 0.02,
      color: colors.sides,
      p1: anyTriSplit[0],
      p2: anyTriSplit[1],
    },
  };

  const greyHSplit = {
    name: 'greyHSplit',
    method: 'line',
    options: {
      width: 0.02,
      color: colors.darkGrey,
      p1: anyTriSplit[0],
      p2: anyTriSplit[1],
    },
  };

  const topTri = {
    name: 'topTri',
    method: 'polyLine',
    options: {
      points: [
        anyTriSplit[0],
        anyTriPoints[1],
        anyTriSplit[1],
      ],
      side: [
        side('m'),
        side('n'),
        side('b'),
      ],
      color: colors.highlight,
      close: true,
      width: 0.02,
    },
  };

  const topLeftTri = {
    name: 'topLeftTri',
    method: 'polyLine',
    options: {
      points: [
        anyTriSplit[0],
        anyTriPoints[1],
        hSplitPoint,
      ],
      color: colors.highlight,
      close: true,
      width: 0.02,
      side: [
        side('rM'),
        side(''),
        side('rB1'),
      ],
    },
  };

  const topRightTri = {
    name: 'topRightTri',
    method: 'polyLine',
    options: {
      points: [
        hSplitPoint,
        anyTriPoints[1],
        anyTriSplit[1],
      ],
      color: colors.highlight,
      close: true,
      width: 0.02,
      side: [
        side(''),
        side('rN'),
        side('rB2'),
      ],
    },
  };

  const leftTri = {
    name: 'leftTri',
    method: 'polyLine',
    options: {
      points: [
        anyTriPoints[1],
        anyTriPoints[0],
        vSplitPoint,
      ],
      color: colors.sides,
      width: 0.02,
      close: true,
    },
  };

  const rightTri = {
    name: 'rightTri',
    method: 'polyLine',
    options: {
      points: [
        vSplitPoint,
        anyTriPoints[1],
        anyTriPoints[2],
      ],
      color: colors.sides,
      width: 0.02,
      close: true,
    },
  };

  const simpleLabel = (name, text, p, color = colors.sides) => ({
    name,
    method: 'text',
    options: {
      text,
      position: p,
      size: 0.13,
      color,
    },
  });

  const fig2 = {
    name: 'fig2',
    method: 'collection',
    addElements: [
      aTri,
      aGreyTri,
      greyHSplit,
      vSplit,
      hSplit,
      leftTri,
      rightTri,
      topTri,
      rightAngle('rightAngle', anyTriPoints[1], vSplitPoint, anyTriPoints[0]),
      rightAngle('splitRightAngle', anyTriPoints[1], hSplitPoint, anyTriSplit[0]),
      label('M', anyTriPoints[0], anyTriPoints[1]),
      label('N', anyTriPoints[1], anyTriPoints[2]),
      label('B', anyTriPoints[2], anyTriPoints[0]),
      label('H', anyTriPoints[2].add(1, 0), anyTriPoints[1].add(1.7, 0)),
      simpleLabel('B1', 'B1', new Point(-0.1, -1.15)),
      simpleLabel('B2', 'B2', new Point(1.1, -1.15)),
      simpleLabel('rH', 'rH', new Point(0.65, 0.2), colors.highlight),
      topLeftTri,
      topRightTri,
    ],
    options: {
      position: [0, -0.2],
    },
    mods: {
      scenarios: {
        left: { position: [-1.2, -0.3] },
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

  const line = (name, p1, p2, color = colors.sides) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      width: 0.02,
      color,
    },
  });

  const triangle = (name, p1, p2, p3, color = colors.highlight) => ({
    name,
    method: 'polyLine',
    options: {
      points: [p1, p2, p3],
      close: true,
      width: 0.02,
      color,
    },
  });

  const parallelSplitLine = {
    name: 'split',
    method: 'line',
    options: {
      dashStyle: {
        style: [0.03, 0.02],
      },
      width: 0.01,
      color: colors.sides,
      p1: [-2, -0.3],
      p2: [2, -0.3],
    },
  };

  const w = 0.05;
  const arrow = (name, p) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: '1',
        method: 'line',
        options: {
          p1: [p[0] - w, p[1] - w], p2: p, width: 0.01, color: colors.sides,
        },
      },
      {
        name: '2',
        method: 'line',
        options: {
          p1: [p[0] - w, p[1] + w], p2: p, width: 0.01, color: colors.sides,
        },
      },
    ],
  });

  const t1 = [[-1.4, 1], [-1.4, -1], [-1.8, -1]];
  const t2 = [[0.5, 1], [0.5, -1], [-1, -1]];
  const t3 = [[1.7, -1], [1.2, -1], [1.2, 1]];
  const fig3 = {
    name: 'fig3',
    method: 'collection',
    addElements: [
      parallelSplitLine,
      arrow('topArrow', [0.9, -1]),
      arrow('bottomArrow', [0.9, 1]),
      line('topLine', [-2, 1], [2, 1]),
      line('bottomLine', [-2, -1], [2, -1]),
      line('line1', t1[2], t1[0]),
      line('line2', t2[2], t2[0]),
      line('line3', t3[0], t3[2]),
      line('height1', t1[0], t1[1], colors.highlight),
      line('height2', t2[0], t2[1], colors.highlight),
      line('height3', t3[1], t3[2], colors.highlight),
      triangle('tri1', t1[0], t1[1], t1[2]),
      triangle('tri2', t2[0], t2[1], t2[2]),
      triangle('tri3', t3[0], t3[1], t3[2]),
      rightAngle('right1', t1[0], t1[1], t1[2], colors.highlight),
      rightAngle('right2', t2[0], t2[1], t2[2], colors.highlight),
      rightAngle('right3', t3[0], t3[1], t3[2], colors.highlight),
    ],
    options: {
      position: [0, -0.2],
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
    Area0: { text: 'Area', color: colors.sides },
    Area1: { text: 'Area', color: colors.sides },
    Area2: { text: 'Area', color: colors.sides },
    Area3: { text: 'Area', color: colors.sides },
    total: { color: colors.sides },
    _0: { text: '0' },
    _1: { text: '1', color: colors.sides },
    _2: { text: '2', color: colors.sides },
    _3: { text: '3', color: colors.sides },
    _1_0: { text: '1' },
    _2_0: { text: '2' },
    _1_1: { text: '1' },
    _2_1: { text: '2' },
    _1_2: { text: '1' },
    _2_2: { text: '2' },
    _1_3: { text: '1' },
    _2_3: { text: '2' },
    _2_4: { text: '2' },
    _2_5: { text: '2' },
    _2_6: { text: '2' },
    _2_7: { text: '2' },
    v_0: { symbol: 'vinculum' },
    v_1: { symbol: 'vinculum' },
    v_2: { symbol: 'vinculum' },
    v_3: { symbol: 'vinculum' },
    b0: { text: 'b', color: colors.highlight },
    b1: { text: 'b', color: colors.highlight },
    b2: { text: 'b', color: colors.highlight },
    b3: { text: 'b', color: colors.highlight },
    B0: { text: 'B', color: colors.sides },
    B1: { text: 'B', color: colors.sides },
    B2: { text: 'B', color: colors.sides },
    B3: { text: 'B', color: colors.sides },
    r0: { text: 'r' },
    r1: { text: 'r' },
    r2: { text: 'r' },
    r3: { text: 'r' },
    // Nm1: { text: '(N - n)', color: colors.sides },
    M0: { text: 'M', color: colors.sides },
    N0: { text: 'N', color: colors.sides },
    N1: { text: 'N', color: colors.sides },
    N2: { text: 'N', color: colors.sides },
    N3: { text: 'N', color: colors.sides },
    N4: { text: 'N', color: colors.sides },
    n0: { text: 'n', color: colors.highlight },
    n1: { text: 'n', color: colors.highlight },
    n2: { text: 'n', color: colors.highlight },
    n3: { text: 'n', color: colors.highlight },
    n4: { text: 'n', color: colors.highlight },
    n5: { text: 'n', color: colors.highlight },
    m: { text: 'm', color: colors.highlight },
    min0: ' - ',
    min1: ' - ',
    min2: ' - ',
    min3: ' - ',
    mul0: ' \u00D7 ',
    mul1: ' \u00D7 ',
    plus0: ' + ',
    plus1: ' + ',
    plus2: ' + ',
    plus3: ' + ',
    plus4: ' + ',
    plus5: ' + ',
    equals: ' = ',
    equals1: ' = ',
    equals2: ' = ',
    equals3: ' = ',
    brace0: {
      symbol: 'brace', side: 'bottom', numLines: 2, color: colors.grey,
    },
    brace1: {
      symbol: 'brace', side: 'bottom', numLines: 2, color: colors.grey,
    },
    brace2: {
      symbol: 'brace', side: 'bottom', numLines: 2, color: colors.grey,
    },
    brace3: {
      symbol: 'brace', side: 'bottom', numLines: 2, color: colors.grey,
    },
    brace4: {
      symbol: 'brace', side: 'bottom', numLines: 4, color: colors.grey,
    },
    brace5: {
      symbol: 'brace', side: 'bottom', numLines: 4, color: colors.grey,
    },
    lb1: { symbol: 'bracket', side: 'left', numLines: 1 },
    rb1: { symbol: 'bracket', side: 'right', numLines: 1 },
    lb2: { symbol: 'bracket', side: 'left', numLines: 1 },
    rb2: { symbol: 'bracket', side: 'right', numLines: 1 },
    lb3: { symbol: 'bracket', side: 'left', numLines: 1 },
    rb3: { symbol: 'bracket', side: 'right', numLines: 1 },
    'x0': { symbol: 'xStrike', color: colors.description },
    'x1': { symbol: 'xStrike', color: colors.description },
    'x2': { symbol: 'xStrike', color: colors.description },
    'x3': { symbol: 'xStrike', color: colors.description },

    arrow: { text: '     =>     ' },
    comma: { text: ',      ' },
    comma2: { text: ',' },
  };

  const bot = (content, commentText, symbol = '') => ({
    bottomComment: {
      content,
      comment: commentText,
      symbol,
      includeInSize: false,
    },
  });

  const half = (_1, _2, v) => ({ frac: [_1, _2, v, 0.7] });

  const h0 = half('_1_0', '_2_0', 'v_0');
  const h1 = half('_1_1', '_2_1', 'v_1');
  const h2 = half('_1_2', '_2_2', 'v_2');
  const h3 = half('_1_3', '_2_3', 'v_3');

  const strike = (content, x) => ({ strike: [content, x] });
  const sub = (content, s) => ({ sub: [content, ['  ', s]] });
  const sup = (content, s) => ({ sup: [content, ['  ', s]] });
  const brac = (content, lb, rb) => ({ brac: [content, lb, rb] });

  const eqn = (name, y, defaultFormSeries) => ({
    name,
    method: 'addEquation',
    options: {
      // navType: '1Button',
      color: colors.diagram.text.base,
      defaultFormAlignment: {
        fixTo: 'equals',
        alignH: 'center',
        alignV: 'baseline',
      },
      scale: 0.8,
      elements,
      forms: {
        '0': {
          content: [
            sub('Area0', 'total'),'equals',
            sub('Area1', '_1'), 'plus0',
            sub('Area2', '_2'), 'plus1',
            sub('Area3', '_3'),
          ],
          description: 'Area of original triangle:',
        },
        '1': {
          content: [
            bot(
              sub('Area0', 'total'),
              [h0, ' ', 'B1', 'N2'],
              'brace0',
            ),
            'equals',
            bot(
              sub('Area1', '_1'),
              [h1, ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
              'brace1',
            ),
            'plus0',
            bot(
              sub('Area2', '_2'),
              [h2, ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
              'brace2',
            ),
            'plus1',
            bot(
              sub('Area3', '_3'),
              [h3, ' ', 'b1', 'n2'],
              'brace3',
            ),
          ],
          description: 'Substitute in areas:',
        },
        '1a': {
          content: [
            [h0, ' ', 'B1', 'N2'],
            'equals',
            [h1, ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
            'plus0',
            [h2, ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
            'plus1',
            [h3, ' ', 'b1', 'n2'],
          ],
          description: 'Substitute in areas:',
        },
        '2': {
          content: [
            [strike(h0, 'x0'), ' ', 'B1', 'N2'],
            'equals',
            [strike(h1, 'x1'), ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
            'plus0',
            [strike(h2, 'x2'), ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
            'plus1',
            [strike(h3, 'x3'), ' ', 'b1', 'n2'],
          ],
          description: 'Simplify:',
        },
        '2a': {
          content: [
            'B1', 'N2',
            'equals',
            'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1'),
            'plus0',
            'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2'),
            'plus1',
            ' ', 'b1', 'n2',
          ],
          description: 'Simplify:',
        },
        '2b': {
          content: [
            'B1', 'N2',
            'equals',
            bot(
              ['B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
              ['B2', 'N3', 'min2', 'B3', 'n3'],
              'brace4',
            ),
            'plus0',
            bot(
              ['b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
              ['b2', 'N4', 'min3', 'b3', 'n4'],
              'brace5',
            ),
            'plus1',
            ' ', 'b1', 'n2',
          ],
          description: 'Simplify:',
        },
        '2c': {
          content: [
            'B1', 'N2',
            'equals',
            'B2', 'N3', 'min2', 'B3', 'n3',
            'plus0',
            'b2', 'N4', 'min3', 'b3', 'n4',
            'plus1',
            ' ', 'b1', 'n2',
          ],
          description: 'Simplify:',
        },
        '2d': {
          content: [
            bot(strike(['B1', 'N2'], 'x0'), '_0', 'brace1'),
            'equals',
            strike(['B2', 'N3'], 'x1'), 'min2', 'B3', 'n3',
            'plus0',
            'b2', 'N4', 'min3', 'b3', 'n4',
            'plus1',
            ' ', 'b1', 'n2',
          ],
          description: 'Simplify:',
        },
        '2e': {
          content: [
            '_0',
            'equals',
            'min2', 'B3', 'n3',
            'plus0',
            'b2', 'N4', 'min3', 'b3', 'n4',
            'plus1',
            ' ', 'b1', 'n2',
          ],
          description: 'Simplify:',
        },
        '2f': {
          content: [
            '_0',
            'equals',
            'min2', 'B3', 'n3',
            'plus0',
            'b2', 'N4', 'min3',
            strike(['b3', 'n4'], 'x1'),
            'plus1',
            ' ', strike(['b1', 'n2'], 'x2'),
          ],
          description: 'Simplify:',
        },
        '2g': {
          content: [
            '_0',
            'equals',
            'min2', 'B3', 'n3',
            'plus0',
            'b2', 'N4',
          ],
          description: 'Simplify:',
        },
        '2h': {
          content: [
            bot('_0', ['plus1', 'B0', 'n0'], ''),
            'equals', 'min2',
            bot(['B3', 'n3'], ['plus2', 'B1', 'n1', '']),
            'plus0',
            'b2', 'N4',
          ],
          description: 'Simplify:',
        },
        '2i': {
          content: [
            bot('_0', ['plus1', 'B0', 'n0']),
            'equals', 'min2',
            bot(strike(['B3', 'n3'], 'x0'), strike(['plus2', 'B1', 'n1'], 'x1')),
            'plus0',
            'b2', 'N4',
          ],
          description: 'Simplify:',
        },
        '2j': {
          content: [
            'B0', 'n0',
            'equals',
            'b2', 'N4',
          ],
          description: 'Simplify:',
        },
        '2k': {
          content: [
            bot(
              ['B0', 'n0'],
              ['mul0', { frac: ['_1_1', ['B1', 'N1'], 'v_0'] }],
              '',
            ),
            'equals',
            bot(
              ['b2', 'N4'],
              ['mul1', { frac: ['_1_0', ['B2', 'N2'], 'v_1'] }],
              '',
            ),
          ],
          description: 'Simplify:',
        },
        '2l': {
          content: [
            bot(
              [strike('B0', 'x0'), 'n0'],
              ['mul0', { frac: ['_1_1', [strike('B1', 'x1'), 'N1'], 'v_0'] }],
              '',
            ),
            'equals',
            bot(
              ['b2', strike('N4', 'x2')],
              ['mul1', { frac: ['_1_0', ['B2', strike('N2', 'x3')], 'v_1'] }],
              '',
            ),
          ],
          description: 'Simplify:',
        },
        '2m': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
          ],
          description: 'After Simplification:',
        },
        '3': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
            'equals1',
            'r0',
          ],
          description: 'Call these ratios r',
        },
        '3a': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
            'equals1',
            'r0',
            'arrow',
            { frac: ['b0', 'B0', 'v_2'] },
            'equals2',
            'r1',
          ],
          description: 'Rearrange for b',
        },
        '3b': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
            'equals1',
            'r0',
            'arrow',
            bot(
              { frac: ['b0', 'B0', 'v_2'] },
              ['mul0', 'B1'],
            ),
            'equals2',
            bot('r1', ['mul1', 'B3']),
          ],
          description: 'Rearrange for b',
        },
        '3c': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
            'equals1',
            'r0',
            'arrow',
            bot(
              { frac: ['b0', strike('B0', 'x0'), 'v_2'] },
              ['mul0', strike('B1', 'x1')],
            ),
            'equals2',
            bot('r1', ['mul1', 'B3']),
          ],
          description: 'Rearrange for b',
        },
        '3d': {
          content: [
            { frac: ['n0', 'N1', 'v_0'] },
            'equals',
            { frac: ['b2', 'B2', 'v_1'] },
            'equals1',
            'r0',
            'arrow',
            'b0',
            'equals2',
            'r1', 'B3',
          ],
          description: 'Rearrange for b',
        },
        '3e': {
          content: [
            'b0',
            'equals2',
            'r1', 'B3',
          ],
          description: 'Rearrange for b',
        },
        '3f': {
          content: [
            'b0',
            'equals2',
            'r1', 'B3',
            'comma',
            'n0',
            'equals1',
            'r2', 'N0',
          ],
          description: 'n can be determined from same procedure:',
        },
        '4': {
          content: [
            'b0',
            'equals2',
            'r1', 'B3',
            'comma',
            'n0',
            'equals1',
            'r2', 'N0',
          ],
          description: 'Knowing:',
        },
        '4Comma': {
          content: [
            'b0',
            'equals2',
            'r1', 'B3',
            'comma',
            'n0',
            'equals1',
            'r2', 'N0',
            'comma2',
          ],
          description: 'Knowing:',
        },
        '5': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('n0', '_2_1'),
            'plus0',
            sup('b0', '_2_2'),
          ],
          description: 'Pythagorean theorem on top triangle:',
        },
        '6': {
          content: [
            sup('m', '_2_0'),
            'equals',
            bot(
              sup('n0', '_2_1'),
              [sup('r0', '_2_3'), sup('N0', '_2_4')],
              'brace0',
            ),
            'plus0',
            bot(
              sup('b0', '_2_2'),
              [sup('r1', '_2_5'), sup('B0', '_2_6')],
              'brace1',
            ),
          ],
          description: 'Substitute in ratios of N and B:',
        },
        '6a': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('r0', '_2_3'), sup('N0', '_2_4'),
            'plus0',
            sup('r1', '_2_5'), sup('B0', '_2_6'),
          ],
          description: 'Substitute in ratios of N and B:',
        },
        '6b': {
          content: [
            sup('m', '_2_0'),
            'equals',
            bot(
              [
                sup('r0', '_2_3'), sup('N0', '_2_4'),
                'plus0',
                sup('r1', '_2_5'), sup('B0', '_2_6'),
              ],
              [
                sup('r3', '_2_7'),
                brac(
                  [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
                  'lb1', 'rb1',
                ),
              ],
              'brace4',
            ),
          ],
          description: 'Rearrange for r:',
        },
        '6c': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('r3', '_2_7'),
            brac(
              [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
              'lb1', 'rb1',
            ),
          ],
          description: 'Rearrange for r:',
        },
        '7': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('r3', '_2_7'),
            bot(
              brac(
                [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
                'lb1', 'rb1',
              ),
              sup('M0', '_2_3'),
              'brace4',
            ),
          ],
          description: 'Using Pythagorean theorem for M:',
        },
        '7a': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('r3', '_2_7'),
            sup('M0', '_2_3'),
          ],
          description: 'Using Pythagorean theorem for M:',
        },
        '7b': {
          content: [
            sup('m', strike('_2_0', 'x0')),
            'equals',
            sup('r3', strike('_2_7', 'x1')),
            sup('M0', strike('_2_3', 'x2')),
          ],
          description: 'Taking the square root of both sides:',
        },
        '7c': {
          content: [
            'm',
            'equals',
            'r3',
            'M0',
          ],
          description: 'Simplifies to:',
        },
      },
      formSeries: {
        '0': ['0'],
        '1': ['0', '1', '1a'],
        '2': ['1a', '2', '2a', '2b', '2c', '2d', '2e', '2f', '2g', '2h', '2i', '2j', '2k', '2l', '2m'],
        '3': ['2m', '3', '3a', '3b', '3c', '3d', '3e', '3f'],
        '4': ['4'],
        '5': ['5'],
        '6': ['5', '6', '6a', '6b', '6c'],
        '7': ['6c', '7', '7a', '7b', '7c'],
        // '2': ['1', '1a', '1b', '1c', '2'],
        // '3': ['2', '2a', '3'],
      },
      defaultFormSeries,
      formRestart: {
        pulse: {
          duration: 1,
          scale: 1.1,
        },
      },
      // formRestartPosition: [1.8, formStart],
      // formRestartAnimation: 'pulse',
    },
    mods: {
      scenarios: {
        default: { position: [0.8, y], scale: 1 },
        top: { position: [1.5, -0.2], scale: 1.3 },
        summary: { position: [1.5, -0.2], scale: 1.3 },
        midLeft: { position: [0.5, -0.2] },
        midRight: { position: [2.1, -0.2] },
      },
    },
  });

  const nav = (name, y, interactive, defaultFormSeries = null) => ({
    name,
    method: 'addNavigator',
    options: {
      navType: '1Button',
      // navTypeOptions: {
      //   useTwoLines: true,
      // },
      equation: eqn(`${name}Eqn`, y, defaultFormSeries),
      interactive,
      alignV: 'middle',
      alignH: 'left',
    },
    mods: {
      scenarios: {
        default: { position: [0, y + 0.3] },
      },
    },
  });

  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////

  const elementsFig2 = {
    b: { text: 'b', color: colors.highlight },
    m: { text: 'm', color: colors.highlight },
    n: { text: 'n', color: colors.highlight },
    M: { text: 'M', color: colors.sides },
    N: { text: 'N', color: colors.sides },
    B: { text: 'B', color: colors.sides },
    B_1: { text: 'B', color: colors.sides },
    B1: { text: 'B1', color: colors.sides },
    B1_1: { text: 'B1', color: colors.highlight },
    B1_2: { text: 'B1', color: colors.highlight },
    B2: { text: 'B2', color: colors.sides },
    B2_1: { text: 'B2', color: colors.highlight },
    B2_2: { text: 'B2', color: colors.highlight },
    plus_0: '  +  ',
    plus_1: '  +  ',
    equals: '  =  ',
    equals_1: '  =  ',
    equals_2: '  =  ',
    r_0: { text: 'r', color: colors.highlight },
    r_1: { text: 'r', color: colors.highlight },
    r_2: { text: 'r', color: colors.highlight },
    r_3: { text: 'r', color: colors.highlight },
    lb: { symbol: 'bracket', side: 'left', numLines: 1 },
    rb: { symbol: 'bracket', side: 'right', numLines: 1 },
    comma_0: ',      ',
    comma_1: ',      ',
  };

  const eqnFig2 = name => ({
    name,
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      defaultFormAlignment: {
        fixTo: 'equals',
        alignH: 'center',
        alignV: 'baseline',
      },
      scale: 0.8,
      elements: elementsFig2,
      forms: {
        '0': ['B', 'equals', 'B1', 'plus_0', 'B2'],
        '1': [
          'r_0', 'B1_1', 'plus_0', 'r_1', 'B2_1', 'equals',
          'r_3', { brac: [['B1', 'plus_1', 'B2'], 'lb', 'rb'] },
          'equals_1',
          'r_2', 'B_1',
        ],
        '2': [
          'b', 'equals', 'r_0', 'B', 'comma_0',
          'm', 'equals_1', 'r_1', 'M', 'comma_1',
          'n', 'equals_2', 'r_2', 'N',
        ],
      },
      formRestart: {
        pulse: {
          duration: 1,
          scale: 1.1,
        },
      },
    },
    mods: {
      scenarios: {
        top: { position: [0, 1.5], scale: 1.2 },
        topLeft: { position: [-0.5, 1.5], scale: 1.2 },
      },
    },
  });

  layout.addElements = [
    fig,
    nav('0', 0.8, false, '0'),
    nav('1', 0, false, '1'),
    nav('2', -0.8, false, '2'),
    nav('3', -1.6, false, '3'),
    nav('4', 0.8, false, '4'),
    nav('5', 0, false, '5'),
    nav('6', -0.8, false, '6'),
    nav('7', -1.6, false, '7'),
    fig2,
    eqnFig2('fig2Eqn'),
    fig3,
  ];
  return layout;
}
