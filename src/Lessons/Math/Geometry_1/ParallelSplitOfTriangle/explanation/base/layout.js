// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

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
    method: 'addNavigator',
    options: {
      navType: 'description',
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
        '6d': {
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
        '6e': {
          content: [
            sup('m', '_2_0'),
            'equals',
            sup('r3', '_2_7'),
            sup('M0', '_2_3'),
          ],
          description: 'Using Pythagorean theorem for M:',
        },
      },
      formSeries: {
        '1': ['0', '1', '1a'],
        '2': ['1a', '2', '2a', '2b', '2c', '2d', '2e', '2f', '2g', '2h', '2i', '2j', '2k', '2l', '2m'],
        '3': ['2m', '3', '3a', '3b', '3c', '3d', '3e', '3f'],
        '6': ['5', '6', '6a', '6b', '6c', '6d', '6e'],
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
      alignH: 'left',
    },
    mods: {
      scenarios: {
        default: { position: [0, y + 0.3] },
      },
    },
  });

  layout.addElements = [
    fig,
    nav('0', 0.8, false),
    nav('1', 0, false, '1'),
    nav('2', -0.8, false, '2'),
    nav('3', -1.6, false, '3'),
    nav('4', 0.8, false),
    nav('5', 0, false, '5'),
    nav('6', -0.8, false, '6'),
  ];
  return layout;
}
