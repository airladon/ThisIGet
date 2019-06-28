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
  // 'darkGrey',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  // const side = text => ({
  //   label: {
  //     text,
  //     offset: 0.05,
  //     location: 'outside',
  //   },
  // });

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
        color,
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
        color,
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
      points,
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
      },
    },
  };

  // const simpleLabel = (name, text, p, color = colors.sides) => ({
  //   name,
  //   method: 'text',
  //   options: {
  //     text,
  //     position: p,
  //     size: 0.13,
  //     color,
  //   },
  // });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      aTri,
      split,
      arrow('topArrow', [splitPoints[1].x - 0.5, splitPoints[1].y], colors.highlight),
      arrow('bottomArrow', [splitPoints[1].x - 0.5, points[2].y]),
      label('M', points[0], points[1]),
      label('N', points[1], points[2]),
      label1('B', points[2], points[0], 0.25),
      label('m', splitPoints[0], points[1], 0.1, colors.highlight),
      label('n', points[1], splitPoints[1], 0.1, colors.highlight),
      label1('b', splitPoints[1], splitPoints[0], 0.1, colors.highlight),
    ],
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

  layout.addElements = [
    fig,
    fig2,
    eqn,
  ];
  return layout;
}
