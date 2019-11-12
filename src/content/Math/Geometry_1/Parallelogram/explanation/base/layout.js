// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.angles2 = colors.get('green').rgb;
  colors.dim = colors.get('grey', 'dark').rgb;
  colors.fill = colors.get('blue', 'darkest').rgb;
  colors.working = colors.get('grey', 'dark').rgb;

  const points = [
    new Point(-2, -1),
    new Point(1.3, -1),
    new Point(2, 1),
    new Point(-1.3, 1),
  ];

  const angleA = Math.atan2(points[2].y - points[1].y, points[2].x - points[1].x);
  // const angleB = Math.PI - angleA;
  const lineLeft = new Line(points[0], points[3]);
  const lineRight = new Line(points[1], points[2]);
  const lineTop = new Line(points[2], points[3]);
  const lineBottom = new Line(points[0], points[1]);

  const lineD1 = new Line(points[0], points[2]);
  const lineD2 = new Line(points[1], points[3]);
  const center = lineD1.midPoint();
  const height = points[2].y - points[1].y;
  const right1 = new Point(points[3].x, points[0].y);
  const right2 = new Point(points[1].x, points[2].y);

  // eslint-disable-next-line max-len
  const angle = (name, p1, p2, p3, text, num = 1, radius = 0.3, color = colors.angles, textRadius = radius * 0.9) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        radius,
        sides: 100,
        width: 0.02,
        num,
        step: 0.04,
      },
      autoRightAngle: true,
      color,
      label: {
        text,
        radius: textRadius,
        scale: 1,
      },
      // pulse: {
      //   // label: 2,
      //   curve: {
      //     width: 1.05,
      //     num: 7,
      //   },
      //   collection: 1,
      // },
    },
  });

  const pMarks = (name, position, num, rotation) => ({
    name,
    method: 'parallelMarks',
    options: {
      color: colors.sides,
      width: 0.02,
      step: 0.05,
      length: 0.15,
      num,
      rotation,
      position,
      pulse: 2.5,
    },
  });

  const lMarks = (name, position, num, rotation) => ({
    name,
    method: 'marks',
    options: {
      color: colors.sides,
      width: 0.02,
      step: 0.05,
      length: 0.2,
      num,
      rotation,
      position,
    },
    mods: {
      pulseDefault: {
        scale: 3,
      },
    },
  });

  const dashed = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      color: colors.sides,
      width: 0.01,
      p1,
      p2,
      dashStyle: {
        style: [0.05, 0.02],
      },
      pulse: {
        line: 10,
      },
    },
  });

  const dim = (name, p1, p2, text) => ({
    name,
    method: 'line',
    options: {
      color: colors.sides,
      width: 0.01,
      p1,
      p2,
      arrows: {
        width: 0.05,
        height: 0.05,
      },
      label: {
        text,
        location: 'outside',
        offset: 0.05,
      },
      offset: 0.2,
    },
  });

  const label = (name, p1, p2, text) => ({
    name,
    method: 'line',
    options: {
      // showLine: false,
      width: 0.03,
      p1,
      p2,
      color: colors.sides,
      label: {
        text,
        location: 'outside',
        offset: 0.1,
        scale: 1,
      },
    },
  });

  const fill = (name, points, color) => ({
    name,
    method: 'fan',
    options: {
      fill: true,
      points,
      color,
    },
  });

  const w = 0.03;
  const parallelogram = {
    name: 'pgram',
    method: 'collection',
    addElements: [
      // {
      //   name: 'rect',
      //   method: 'fan',
      //   options: {
      //     fill: true,
      //     points: [right1, points[1], right2, points[3]],
      //     color: colors.fill,
      //   },
      // },
      fill('rect', [right1, points[1], right2, points[3]], colors.fill),
      fill('tri1', [points[1], right2, points[2]], colors.fill),
      fill('tri2', [points[0], right1, points[3]], colors.fill),
      fill('triLeft', [points[3], center, points[0]], colors.fill),
      fill('triRight', [points[1], center, points[2]], colors.fill),
      fill('triTop', [points[2], center, points[3]], colors.fill),
      fill('triBottom', [points[0], center, points[1]], colors.fill),
      // {
      //   name: 'tri1',
      //   method: 'fan',
      //   options: {
      //     fill: true,
      //     points: [points[1], right2, points[2]],
      //     color: colors.fill,
      //   },
      // },
      // {
      //   name: 'tri2',
      //   method: 'fan',
      //   options: {
      //     fill: true,
      //     points: [points[0], right1, points[3]],
      //     color: colors.fill,
      //   },
      // },
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points,
          width: w,
          close: true,
          color: colors.sides,
        },
      },
      angle('a1', points[1], points[0], points[3], 'a'),
      angle('a2', points[3], points[2], points[1], 'a'),
      angle('b1', points[2], points[1], points[0], '180º-a', 2, 0.3, colors.angles, 0.35),
      angle('b2', points[0], points[3], points[2], '180º-a', 2, 0.3, colors.angles, 0.35),
      angle('b11', points[2], points[1], points[0], 'b', 2, 0.3, colors.angles, 0.35),
      angle('b21', points[0], points[3], points[2], 'b', 2, 0.3, colors.angles, 0.35),
      pMarks('pMarkLeft', lineLeft.midPoint(), 2, angleA),
      pMarks('pMarkRight', lineRight.midPoint(), 2, angleA),
      pMarks('pMarkTop', lineTop.midPoint(), 1, 0),
      pMarks('pMarkBottom', lineBottom.midPoint(), 1, 0),
      lMarks('lMarkUp1', lineD1.pointAtPercent(0.25), 1, lineD1.angle()),
      lMarks('lMarkUp2', lineD1.pointAtPercent(0.75), 1, lineD1.angle()),
      lMarks('lMark21', lineD2.pointAtPercent(0.25), 2, lineD2.angle()),
      lMarks('lMark22', lineD2.pointAtPercent(0.75), 2, lineD2.angle()),
      dashed('diag1', lineD1.p1, lineD1.p2),
      dashed('diag2', lineD2.p2, lineD2.p1),
      angle('c1', points[1], points[0], points[2], 'c', 1, 0.5, colors.angles2),
      angle('c2', points[3], points[2], points[0], 'c', 1, 0.5, colors.angles2),
      angle('g1', points[3], center, points[0], 'g', 1, 0.25, colors.angles2),
      angle('g2', points[1], center, points[2], 'g', 1, 0.25, colors.angles2),
      angle('j1', points[0], center, points[1], 'j', 1, 0.25, colors.angles2),
      angle('j2', points[2], center, points[3], 'j', 1, 0.25, colors.angles2),
      angle('d1', points[2], points[0], points[3], 'd', 1, 0.5, colors.angles2),
      angle('d2', points[0], points[2], points[1], 'd', 1, 0.5, colors.angles2),
      angle('e1', points[3], points[1], points[0], 'e', 1, 0.5, colors.angles2),
      angle('e2', points[1], points[3], points[2], 'e', 1, 0.5, colors.angles2),
      angle('f1', points[2], points[1], points[3], 'f', 1, 0.5, colors.angles2),
      angle('f2', points[0], points[3], points[1], 'f', 1, 0.5, colors.angles2),
      label('labelA1', points[1], points[0], 'A'),
      label('labelA2', points[3], points[2], 'A'),
      label('labelB1', points[2], points[1], 'B'),
      label('labelB2', points[0], points[3], 'B'),
      dashed('v1', points[3], points[3].add(0, -height)),
      dashed('v2', points[1], points[1].add(0, height)),
      angle('right1', points[3], points[3].add(0, -height), points[0], '', 1, 0.2),
      angle('right2', points[1], points[1].add(0, height), points[2], '', 1, 0.2),
      dim('s1', points[3].add(0, -height), points[0], 'S'),
      dim('s2', points[1].add(0, height),  points[2], 'S'),
      dim('h', points[2], new Point(points[2].x, points[1].y), 'H'),
    ],
    options: {
      color: colors.sides,
    },
    mods: {
      scenarios: {
        default: { position: [0, -0.1], scale: 0.9 },
        low: { position: [0, -0.4], scale: 0.9 },
        bottom: { position: [0, -0.6], scale: 0.9 },
        summary: { position: [0, -0.5], scale: 0.9 },
      },
      pulseDefault: {
        scale: 1.1,
      },
    },
  };

  const top = (content, commentText, symbol) => ({
    topComment: {
      content,
      comment: commentText,
      symbol,
    },
  });

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        Area: { color: colors.sides },
        equals: '  =  ',
        Area1: { text: 'Area', color: colors.sides },
        Area2: { text: 'Area', color: colors.sides },
        rect: { text: 'Rectangle', color: colors.sides },
        tri: { text: 'Triangle', color: colors.sides },
        H1: { text: 'H', color: colors.sides },
        H2: { text: 'H', color: colors.sides },
        H3: { text: 'H', color: colors.sides },
        H4: { text: 'H', color: colors.sides },
        S1: { text: 'S', color: colors.sides },
        S2: { text: 'S', color: colors.sides },
        S3: { text: 'S', color: colors.sides },
        A1: { text: 'A', color: colors.sides },
        A2: { text: 'A', color: colors.sides },
        A3: { text: 'A', color: colors.sides },
        _2: '2',
        mul: ' \u00D7 ',
        mul2: ' \u00D7 ',
        minus: ' – ',
        minus2: ' – ',
        plus: '  +  ',
        __1: '1',
        __2: '2',
        v: { symbol: 'vinculum' },
        b1: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        },
        b2: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        strike1: { symbol: 'xStrike', color: colors.working },
        strike2: { symbol: 'xStrike', color: colors.working },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': [
          'Area', 'equals',
          { sub: ['Area1', 'rect'] }, 'plus',
          '_2', 'mul', { sub: ['Area2', 'tri'] },
        ],
        '1': [
          'Area', 'equals',
          top(
            { sub: ['Area1', 'rect'] },
            [{ brac: [['A1', 'minus', 'S1'], 'lb', 'rb'] }, 'mul2', 'H1'],
            'b1',
          ),
          'plus',
          '_2', 'mul',
          top(
            { sub: ['Area2', 'tri'] },
            [{ frac: ['__1', '__2', 'v', 0.6] }, 'S2', 'H2'],
            'b2',
          ),
        ],
        '2': [
          'Area', 'equals',
          { brac: [['A1', 'minus', 'S1'], 'lb', 'rb'] }, 'mul2', 'H1',
          'plus',
          '_2', 'mul',
          { frac: ['__1', '__2', 'v', 0.6] }, 'S2', 'H2',
        ],
        '3': [
          'Area', 'equals',
          top(
            [{ brac: [['A1', 'minus', 'S1'], 'lb', 'rb'] }, 'mul2', 'H1'],
            ['A3', 'H3', 'minus2', 'S3', 'H4'],
            'b1',
          ),
          'plus',
          { strike: ['_2', 'strike1'] }, 'mul',
          { strike: [{ frac: ['__1', '__2', 'v', 0.6] }, 'strike2'] }, 'S2', 'H2',
        ],
        '4': [
          'Area', 'equals',
          'A3', 'H3', 'minus2', 'S3', 'H4',
          'plus',
          'S2', 'H2',
        ],
        '5': [
          'Area', 'equals',
          'A3', 'H3', 'minus2',
          { strike: [['S3', 'H4'], 'strike1'] },
          'plus',
          { strike: [['S2', 'H2'], 'strike2'] },
        ],
        '6': [
          'Area', 'equals',
          'A3', 'H3',
        ],
        '7': [
          'Area', 'equals',
          'A3', 'mul', 'H3',
        ],
      },
      formSeries: {
        '0': ['0', '1', '2', '3', '4', '5', '6', '7'],
      },
      defaultFormSeries: '0',
      formRestart: {
        pulse: {
          duration: 1,
          scale: 1.1,
        },
      },
    },
    mods: {
      scenarios: {
        default: { position: [-0.5, 1.1] },
        center: { position: [0, -0.4] },
      },
    },
  };

  const nav = {
    name: 'nav',
    method: 'addNavigator',
    options: {
      navType: '1Button',
      equation: eqn,
      // interactive,
      alignV: 'middle',
      alignH: 'left',
    },
    mods: {
      scenarios: {
        default: { position: [-1.3, 1.15] },
      },
    },
  };

  const eqn2 = {
    name: 'eqn2',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        equals: '  =  ',
        a: { color: colors.angles },
        b: { color: colors.angles },
        _21: '2',
        _22: '2',
        plus: '  +  ',
        _360: '360º',
        _180: '180º',
        _divide2: '÷2',
        _divide21: '÷2',
        _divide22: '÷2',
        // v: { symbol: 'vinculum' },
        b1: {
          symbol: 'brace', side: 'top', numLines: 2, color: colors.working,
        },
        // b2: {
        //   symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        // },
        // lb: { symbol: 'bracket', side: 'left' },
        // rb: { symbol: 'bracket', side: 'right' },
        strike1: { symbol: 'xStrike', color: colors.working },
        strike2: { symbol: 'xStrike', color: colors.working },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': ['_360', 'equals', '_21', 'a', 'plus', '_22', 'b'],
        '1': [
          { annotate: ['_360', ['_divide2', 'center', 'bottom', 'center', 2], 'false'] },
          'equals',
          { annotate: [['_21', 'a', 'plus', '_22', 'b'], ['_divide21', 'center', 'bottom', 'center', 2], 'false'] },
        ],
        '2': [
          {
            annotate: [
              { topComment: ['_360', '_180', 'b1', 0.1, 0.05, 0.6, false] },
              ['_divide2', 'center', 'bottom', 'center', 2],
              'false',
            ],
          },
          'equals',
          { 
            annotate: [[
              { strike: ['_21', 'strike1'] },
              'a', 'plus',
              { strike: ['_22', 'strike2'] },
              'b',
            ], ['_divide21', 'center', 'bottom', 'center', 2], 'false']
          },
        ],
        // '3': [
        //   { bottomComment: ['_360', ['_divide2', '_180'], 'b1', 0.1, 0.05, 0.6, false] },
        //   'equals', { strike: ['_21', 'strike1'] }, 'a',
        //   'plus', { strike: ['_22', 'strike2'] }, 'b'],
        '3': ['_180', 'equals', 'a', 'plus', 'b'],
      },
    },
    mods: {
      scenarios: {
        default: { position: [0, 0.9] },
      },
    },
  };

  layout.addElements = [
    parallelogram,
    eqn,
    nav,
    eqn2,
  ];
  return layout;
}
