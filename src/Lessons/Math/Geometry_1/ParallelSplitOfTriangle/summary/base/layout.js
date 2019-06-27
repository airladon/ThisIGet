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
  'darkGrey',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  // const points = [
  //   new Point(-1.5, -1).add(0.3, 0),
  //   new Point(0, 1).add(0.3, 0),
  //   new Point(0, -1).add(0.3, 0),
  // ];

  // const split = [
  //   new Point(-1, -0.33).add(0.3, 0),
  //   new Point(0, -0.33).add(0.3, 0),
  // ];

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const w = 0.05;
  const arrow = (name, p, color = colors.sides) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: '1',
        method: 'line',
        options: {
          p1: [p[0] - w, p[1] - w], p2: p, width: 0.01, color,
        },
      },
      {
        name: '2',
        method: 'line',
        options: {
          p1: [p[0] - w, p[1] + w], p2: p, width: 0.01, color,
        },
      },
    ],
  });

  const label = (text, p1, p2, offset = 0.4, color = colors.sides) => ({
    name: `label${text}`,
    method: 'line',
    options: {
      p1,
      p2,
      offset,
      label: {
        text,
        // offset: 0.05,
        location: 'outside',
        color: color,
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

  const label1 = (text, p1, p2, offset = 0.4, color = colors.sides) => ({
    name: `label${text}`,
    method: 'line',
    options: {
      p1,
      p2,
      offset,
      label: {
        text,
        // offset: 0.05,
        location: 'outside',
        color: color,
      },
      color: colors.grey,
      showLine: false,
    },
  });

  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////

  const offset = new Point(-0.7, 0);
  const points = [
    new Point(-1, -1).add(offset),
    new Point(0.8, 1).add(offset),
    new Point(1.5, -1).add(offset),
  ];

  const splitPoints = [
    new Point(-0.37, -0.3).add(offset),
    new Point(1.255, -0.3).add(offset),
  ];

  const aTri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: points,
      color: colors.sides,
      close: true,
      width: 0.02,
    },
  };

  const split = {
    name: 'split',
    method: 'line',
    options: {
      width: 0.015,
      color: colors.highlight,
      p1: splitPoints[0],
      p2: splitPoints[1],
      dashStyle: {
        style: [0.03, 0.02],
      }
    },
  };

  const topTri = {
    name: 'topTri',
    method: 'polyLine',
    options: {
      points: [
        splitPoints[0],
        points[1],
        splitPoints[1],
      ],
      // side: [
      //   side('m'),
      //   side('n'),
      //   side('b'),
      // ],
      color: colors.highlight,
      close: true,
      width: 0.02,
    },
    mods: {
      scenarios: {
        default: { scale: 0.98 },
      }
    }
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

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      aTri,
      split,
      topTri,
      // arrow('topArrow', [splitPoints[1][0] - 0.5, splitPoints[1][1]]),
      arrow('topArrow', [splitPoints[1].x - 0.5, splitPoints[1].y], colors.highlight),
      arrow('bottomArrow', [splitPoints[1].x - 0.5, points[2].y]),
      label('M', points[0], points[1]),
      label('N', points[1], points[2]),
      label1('B', points[2], points[0], 0.25),
      label('m', splitPoints[0], points[1], 0.1, colors.highlight),
      label('n', points[1], splitPoints[1], 0.1, colors.highlight),
      label1('b', splitPoints[1], splitPoints[0], 0.1, colors.highlight),
    ],
    // options: {
    //   position: [0, -0.2],
    // },
    mods: {
      scenarios: {
        default: { position: [-1.2 + 0.7, -0.4] },
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

  // const triangle = (name, p1, p2, p3, color = colors.highlight) => ({
  //   name,
  //   method: 'polyLine',
  //   options: {
  //     points: [p1, p2, p3],
  //     close: true,
  //     width: 0.02,
  //     color,
  //   },
  // });

  const parallelSplitLine = {
    name: 'split',
    method: 'line',
    options: {
      dashStyle: {
        style: [0.03, 0.02],
      },
      width: 0.01,
      color: colors.highlight,
      p1: [-2, -0.3],
      p2: [2, -0.3],
    },
  };

  

  const t1 = new Line(new Point(-1.8, -1), new Point(-1.4, 1));
  const t2 = new Line(new Point(-1, -1), new Point(0.5, 1));
  const t3 = new Line(new Point(1.7, -1), new Point(1.2, 1));
  const fig2 = {
    name: 'fig2',
    method: 'collection',
    addElements: [
      parallelSplitLine,
      arrow('topArrow', [0.9, -1]),
      arrow('bottomArrow', [0.9, 1]),
      arrow('splitArrow', [0.9, -0.3], colors.highlight),
      line('topLine', [-2, 1], [2, 1]),
      line('bottomLine', [-2, -1], [2, -1]),
      line('line1', t1.p1, t1.p2),
      line('line2', t2.p1, t2.p2),
      line('line3', t3.p1, t3.p2),
      label('b', t1.pointAtPercent(0.37), t1.p2, -0.1, colors.highlight),
      label('n', t2.pointAtPercent(0.4), t2.pointAtPercent(1.01), -0.1, colors.highlight),
      label('m', t3.pointAtPercent(0.35), t3.pointAtPercent(0.98), -0.1, colors.highlight),
      label1('B', t1.p1, t1.p2, 0.15),
      label1('N', t2.p1, t2.p2, 0.15),
      label1('M', t3.p1, t3.p2, 0.15),
    ],
    options: {
      position: [0, -0.6],
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
    b: { text: 'b', color: colors.highlight },
    m: { text: 'm', color: colors.highlight },
    n: { text: 'n', color: colors.highlight },
    B: { text: 'B', color: colors.sides },
    M: { text: 'M', color: colors.sides },
    N: { text: 'N', color: colors.sides },
    equals0: ' = ',
    equals1: ' = ',
    v0: { symbol: 'vinculum' },
    v1: { symbol: 'vinculum' },
    v2: { symbol: 'vinculum' },
  };

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      elements,
      color: colors.diagram.text.base,
      scale: 0.9,
      forms: {
        '0': [
          { frac: ['b', 'B', 'v0'] },
           '   ', 'equals0', '   ',
          { frac: ['n', 'N', 'v1'] },
           '   ', 'equals1', '   ',
          { frac: ['m', 'M', 'v2'] },
        ],
      },
    },
    mods: {
      scenarios: {
        default: { position: [1.2, -0.2], scale: 1 },
        top: { position: [-0.6, 0.8], scale: 1 },
      },
    },
  };
  // const bot = (content, commentText, symbol = '') => ({
  //   bottomComment: {
  //     content,
  //     comment: commentText,
  //     symbol,
  //     includeInSize: false,
  //   },
  // });

  // const half = (_1, _2, v) => ({ frac: [_1, _2, v, 0.7] });

  // const h0 = half('_1_0', '_2_0', 'v_0');
  // const h1 = half('_1_1', '_2_1', 'v_1');
  // const h2 = half('_1_2', '_2_2', 'v_2');
  // const h3 = half('_1_3', '_2_3', 'v_3');

  // const strike = (content, x) => ({ strike: [content, x] });
  // const sub = (content, s) => ({ sub: [content, ['  ', s]] });
  // const sup = (content, s) => ({ sup: [content, ['  ', s]] });
  // const brac = (content, lb, rb) => ({ brac: [content, lb, rb] });

  // const eqn = (name, y, defaultFormSeries) => ({
  //   name,
  //   method: 'addEquation',
  //   options: {
  //     // navType: '1Button',
  //     color: colors.diagram.text.base,
  //     defaultFormAlignment: {
  //       fixTo: 'equals',
  //       alignH: 'center',
  //       alignV: 'baseline',
  //     },
  //     scale: 0.8,
  //     elements,
  //     forms: {
  //       '0': {
  //         content: [
  //           sub('Area0', 'total'),'equals',
  //           sub('Area1', '_1'), 'plus0',
  //           sub('Area2', '_2'), 'plus1',
  //           sub('Area3', '_3'),
  //         ],
  //         description: 'Area of original triangle:',
  //       },
  //       '1': {
  //         content: [
  //           bot(
  //             sub('Area0', 'total'),
  //             [h0, ' ', 'B1', 'N2'],
  //             'brace0',
  //           ),
  //           'equals',
  //           bot(
  //             sub('Area1', '_1'),
  //             [h1, ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
  //             'brace1',
  //           ),
  //           'plus0',
  //           bot(
  //             sub('Area2', '_2'),
  //             [h2, ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
  //             'brace2',
  //           ),
  //           'plus1',
  //           bot(
  //             sub('Area3', '_3'),
  //             [h3, ' ', 'b1', 'n2'],
  //             'brace3',
  //           ),
  //         ],
  //         description: 'Substitute in areas:',
  //       },
  //       '1a': {
  //         content: [
  //           [h0, ' ', 'B1', 'N2'],
  //           'equals',
  //           [h1, ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
  //           'plus0',
  //           [h2, ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
  //           'plus1',
  //           [h3, ' ', 'b1', 'n2'],
  //         ],
  //         description: 'Substitute in areas:',
  //       },
  //       '2': {
  //         content: [
  //           [strike(h0, 'x0'), ' ', 'B1', 'N2'],
  //           'equals',
  //           [strike(h1, 'x1'), ' ', 'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
  //           'plus0',
  //           [strike(h2, 'x2'), ' ', 'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
  //           'plus1',
  //           [strike(h3, 'x3'), ' ', 'b1', 'n2'],
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2a': {
  //         content: [
  //           'B1', 'N2',
  //           'equals',
  //           'B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1'),
  //           'plus0',
  //           'b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2'),
  //           'plus1',
  //           ' ', 'b1', 'n2',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2b': {
  //         content: [
  //           'B1', 'N2',
  //           'equals',
  //           bot(
  //             ['B0', brac(['N0', 'min0', 'n0'], 'lb1', 'rb1')],
  //             ['B2', 'N3', 'min2', 'B3', 'n3'],
  //             'brace4',
  //           ),
  //           'plus0',
  //           bot(
  //             ['b0', brac(['N1', 'min1', 'n1'], 'lb2', 'rb2')],
  //             ['b2', 'N4', 'min3', 'b3', 'n4'],
  //             'brace5',
  //           ),
  //           'plus1',
  //           ' ', 'b1', 'n2',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2c': {
  //         content: [
  //           'B1', 'N2',
  //           'equals',
  //           'B2', 'N3', 'min2', 'B3', 'n3',
  //           'plus0',
  //           'b2', 'N4', 'min3', 'b3', 'n4',
  //           'plus1',
  //           ' ', 'b1', 'n2',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2d': {
  //         content: [
  //           bot(strike(['B1', 'N2'], 'x0'), '_0', 'brace1'),
  //           'equals',
  //           strike(['B2', 'N3'], 'x1'), 'min2', 'B3', 'n3',
  //           'plus0',
  //           'b2', 'N4', 'min3', 'b3', 'n4',
  //           'plus1',
  //           ' ', 'b1', 'n2',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2e': {
  //         content: [
  //           '_0',
  //           'equals',
  //           'min2', 'B3', 'n3',
  //           'plus0',
  //           'b2', 'N4', 'min3', 'b3', 'n4',
  //           'plus1',
  //           ' ', 'b1', 'n2',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2f': {
  //         content: [
  //           '_0',
  //           'equals',
  //           'min2', 'B3', 'n3',
  //           'plus0',
  //           'b2', 'N4', 'min3',
  //           strike(['b3', 'n4'], 'x1'),
  //           'plus1',
  //           ' ', strike(['b1', 'n2'], 'x2'),
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2g': {
  //         content: [
  //           '_0',
  //           'equals',
  //           'min2', 'B3', 'n3',
  //           'plus0',
  //           'b2', 'N4',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2h': {
  //         content: [
  //           bot('_0', ['plus1', 'B0', 'n0'], ''),
  //           'equals', 'min2',
  //           bot(['B3', 'n3'], ['plus2', 'B1', 'n1', '']),
  //           'plus0',
  //           'b2', 'N4',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2i': {
  //         content: [
  //           bot('_0', ['plus1', 'B0', 'n0']),
  //           'equals', 'min2',
  //           bot(strike(['B3', 'n3'], 'x0'), strike(['plus2', 'B1', 'n1'], 'x1')),
  //           'plus0',
  //           'b2', 'N4',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2j': {
  //         content: [
  //           'B0', 'n0',
  //           'equals',
  //           'b2', 'N4',
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2k': {
  //         content: [
  //           bot(
  //             ['B0', 'n0'],
  //             ['mul0', { frac: ['_1_1', ['B1', 'N1'], 'v_0'] }],
  //             '',
  //           ),
  //           'equals',
  //           bot(
  //             ['b2', 'N4'],
  //             ['mul1', { frac: ['_1_0', ['B2', 'N2'], 'v_1'] }],
  //             '',
  //           ),
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2l': {
  //         content: [
  //           bot(
  //             [strike('B0', 'x0'), 'n0'],
  //             ['mul0', { frac: ['_1_1', [strike('B1', 'x1'), 'N1'], 'v_0'] }],
  //             '',
  //           ),
  //           'equals',
  //           bot(
  //             ['b2', strike('N4', 'x2')],
  //             ['mul1', { frac: ['_1_0', ['B2', strike('N2', 'x3')], 'v_1'] }],
  //             '',
  //           ),
  //         ],
  //         description: 'Simplify:',
  //       },
  //       '2m': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //         ],
  //         description: 'After Simplification:',
  //       },
  //       '3': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //           'equals1',
  //           'r0',
  //         ],
  //         description: 'Call these ratios r',
  //       },
  //       '3a': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //           'equals1',
  //           'r0',
  //           'arrow',
  //           { frac: ['b0', 'B0', 'v_2'] },
  //           'equals2',
  //           'r1',
  //         ],
  //         description: 'Rearrange for b',
  //       },
  //       '3b': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //           'equals1',
  //           'r0',
  //           'arrow',
  //           bot(
  //             { frac: ['b0', 'B0', 'v_2'] },
  //             ['mul0', 'B1'],
  //           ),
  //           'equals2',
  //           bot('r1', ['mul1', 'B3']),
  //         ],
  //         description: 'Rearrange for b',
  //       },
  //       '3c': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //           'equals1',
  //           'r0',
  //           'arrow',
  //           bot(
  //             { frac: ['b0', strike('B0', 'x0'), 'v_2'] },
  //             ['mul0', strike('B1', 'x1')],
  //           ),
  //           'equals2',
  //           bot('r1', ['mul1', 'B3']),
  //         ],
  //         description: 'Rearrange for b',
  //       },
  //       '3d': {
  //         content: [
  //           { frac: ['n0', 'N1', 'v_0'] },
  //           'equals',
  //           { frac: ['b2', 'B2', 'v_1'] },
  //           'equals1',
  //           'r0',
  //           'arrow',
  //           'b0',
  //           'equals2',
  //           'r1', 'B3',
  //         ],
  //         description: 'Rearrange for b',
  //       },
  //       '3e': {
  //         content: [
  //           'b0',
  //           'equals2',
  //           'r1', 'B3',
  //         ],
  //         description: 'Rearrange for b',
  //       },
  //       '3f': {
  //         content: [
  //           'b0',
  //           'equals2',
  //           'r1', 'B3',
  //           'comma',
  //           'n0',
  //           'equals1',
  //           'r2', 'N0',
  //         ],
  //         description: 'n can be determined from same procedure:',
  //       },
  //       '4': {
  //         content: [
  //           'b0',
  //           'equals2',
  //           'r1', 'B3',
  //           'comma',
  //           'n0',
  //           'equals1',
  //           'r2', 'N0',
  //         ],
  //         description: 'Knowing:',
  //       },
  //       '4Comma': {
  //         content: [
  //           'b0',
  //           'equals2',
  //           'r1', 'B3',
  //           'comma',
  //           'n0',
  //           'equals1',
  //           'r2', 'N0',
  //           'comma2',
  //         ],
  //         description: 'Knowing:',
  //       },
  //       '5': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           sup('n0', '_2_1'),
  //           'plus0',
  //           sup('b0', '_2_2'),
  //         ],
  //         description: 'Pythagorean theorem on top triangle:',
  //       },
  //       '6': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           bot(
  //             sup('n0', '_2_1'),
  //             [sup('r0', '_2_3'), sup('N0', '_2_4')],
  //             'brace0',
  //           ),
  //           'plus0',
  //           bot(
  //             sup('b0', '_2_2'),
  //             [sup('r1', '_2_5'), sup('B0', '_2_6')],
  //             'brace1',
  //           ),
  //         ],
  //         description: 'Substitute in ratios of N and B:',
  //       },
  //       '6a': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           sup('r0', '_2_3'), sup('N0', '_2_4'),
  //           'plus0',
  //           sup('r1', '_2_5'), sup('B0', '_2_6'),
  //         ],
  //         description: 'Substitute in ratios of N and B:',
  //       },
  //       '6b': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           bot(
  //             [
  //               sup('r0', '_2_3'), sup('N0', '_2_4'),
  //               'plus0',
  //               sup('r1', '_2_5'), sup('B0', '_2_6'),
  //             ],
  //             [
  //               sup('r3', '_2_7'),
  //               brac(
  //                 [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
  //                 'lb1', 'rb1',
  //               ),
  //             ],
  //             'brace4',
  //           ),
  //         ],
  //         description: 'Rearrange for r:',
  //       },
  //       '6c': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           sup('r3', '_2_7'),
  //           brac(
  //             [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
  //             'lb1', 'rb1',
  //           ),
  //         ],
  //         description: 'Rearrange for r:',
  //       },
  //       '7': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           sup('r3', '_2_7'),
  //           bot(
  //             brac(
  //               [sup('N1', '_2_1'), 'plus1', sup('B1', '_2_2')],
  //               'lb1', 'rb1',
  //             ),
  //             sup('M0', '_2_3'),
  //             'brace4',
  //           ),
  //         ],
  //         description: 'Using Pythagorean theorem for M:',
  //       },
  //       '7a': {
  //         content: [
  //           sup('m', '_2_0'),
  //           'equals',
  //           sup('r3', '_2_7'),
  //           sup('M0', '_2_3'),
  //         ],
  //         description: 'Using Pythagorean theorem for M:',
  //       },
  //       '7b': {
  //         content: [
  //           sup('m', strike('_2_0', 'x0')),
  //           'equals',
  //           sup('r3', strike('_2_7', 'x1')),
  //           sup('M0', strike('_2_3', 'x2')),
  //         ],
  //         description: 'Taking the square root of both sides:',
  //       },
  //       '7c': {
  //         content: [
  //           'm',
  //           'equals',
  //           'r3',
  //           'M0',
  //         ],
  //         description: 'Simplifies to:',
  //       },
  //     },
  //     formSeries: {
  //       '0': ['0'],
  //       '1': ['0', '1', '1a'],
  //       '2': ['1a', '2', '2a', '2b', '2c', '2d', '2e', '2f', '2g', '2h', '2i', '2j', '2k', '2l', '2m'],
  //       '3': ['2m', '3', '3a', '3b', '3c', '3d', '3e', '3f'],
  //       '6': ['5', '6', '6a', '6b', '6c'],
  //       '7': ['6c', '7', '7a', '7b', '7c'],
  //       // '2': ['1', '1a', '1b', '1c', '2'],
  //       // '3': ['2', '2a', '3'],
  //     },
  //     defaultFormSeries,
  //     formRestart: {
  //       pulse: {
  //         duration: 1,
  //         scale: 1.1,
  //       },
  //     },
  //     // formRestartPosition: [1.8, formStart],
  //     // formRestartAnimation: 'pulse',
  //   },
  //   mods: {
  //     scenarios: {
  //       default: { position: [0.8, y], scale: 1 },
  //       top: { position: [1.5, -0.2], scale: 1.3 },
  //       summary: { position: [1.5, -0.2], scale: 1.3 },
  //       midLeft: { position: [0.5, -0.2] },
  //       midRight: { position: [2.1, -0.2] },
  //     },
  //   },
  // });

  // const nav = (name, y, interactive, defaultFormSeries = null) => ({
  //   name,
  //   method: 'addNavigator',
  //   options: {
  //     navType: '1Button',
  //     // navTypeOptions: {
  //     //   useTwoLines: true,
  //     // },
  //     equation: eqn(`${name}Eqn`, y, defaultFormSeries),
  //     interactive,
  //     alignV: 'middle',
  //     alignH: 'left',
  //   },
  //   mods: {
  //     scenarios: {
  //       default: { position: [0, y + 0.3] },
  //     },
  //   },
  // });

  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////
  // // ////////////////////////////////////////////////////////////

  // const elementsFig2 = {
  //   b: { text: 'b', color: colors.highlight },
  //   m: { text: 'm', color: colors.highlight },
  //   n: { text: 'n', color: colors.highlight },
  //   M: { text: 'M', color: colors.sides },
  //   N: { text: 'N', color: colors.sides },
  //   B: { text: 'B', color: colors.sides },
  //   B_1: { text: 'B', color: colors.sides },
  //   B1: { text: 'B1', color: colors.sides },
  //   B1_1: { text: 'B1', color: colors.highlight },
  //   B1_2: { text: 'B1', color: colors.highlight },
  //   B2: { text: 'B2', color: colors.sides },
  //   B2_1: { text: 'B2', color: colors.highlight },
  //   B2_2: { text: 'B2', color: colors.highlight },
  //   plus_0: '  +  ',
  //   plus_1: '  +  ',
  //   equals: '  =  ',
  //   equals_1: '  =  ',
  //   equals_2: '  =  ',
  //   r_0: { text: 'r', color: colors.highlight },
  //   r_1: { text: 'r', color: colors.highlight },
  //   r_2: { text: 'r', color: colors.highlight },
  //   r_3: { text: 'r', color: colors.highlight },
  //   lb: { symbol: 'bracket', side: 'left', numLines: 1 },
  //   rb: { symbol: 'bracket', side: 'right', numLines: 1 },
  //   comma_0: ',      ',
  //   comma_1: ',      ',
  // };

  // const eqnFig2 = name => ({
  //   name,
  //   method: 'addEquation',
  //   options: {
  //     color: colors.diagram.text.base,
  //     defaultFormAlignment: {
  //       fixTo: 'equals',
  //       alignH: 'center',
  //       alignV: 'baseline',
  //     },
  //     scale: 0.8,
  //     elements: elementsFig2,
  //     forms: {
  //       '0': ['B', 'equals', 'B1', 'plus_0', 'B2'],
  //       '1': [
  //         'r_0', 'B1_1', 'plus_0', 'r_1', 'B2_1', 'equals',
  //         'r_3', { brac: [['B1', 'plus_1', 'B2'], 'lb', 'rb'] },
  //         'equals_1',
  //         'r_2', 'B_1',
  //       ],
  //       '2': [
  //         'b', 'equals', 'r_0', 'B', 'comma_0',
  //         'm', 'equals_1', 'r_1', 'M', 'comma_1',
  //         'n', 'equals_2', 'r_2', 'N',
  //       ],
  //     },
  //     formRestart: {
  //       pulse: {
  //         duration: 1,
  //         scale: 1.1,
  //       },
  //     },
  //   },
  //   mods: {
  //     scenarios: {
  //       top: { position: [0, 1.5], scale: 1.2 },
  //       topLeft: { position: [-0.5, 1.5], scale: 1.2 },
  //     },
  //   },
  // });

  layout.addElements = [
    // fig,
    // nav('0', 0.8, false, '0'),
    // nav('1', 0, false, '1'),
    // nav('2', -0.8, false, '2'),
    // nav('3', -1.6, false, '3'),
    // nav('4', 0.8, false),
    // nav('5', 0, false, '5'),
    // nav('6', -0.8, false, '6'),
    // nav('7', -1.6, false, '7'),
    fig,
    fig2,
    eqn,
    // eqnFig2('fig2Eqn'),
    // fig3,
  ];
  return layout;
}
