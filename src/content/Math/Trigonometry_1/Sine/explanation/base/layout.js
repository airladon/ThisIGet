// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.lines = colors.get('blue').rgb;
  colors.components = colors.get('green').rgb;
  colors.angles = colors.get('red').rgb;
  colors.axes = colors.get('grey', 'dark').rgb;

  const eqnSine = ({
    elements: {
      r: { text: 'r', color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      sin: { text: 'sin', color: colors.components, style: 'normal' },
      theta: { text: '\u03B8', color: colors.components },
    },
    forms: {
      '0': {
        content: ['sin', ' ', 'theta'],
        scale: 1,
        alignment: { alignH: 'center' },
      },
      '1': {
        content: ['r', 'times', 'sin', ' ', 'theta'],
        scale: 1,
      },
      '2': {
        content: ['r', ' ', 'sin', ' ', 'theta'],
        scale: 1,
      },
    },
  });

  const eqnR = ({
    elements: {
      r: { text: 'r', color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      _1: { text: '1', color: colors.lines },
    },
    forms: {
      '0': {
        content: ['_1'],
        scale: 1,
        alignment: { alignH: 'center' },
      },
      '1': {
        content: ['r', 'times', '_1'],
        scale: 1,
      },
      '2': {
        content: ['r'],
        scale: 1,
      },
    },
  });

  const r = 2;
  const line = {
    name: 'line',
    method: 'line',
    options: {
      length: r,
      rotation: 0,
      width: 0.03,
      move: { type: 'rotation' },
      color: colors.lines,
    },
    mods: {
      interactiveLocation: [r / 2, 0],
      move: {
        canBeMovedAfterLoosingTouch: true,
        maxTransform: new Transform().scale(1, 1).rotate(Math.PI / 2).translate(1000, 1000),
        minTransform: new Transform().scale(1, 1).rotate(0).translate(-1000, -1000),
      },
    },
  };
  const component = name => ({
    name,
    method: 'line',
    options: {
      p1: [0, 0],
      p2: [1, 0],
      color: colors.components,
      width: 0.015,
    },
  });
  const axis = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      color: colors.axes,
      width: 0.008,
      dashStyle: {
        style: [0.1, 0.05],
      },
    },
  });
  const angle = (name, text, p1 = [1, 0], p2 = [0, 0], p3 = [0, 1]) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      p1,
      p2,
      p3,
      curve: {
        radius: 0.3,
        width: 0.015,
        sides: 200,
      },
      label: {
        text,
        radius: 0.3,
      },
      autoRightAngle: true,
    },
  });
  const lineLabel = (name, text, color, location, p1 = [0, 0], p2 = [1, 0]) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      showLine: false,
      label: {
        text,
        offset: 0.1,
        location,
      },
      color,
    },
  });
  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      axis('x', [0, 0], [r * 1, 0]),
      // axis('y', [0, 0], [0, r * 1.2]),
      angle('real', null),
      angle('theta', '\u03B8'),
      angle('right', ''),
      lineLabel('sineTheta', eqnSine, colors.components, 'right'),
      lineLabel('sine', null, colors.components, 'right'),
      lineLabel('opposite', 'opposite', colors.components, 'right'),
      lineLabel('hypotenuse', eqnR, colors.lines, 'left'),
      component('h'),
      component('v'),
      line,
    ],
    mods: {
      scenarios: {
        default: { position: [-r / 2, -1] },
      },
    },
  };

  const triPoints = [[-2, -1], [1, 1], [2, -1]];
  const basePoint = [triPoints[1][0], triPoints[0][1]];
  const triangle = {
    name: 'tri',
    method: 'collection',
    addElements: [
      angle('right', '', triPoints[1], basePoint, triPoints[0]),
      angle('leftAngle', 'b', triPoints[2], triPoints[0], triPoints[1]),
      angle('rightAngle', 'a', triPoints[1], triPoints[2], triPoints[0]),
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points: triPoints,
          close: true,
          width: 0.03,
          color: colors.lines,
        },
      },
      {
        name: 'height',
        method: 'line',
        options: {
          p1: [1, -1],
          p2: [1, 1],
          color: colors.lines,
          dashStyle: {
            style: [0.1, 0.05],
          },
          width: 0.01,
          label: {
            text: 'H',
            offset: 0.1,
          },
        },
      },
      lineLabel('leftSide', 'A', colors.lines, 'top', triPoints[0], triPoints[1]),
      lineLabel('rightSide', 'B', colors.lines, 'top', triPoints[2], triPoints[1]),
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.5] },
      },
    },
  };

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        equals: '  =  ',
        func: 'function',
        theta: { text: '\u03B8', color: colors.angles },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        v: { symbol: 'vinculum' },
        opp: { text: 'opposite', color: colors.components },
        // brace: {
        //   symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        // },
        // strike: { symbol: 'xStrike', color: colors.working },
        // r: { symbol: 'radical', color: colors.sides },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': {
          content: ['func', { brac: ['theta', 'lb', 'rb'] }, 'equals', 'opp'],
          alignment: {
            fixTo: 'equals',
          },
        },
      },
    },
    mods: {
      scenarios: {
        default: { position: [0, -1.5] },
      },
    },
  };

  layout.addElements = [
    fig,
    triangle,
    eqn,
  ];
  return layout;
}
