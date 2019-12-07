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

  const side = 2.3;
  const equilHeight = side * Math.sqrt(3) * 0.5;
  const equilPoints = [
    new Point(-0.5 * side, -1 / 3 * equilHeight),
    new Point(0, 2 / 3 * equilHeight),
    new Point(0.5 * side, -1 / 3 * equilHeight),
  ];
  const squarePoints = [
    new Point(-0.5 * side, -0.5 * side),
    new Point(-0.5 * side, 0.5 * side),
    new Point(0.5 * side, 0.5 * side),
    new Point(0.5 * side, -0.5 * side),
  ];

  const eqnA = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      _1: { text: '1', color: colors.sides },
      s1: { symbol: 'xStrike', color: colors.working },
    },
    forms: {
      '0': {
        content: 'A',
        scale: 1,
      },
      '1': {
        content: 'A',
        scale: 1,
      },
      '2': {
        content: 'A',
        scale: 1,
      },
      '3': {
        content: [{
          annotate: {
            content: { strike: ['A', 's1', false] },
            withAnnotations: ['_1'],
            inSize: false,
          },
        }],
        scale: 1,
      },
      '4': {
        content: ['_1'],
        scale: 1,
      },
    },
  });

  const eqnD = ({
    elements: {
      D: { text: 'D', color: colors.sides },
      equals: ' = ',
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
      _2_: { text: '2', color: colors.sides },
      _1: { text: '1', color: colors.sides },
      s1: { symbol: 'xStrike', color: colors.working },
    },
    forms: {
      '0': {
        content: ['D'],
        scale: 1,
        alignment: { fixTo: 'D' },
      },
      '1': {
        content: ['D', 'equals', { root: ['_2', 'r'] }, 'A'],
        scale: 1,
        alignment: { fixTo: 'D' },
      },
      '2': {
        content: [{ root: ['_2', 'r'] }, 'A'],
        scale: 1,
        alignment: { alignV: -0.01, alignH: 0.2 },
      },
      '3': {
        content: [{ root: ['_2', 'r'] }, {
          annotate: {
            content: { strike: ['A', 's1'] },
            withAnnotations: ['_1'],
            inSize: false,
          },
        }],
        alignment: { alignV: -0.01, alignH: 0.2 },
        scale: 1,
      },
      '4': {
        content: { root: ['_2', 'r'] },
        alignment: { alignV: -0.01, alignH: 0.2 },
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
    method: 'polyLine',
    options: {
      points: equilPoints,
      close: true,
      width: 0.03,
      color: colors.sides,
      angle: {
        color: colors.angles,
        curve: {
          width: 0.015,
          sides: 100,
          radius: 0.25,
        },
        label: {
          text: null,
          radius: 0.22,
        },
      },
      side: {
        label: {
          text: 'A',
          location: 'outside',
          offset: 0.1,
          scale: 1,
        },
      },
    },
    mods: {
      scenarios: {
        default: { position: [0, -0.7] },
      },
    },
  };

  const square = {
    name: 'square',
    method: 'collection',
    addElements: [
      lineLabel('A1', eqnA, squarePoints[1], squarePoints[2], 'top', 'left'),
      lineLabel('A2', eqnA, squarePoints[2], squarePoints[3], 'top', 'right'),
      lineLabel('D', eqnD, squarePoints[1], squarePoints[3], 'bottom', 'left', 0.2),
      angle('451', null, squarePoints[3], squarePoints[1], squarePoints[2], 0.3),
      angle('452', null, squarePoints[2], squarePoints[3], squarePoints[1], 0.3),
      angle('right', '', squarePoints[1], squarePoints[2], squarePoints[3], 0.3),
      {
        name: 'square',
        method: 'polyLine',
        options: {
          points: squarePoints,
          width: 0.03,
          color: colors.sides,
          close: true,
          angle: {
            color: colors.angles,
            curve: {
              radius: 0.3,
              width: 0.015,
            },
            label: {
              text: '',
            },
          },
          autoRightAngle: true,
        },
      },
      {
        name: 'split',
        method: 'line',
        options: {
          p2: squarePoints[3],
          p1: squarePoints[1],
          width: 0.03,
          color: colors.sides,
        },
      },
      {
        name: 'tri',
        method: 'polyLine',
        options: {
          points: [squarePoints[1], squarePoints[2], squarePoints[3]],
          width: 0.03,
          color: colors.sides,
          close: true,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.2], rotation: 0, scale: 1 },
        side: { position: [0.3, -1.4], rotation: Math.PI / 4, scale: 1 },
        sideCenter: { position: [0.3, -0.9], rotation: Math.PI / 4, scale: 1 },
      },
    },
  };

  const sq = (content, power, bias = 0) => ({
    sup: [content, power, 0.6, new Point(bias, 0)],
  });

  // const frac = (num, den, v, scale = 1) => ({
  //   frac: [num, den, v, scale],
  // });

  // const brac = (content, lb, rb) => ({
  //   brac: [content, lb, rb],
  // });

  // const strike = (content, strike) => ({
  //   strike: [content, strike],
  // });

  const root = (content, radical) => ({
    root: [content, radical],
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
        D1: { text: 'D', color: colors.sides },
        D2: { text: 'D', color: colors.sides },
        A1: { text: 'A', color: colors.sides },
        A2: { text: 'A', color: colors.sides },
        A3: { text: 'A', color: colors.sides },
        A4: { text: 'A', color: colors.sides },
        _21: '2',
        _22: '2',
        _23: '2',
        _24: '2',
        _25: '2',
        _26: '2',
        _27: '2',
        plus: ' + ',
        brace1: {
          symbol: 'brace', side: 'top', numLines: 2, color: colors.working,
        },
        brace2: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        },
        // lb: { symbol: 'bracket', side: 'left', numLines: 2 },
        // rb: { symbol: 'bracket', side: 'right', numLines: 2 },
        strike1: { symbol: 'xStrike', color: colors.working },
        strike2: { symbol: 'xStrike', color: colors.working },
        r1: { symbol: 'radical' },
        r2: { symbol: 'radical' },
        r3: { symbol: 'radical' },
        r4: { symbol: 'radical' },
        // r5: { symbol: 'radical' },
        // r6: { symbol: 'radical' },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': [
          sq('D1', '_21', 0.02), 'equals',
          sq('A1', '_22', 0.02), 'plus', sq('A2', '_23', 0.02),
        ],
        '1': [
          sq('D1', '_21', 0.02), 'equals',
          {
            topComment: {
              content: [sq('A1', '_22', 0.02), 'plus', sq('A2', '_23', 0.02)],
              comment: ['_24', sq('A3', '_25', 0.02)],
              symbol: 'brace1',
            },
          },
        ],
        '2': [
          sq('D1', '_21', 0.02), 'equals',
          '_24', sq('A3', '_25', 0.02),
        ],
        '3': [
          root(sq('D1', '_21', 0.02), 'r1'), 'equals',
          root(['_24', sq('A3', '_25', 0.02)], 'r2'),
        ],
        '4': [
          root(sq('D1', '_21', 0.02), 'r1'), 'equals',
          root(['_24', sq('A3', '_25', 0.02)], 'r2'), 'equals1',
          root('_26', 'r3'), root(sq('A4', '_27', 0.02), 'r4'),
        ],
        '5': [
          root(sq('D1', '_21', 0.02), 'r1'), 'equals',
          root('_26', 'r3'), root(sq('A4', '_27', 0.02), 'r4'),
        ],
        '6': [
          {
            topComment: {
              content: root(sq('D1', '_21', 0.02), 'r1'),
              comment: 'D2',
              symbol: 'brace1',
            },
          },
          'equals', root('_26', 'r3'),
          {
            topComment: {
              content: root(sq('A4', '_27', 0.02), 'r4'),
              comment: 'A1',
              symbol: 'brace2',
            },
          },
        ],
        '7': ['D2', 'equals', root('_26', 'r3'), 'A1'],
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
    square,
    eqn,
  ];
  return layout;
}
