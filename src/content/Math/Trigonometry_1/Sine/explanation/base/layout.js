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
      }
    },
  });
  const angle = (name, text) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      p1: [1, 0],
      p2: [0, 0],
      p3: [0, 1],
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
  const lineLabel = (name, text, color, location) => ({
    name,
    method: 'line',
    options: {
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
      axis('x', [0, 0], [r * 1.2, 0]),
      // axis('y', [0, 0], [0, r * 1.2]),
      angle('real', null),
      angle('theta', '\u03B8'),
      angle('right', ''),
      lineLabel('sineTheta', 'sin \u03B8', colors.components, 'right'),
      lineLabel('sine', null, colors.components, 'right'),
      component('h'),
      component('v'),
      line,
    ],
    mods: {
      scenarios: {
        default: { position: [-1.5, -1] },
      },
    },
  };
  // const eqn = {
  //   name: 'eqn',
  //   method: 'addEquation',
  //   options: {
  //     color: colors.diagram.text.base,
  //     scale: 0.9,
  //     elements: {
  //       equals: '  =  ',
  //       a: { color: colors.angles },
  //       b: { color: colors.angles },
  //       v: { symbol: 'vinculum' },
  //       brace: {
  //         symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
  //       },
  //       lb: { symbol: 'bracket', side: 'left' },
  //       rb: { symbol: 'bracket', side: 'right' },
  //       strike: { symbol: 'xStrike', color: colors.working },
  //       r: { symbol: 'radical', color: colors.sides },
  //     },
  //     defaultFormAlignment: {
  //       fixTo: 'equals',    // Points can also be defined as objects
  //       alignH: 'center',
  //       alignV: 'baseline',
  //     },
  //     forms: {
  //       '0': ['a', 'equals', 'b'],
  //     },
  //   },
  // };

  layout.addElements = [
    fig,
  ];
  return layout;
}
