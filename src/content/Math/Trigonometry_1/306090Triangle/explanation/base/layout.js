// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.dim = colors.get('grey', 'dark').rgb;
  colors.working = colors.get('grey', 'dark').rgb;

  const side = 2.5;
  const equilHeight = side * Math.sqrt(3) * 0.5;
  const equilPoints = [
    new Point(-0.5 * side, -1 / 3 * equilHeight),
    new Point(0, 2 / 3 * equilHeight),
    new Point(0.5 * side, -1 / 3 * equilHeight),
  ];
  const midPoint = new Point(0, equilPoints[0].y);

  const eqnA = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      _2_: { text: '2', color: colors.sides },
      times: ' \u00D7 ',
      equals: ' = ',
      _1: { text: '1', color: colors.sides },
      s1: { symbol: 'strike', style: 'cross', color: colors.working },
      s2: { symbol: 'strike', style: 'cross', color: colors.working },
    },
    forms: {
      '0': {
        content: 'A',
        scale: 1,
      },
      '1': {
        content: ['_2', 'times', 'A'],
        alignment: { fixTo: 'A' },
        scale: 1,
      },
      '2': {
        content: ['_2', 'times', 'A'],
        scale: 1,
        alignment: { fixTo: 'A' },
      },
      '3': {
        content: ['_2', 'A'],
        scale: 1,
        alignment: { alignH: 0.15 },
      },
      '4': {
        content: ['_2', {
          annotate: {
            content: { strike: ['A', 's1'] },
            withAnnotations: ['_1'],
          },
        }],
        scale: 1,
        alignment: { alignH: 0.15 },
      },
      '5': {
        content: ['_2'],
        scale: 1,
        alignment: { alignH: 0.05 },
      },
    },
  });

  const Aon2 = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      _2_: { text: '2', color: colors.sides },
      times: ' \u00D7 ',
      equals: ' = ',
      _1: { text: '1', color: colors.sides },
      s1: { symbol: 'strike', style: 'cross', color: colors.working },
      s2: { symbol: 'strike', style: 'cross', color: colors.working },
      v: { symbol: 'vinculum', color: colors.sides },
    },
    forms: {
      '0': {
        content: { frac: ['A', 'v', '_2', 0.7] },
        alignment: { alignV: 0.03 },
        scale: 1,
      },
      '1': {
        content: [{ frac: ['A', 'v', '_2', 0.7] }, 'times', '_2_'],
        scale: 1,
        alignment: { alignV: 0.03 },
      },
      '2': {
        content: [
          { frac: ['A', 'v', { strike: ['_2', 's1'] }, 0.7] },
          'times', { strike: ['_2_', 's2'] },
        ],
        scale: 1,
        alignment: { alignV: 0.03 },
      },
      '3': {
        content: 'A',
        scale: 1,
        alignment: { alignV: 0.1 },
      },
      '4': {
        content: {
          annotate: {
            content: { strike: ['A', 's1'] },
            withAnnotations: ['_1'],
          },
        },
        scale: 1,
        alignment: { alignV: 0.1 },
      },
      '5': {
        content: ['_1'],
        scale: 1,
        alignment: { alignV: 0.1 },
      },
    },
  });

  const root3Aon2 = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _3: { text: '3', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      v: { symbol: 'vinculum', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
      times: ' \u00D7 ',
      _2_: { text: '2', color: colors.sides },
      _1: { text: '1', color: colors.sides },
      s1: { symbol: 'strike', style: 'cross', color: colors.working },
      s2: { symbol: 'strike', style: 'cross', color: colors.working },
    },
    forms: {
      '0': {
        content: [{ frac: [{ root: ['r', '_3'] }, 'v', '_2', 0.7] }, 'A'],
        scale: 1,
        alignment: { alignV: -0.05 },
      },
      '1': {
        content: [{ frac: [{ root: ['r', '_3'] }, 'v', '_2', 0.7] }, 'A', 'times', '_2_'],
        scale: 1,
        alignment: { alignV: -0.05 },
      },
      '2': {
        content: [
          { frac: [{ root: ['r', '_3'] }, 'v', { strike: ['_2', 's1'] }, 0.7] },
          'A', 'times', { strike: ['_2_', 's2'] },
        ],
        scale: 1,
        alignment: { alignV: -0.05 },
      },
      '3': {
        content: [{ root: ['r', '_3'] }, 'A'],
        alignment: { alignV: -0.1 },
        scale: 1,
      },
      '4': {
        content: [{ root: ['r', '_3'] }, {
          annotate: {
            content: { strike: ['A', 's1'] },
            withAnnotations: ['_1'],
          },
        }],
        alignment: { alignV: -0.1 },
        scale: 1,
      },
      '5': {
        content: { root: ['r', '_3'] },
        alignment: { alignV: -0.1 },
        scale: 1,
      },
    },
  });

  const lineLabel = (name, text, p1, p2, location = 'below', subLocation = 'left', offset = 0.05) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      label: {
        text,
        offset,
        scale: 1,
        location,
        subLocation,
      },
      showLine: false,
      color: colors.sides,
    },
  });

  const angle = (name, text, p1, p2, p3, radius = 0.25) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        radius,
        width: 0.015,
        sides: 100,
      },
      label: {
        text,
        radius: radius * 0.9,
      },
      color: colors.angles,
      autoRightAngle: true,
    },
  });
  const equil = {
    name: 'equil',
    method: 'collection',
    addElements: [
      lineLabel('Aon2Left', Aon2, midPoint, equilPoints[0], 'bottom', 'right'),
      lineLabel('Aon2', Aon2, equilPoints[2], midPoint, 'bottom'),
      lineLabel('H', 'H', midPoint, equilPoints[1], 'left', 'bottom'),
      lineLabel('r32', root3Aon2, midPoint, equilPoints[1], 'left', 'bottom', 0.15),
      lineLabel('A', eqnA, equilPoints[1], equilPoints[2], 'right', 'top'),
      lineLabel('ALeft', 'A', equilPoints[0], equilPoints[1], 'left', 'top'),
      lineLabel('ABottom', 'A', equilPoints[0], equilPoints[2], 'left', 'bottom'),
      angle('a30', null, midPoint, equilPoints[1], equilPoints[2], 0.5),
      angle('a30Left', null, equilPoints[0], equilPoints[1], midPoint, 0.5),
      angle('a60', null, equilPoints[1], equilPoints[2], equilPoints[0]),
      angle('a60Left', null, equilPoints[2], equilPoints[0], equilPoints[1]),
      angle('a60Top', null, equilPoints[0], equilPoints[1], equilPoints[2]),
      angle('a90Left', '', equilPoints[1], midPoint, equilPoints[0]),
      angle('a90', '', equilPoints[2], midPoint, equilPoints[1]),
      {
        name: 'equil',
        method: 'polyLine',
        options: {
          points: equilPoints,
          width: 0.03,
          color: colors.sides,
          close: true,
        },
      },
      {
        name: 'split',
        method: 'line',
        options: {
          p2: midPoint,
          p1: equilPoints[1],
          width: 0.03,
          color: colors.sides,
        },
      },
      {
        name: 'tri',
        method: 'polyLine',
        options: {
          points: [midPoint, equilPoints[1], equilPoints[2]],
          width: 0.03,
          color: colors.sides,
          close: true,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.6], rotation: 0, scale: 1 },
        side: { position: [0.3, -1.4], rotation: Math.PI / 2, scale: 1.1 },
        sideCenter: { position: [0.3, -0.9], rotation: Math.PI / 2, scale: 1.1 },
      },
    },
  };

  const sq = (content, power, bias = 0) => ({
    sup: [content, power, 0.6, new Point(bias, 0)],
  });

  const frac = (num, v, den, scale = 1) => ({
    frac: [num, v, den, scale],
  });

  const brac = (content, lb, rb) => ({
    brac: [lb, content, rb],
  });

  const strike = (content, strikeSymbol) => ({
    strike: [content, strikeSymbol],
  });

  const root = (content, radical) => ({
    root: [radical, content],
  });

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1.1,
      elements: {
        equals: '  =  ',
        equals1: '  =  ',
        equals2: '  =  ',
        H: { color: colors.sides },
        H2: { text: 'H', color: colors.sides },
        A1: { text: 'A', color: colors.sides },
        A2: { text: 'A', color: colors.sides },
        A3: { text: 'A', color: colors.sides },
        A4: { text: 'A', color: colors.sides },
        _21: '2',
        _22: '2',
        _23: '2',
        _24: '2',
        _25: '2',
        _31: '3',
        _32: '3',
        _33: '3',
        _4: '4',
        _41: '4',
        _42: '4',
        _2b: { text: '2', color: colors.sides },
        plus: ' + ',
        minus: ' – ',
        minus1: ' – ',
        v1: { symbol: 'vinculum' },
        v2: { symbol: 'vinculum' },
        v3: { symbol: 'vinculum' },
        vb: { symbol: 'vinculum', color: colors.sides },
        brace1: {
          symbol: 'brace', side: 'top', numLines: 2, color: colors.working,
        },
        brace2: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        },
        lb: { symbol: 'bracket', side: 'left', width: 0.06 },
        rb: { symbol: 'bracket', side: 'right', width: 0.06 },
        strike1: { symbol: 'strike', style: 'cross', color: colors.working },
        strike2: { symbol: 'strike', style: 'cross', color: colors.working },
        r1: { symbol: 'radical' },
        r2: { symbol: 'radical' },
        r3: { symbol: 'radical' },
        r4: { symbol: 'radical' },
        r5: { symbol: 'radical' },
        r6: { symbol: 'radical' },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': [
          sq('H', '_22', 0.02), 'plus',
          sq(brac(frac('A2', 'vb', '_2b', 0.8), 'lb', 'rb'), '_23'),
          'equals', sq('A1', '_21'),
        ],
        '1': [
          sq('H', '_22', 0.02), 'plus',
          {
            topComment: [
              sq(brac(frac('A2', 'vb', '_2b', 0.8), 'lb', 'rb'), '_23'),
              frac(sq('A3', '_24'), 'v2', '_4'),
              'brace1',
            ],
          },
          'equals', sq('A1', '_21'),
        ],
        '2': [
          sq('H', '_22', 0.02), 'plus',
          frac(sq('A3', '_24'), 'v2', '_4'),
          'equals', sq('A1', '_21'),
        ],
        '3': [
          {
            topComment: [
              [sq('H', '_22', 0.02), 'plus', frac(sq('A3', '_24'), 'v2', '_4')],
              ['minus', frac(sq('A2', '_23'), 'v1', '_41')],
            ],
          },
          'equals',
          {
            topComment: {
              content: sq('A1', '_21'),
              comment: ['minus1', frac(sq('A4', '_25'), 'v3', '_42')],
              commentSpace: 0.16,
              inSize: false,
            },
          },
        ],
        '4': [
          {
            topComment: [
              [
                sq('H', '_22', 0.02), 'plus',
                strike(frac(sq('A3', '_24'), 'v2', '_4'), 'strike1'),
              ],
              strike(['minus', frac(sq('A2', '_23'), 'v1', '_41')], 'strike2'),
            ],
          },
          'equals',
          {
            topComment: {
              content: sq('A1', '_21'),
              comment: ['minus1', frac(sq('A4', '_25'), 'v3', '_42')],
              commentSpace: 0.16,
              inSize: false,
            },
          },
        ],
        '5': [
          sq('H', '_22', 0.02),
          'equals',
          sq('A1', '_21'),
          'minus1', frac(sq('A4', '_25'), 'v3', '_42'),
        ],
        '6': [
          sq('H', '_22', 0.02),
          'equals',
          {
            topComment: {
              content: [
                sq('A1', '_21'),
                'minus1', frac(sq('A4', '_25'), 'v3', '_42'),
              ],
              comment: [frac('_31', 'v1', '_4', 0.7), sq('A2', '_23')],
              symbol: 'brace1',
            },
          },
        ],
        '7': [
          sq('H', '_22', 0.02),
          'equals',
          frac('_31', 'v1', '_4', 0.7), sq('A2', '_23'),
        ],
        '8': [
          root(sq('H', '_22', 0.02), 'r1'),
          'equals',
          root([frac('_31', 'v1', '_4', 0.7), sq('A2', '_23')], 'r2'),
        ],
        '9': [
          {
            topComment: {
              content: root(sq('H', '_22', 0.02), 'r1'),
              comment: 'H2',
              symbol: 'brace1',
              contentSpace: 0.1,
            },
          },
          'equals',
          root([frac('_31', 'v1', '_4', 0.7), sq('A2', '_23')], 'r2'),
          'equals1',
          frac(root('_33', 'r4'), 'v2', root('_41', 'r5'), 0.7),
          root(sq('A3', '_24'), 'r6'),
          'equals2',
          [frac(root('_32', 'r3'), 'v3', '_21', 0.7), 'A1'],
        ],
        '10': [
          'H2',
          'equals',
          [frac(root('_32', 'r3'), 'v3', '_21', 0.7), 'A1'],
        ],
      },
    },
    mods: {
      scenarios: {
        side: { position: [0, 0.6] },
      },
    },
  };

  layout.addElements = [
    equil,
    eqn,
  ];
  return layout;
}
