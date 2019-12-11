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
  colors.get('red').toCssVar('--color-angles');
  colors.get('green').toCssVar('--color-components');
  colors.working = colors.get('grey', 'dark').rgb;

  const eqnSine = ({
    elements: {
      r: { text: 'r', color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      sin: { text: 'sin', color: colors.components, style: 'normal' },
      theta: { text: '\u03B8', color: colors.components },
      opposite: { text: 'opposite', color: colors.components },
      vertical: { text: 'vertical', color: colors.components },
      brace: {
        symbol: 'brace', side: 'top', color: colors.working, numLines: 3,
      },
    },
    forms: {
      '0': {
        content: ['vertical'],
        scale: 0.9,
        alignment: { alignH: 'center' },
      },
      '0a': {
        content: {
          topComment: {
            content: 'vertical',
            comment: 'opposite',
            symbol: 'brace',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center' },
      },
      '1': {
        content: ['opposite'],
        scale: 0.9,
        alignment: { alignH: 'center' },
      },
      '2': {
        content: ['sin', ' ', 'theta'],
        scale: 1,
        alignment: { alignH: 'center' },
      },
      '3': {
        content: ['r', 'times', 'sin', ' ', 'theta'],
        scale: 1,
      },
      '4': {
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
  layout.r = r;
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
  const angle = (name, text, radius = 0.3, p1 = [1, 0], p2 = [0, 0], p3 = [0, 1]) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      p1,
      p2,
      p3,
      curve: {
        radius,
        width: 0.015,
        sides: 200,
      },
      label: {
        text,
        radius,
      },
      autoRightAngle: true,
    },
  });
  const lineLabel = (name, text, color, location, subLocation, p1 = [0, 0], p2 = [1, 0]) => ({
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
        subLocation,
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
      {
        name: 'arc',
        method: 'polygon',
        options: {
          sides: 600,
          width: 0.015,
          radius: r,
          color: colors.angles,
        },
      },
      angle('real', null),
      angle('theta', '\u03B8'),
      angle('right', ''),
      lineLabel('sineTheta', eqnSine, colors.components, 'right'),
      lineLabel('sine', null, colors.components, 'right'),
      lineLabel('opposite', 'opposite', colors.components, 'right'),
      lineLabel('hypotenuse', eqnR, colors.lines, 'top', 'left'),
      component('h'),
      component('v'),
      // angle('arc', )
      line,
    ],
    mods: {
      scenarios: {
        default: { position: [-r / 2, -1] },
      },
    },
  };

  // const triPoints = [[-2, -1], [1, 1], [2, -1]];
  // const basePoint = [triPoints[1][0], triPoints[0][1]];
  // const triangle = {
  //   name: 'tri',
  //   method: 'collection',
  //   addElements: [
  //     angle('right', '', 0.3, triPoints[1], basePoint, triPoints[0]),
  //     angle('leftAngle', 'b', 0.3, triPoints[2], triPoints[0], triPoints[1]),
  //     angle('rightAngle', 'a', 0.3, triPoints[1], triPoints[2], triPoints[0]),
  //     {
  //       name: 'line',
  //       method: 'polyLine',
  //       options: {
  //         points: triPoints,
  //         close: true,
  //         width: 0.03,
  //         color: colors.lines,
  //       },
  //     },
  //     {
  //       name: 'height',
  //       method: 'line',
  //       options: {
  //         p1: [1, -1],
  //         p2: [1, 1],
  //         color: colors.lines,
  //         dashStyle: {
  //           style: [0.1, 0.05],
  //         },
  //         width: 0.01,
  //         label: {
  //           text: 'H',
  //           offset: 0.1,
  //         },
  //       },
  //     },
  //     lineLabel('leftSide', 'A', colors.lines, 'top', 'left', triPoints[0], triPoints[1]),
  //     lineLabel('rightSide', 'B', colors.lines, 'top', 'right', triPoints[2], triPoints[1]),
  //   ],
  //   mods: {
  //     scenarios: {
  //       default: { position: [0, -0.5] },
  //     },
  //   },
  // };

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        equals: '  =  ',
        equals1: '  =  ',
        equals2: '  =  ',
        approx: '  \u2248  ',
        func: 'function',
        vert: { text: 'vertical', color: colors.components },
        theta: { text: '\u03B8', color: colors.angles },
        theta1: { text: '\u03B8', color: colors.angles },
        theta2: { text: '\u03B8', color: colors.angles },
        theta3: { text: '\u03B8', color: colors.angles },
        theta4: { text: '\u03B8', color: colors.angles },
        pi1: 'π',
        pi2: 'π',
        pi3: 'π',
        pi4: 'π',
        '16': '16',
        '5': '5',
        '5f': '5!',
        '4': '4',
        '2': '2',
        '3': '3',
        '3f': '3!',
        '7': '7',
        '7f': '7!',
        'minus1': '  –  ',
        'minus2': '  –  ',
        'minus3': '  –  ',
        'dots': '...',
        'plus1': '  +  ',
        'plus2': '  +  ',
        'sine': { text: 'sine', style: 'normal' },
        'AB': 'AB',
        'sin1': { text: 'sin', style: 'normal' },
        'sin2': { text: 'sin', style: 'normal' },
        lb: { symbol: 'angleBracket', side: 'left', lineWidth: 0.012, staticSize: false },
        rb: { symbol: 'angleBracket', side: 'right' },
        lb1: { symbol: 'bracket', side: 'left' },
        rb1: { symbol: 'bracket', side: 'right' },
        v: { symbol: 'vinculum' },
        v1: { symbol: 'vinculum' },
        v2: { symbol: 'vinculum' },
        opp: { text: 'opposite', color: colors.components },
        angle: { text: 'angle', color: colors.angles },
        brace: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
        },
        brace1: {
          symbol: 'brace', side: 'top', numLines: 2, color: colors.working,
        },
        box: { symbol: 'box', color: [0, 0.9, 0, 1], width: 0.005 },
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
          content: ['vert', 'equals', 'func', {
            box: [
              {
                pad: [
                  {
                    brac: ['AB', 'lb', 'rb', true, null, null, null, null, null, null, null, null],
                    // space: number = 0.03,
                    // overhang: number | null = 0,
                    // barLength: number | null = null,
                    // left: number | null = null,
                    // right: number | null = null,
                    // top: number | null = null,
                    // bottom: number | null = null,
                    // inSize: boolean = true,
                    // bar: ['angle', 'lb', 'right', 0.1, 0.1, null, null, null, null, null, false],
                    // topComment: ['angle', 'opp', 'lb', 0.05, 0.05],
                    // annotate: {
                    //   content: 'angle',
                    //   withAnnotations: ['opp', 'center', 'top', 'center', 'bottom', 0.5, 0, 0.1],
                    // },
                  },
                  0, 0, 0, 0,
                ],
              },
              'box',
            ],
          }],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'asd': {
          content: ['vert', 'equals', 'func', {
            box: [
              {
                pad: [
                  {
                    // brac: ['angle', 'lb', 'rb', 0.05, 0, 0.06, 0.02, null, null, null, null, true],
                    // space: number = 0.03,
                    // overhang: number | null = 0,
                    // barLength: number | null = null,
                    // left: number | null = null,
                    // right: number | null = null,
                    // top: number | null = null,
                    // bottom: number | null = null,
                    // inSize: boolean = true,
                    // bar: ['angle', 'lb', 'right', 0.1, 0.1, null, null, null, null, null, false],
                    bottomComment: [
                      { topComment: ['angle', 'opp', 'lb', 0.05, 0.05] },
                      'sine',
                      'rb',
                    ],
                    // annotate: {
                    //   content: {
                    //     annotate: {
                    //       content: 'angle',
                    //       withAnnotations: ['opp', 'center', 'top', 'center', 'bottom', 0.5, 0, 0.1],
                    //     },
                    //   },
                    //   withAnnotations: ['sine', 'center', 'top', 'center', 'bottom', 0.5, 0, 0.1],
                    // },
                  },
                  0, 0, 0, 0,
                ],
              },
              'box',
            ],
          }],
          // content: ['vert', 'equals', 'func', {
          //   brac: [{ frac: ['angle', 'opp', 'v1'] }, 'lb', 'rb', 0.0, 0.2, 0.06, 0.02],
          //   // brac: ['angle', 'lb', 'rb', 0.05, 0.2, 0.06, 0.02],
          // }],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        // '1': {
        //   content: [{
        //     topComment: {
        //       content: 'vert',
        //       comment: 'opp',
        //       symbol: 'brace',
        //     },
        //   }, 'equals', 'func', {
        //     brac: [{
        //       topComment: {
        //         content: 'angle',
        //         comment: 'theta',
        //         symbol: 'brace1',
        //         inSize: false,
        //       },
        //     }, 'lb', 'rb'],
        //   },
        //   'minus1',
        //   {
        //     annotate: {
        //       content: 'sin1',
        //       withAnnotations: [
        //         {
        //           annotation: {
        //             annotation: '4',
        //             relativeToContent: [1, 1],
        //             relativeToAnnotation: [0, 0],
        //             scale: 0.5,
        //           },
        //         },
        //       ],
        //     },
        //   },
        //   ],
        //   alignment: {
        //     fixTo: 'equals',
        //     alignH: 'right',
        //   },
        // },
        // '2': {
        //   content: ['opp', 'equals', 'func', { brac: ['theta', 'lb', 'rb'] }],
        //   alignment: {
        //     fixTo: 'equals',
        //     alignH: 'right',
        //   },
        // },
        // '0b': {
        //   content: ['opp', 'equals', 'func', { brac: ['theta', 'lb', 'rb'] }],
        //   alignment: {
        //     fixTo: 'opp',
        //     alignH: 'right',
        //   },
        // },
        // '0a': {
        //   content: [
        //     'opp', 'equals', 'sine', { brac: ['theta', 'lb', 'rb'] },
        //   ],
        //   alignment: {
        //     fixTo: 'opp',
        //     alignH: 'right',
        //   },
        // },
        // // '0b': {
        // //   content: [
        // //     'opp', 'equals', 'sine', { brac: ['theta', 'lb', 'rb'] },
        // //     'equals1', 'sin1', { brac: ['theta1', 'lb1', 'rb1'] },
        // //   ],
        // //   alignment: {
        // //     fixTo: 'opp',
        // //     alignH: 'right',
        // //   },
        // // },
        // '0c': {
        //   content: [
        //     'opp', 'equals', 'sine', { brac: ['theta', 'lb', 'rb'] },
        //     'equals1', 'sin1', ' ' , 'theta1',
        //   ],
        //   alignment: {
        //     fixTo: 'opp',
        //     alignH: 'right',
        //   },
        // },
        // '0d': {
        //   content: [
        //     'opp', 'equals', 'sine', { brac: ['theta', 'lb', 'rb'] },
        //     'equals1', 'sin1', { brac: ['theta1', 'lb1', 'rb1'] },
        //     'equals2', 'sin2', ' ', 'theta2',
        //   ],
        //   alignment: {
        //     fixTo: 'opp',
        //     alignH: 'right',
        //   },
        // },
        // '5': {
        //   content: [
        //     'opp', 'approx', {
        //       frac: [
        //         ['16', 'theta', { brac: [['pi1', 'minus1', 'theta1'], 'lb', 'rb'] }],
        //         ['5', { sup: ['pi2', '2'] }, 'minus2', '4', 'theta3', {
        //           brac: [['pi3', 'minus3', 'theta4'], 'lb1', 'rb1'],
        //         }],
        //         'v',
        //       ],
        //     },
        //   ],
        //   alignment: {
        //     alignH: 0.8,
        //   },
        // },
        // '6': {
        //   content: [
        //     'opp', 'equals', 'theta', 'minus1',
        //     { frac: [{ sup: ['theta1', '2', 0.6, 0.02] }, '3f', 'v'] },
        //     'plus1',
        //     { frac: [{ sup: ['theta2', '3', 0.6, 0.02] }, '5f', 'v1'] },
        //     'minus2',
        //     { frac: [{ sup: ['theta3', '7', 0.6, 0.02] }, '7f', 'v2'] },
        //     'plus2', 'dots',
        //   ],
        //   alignment: {
        //     alignH: 0.4,
        //   },
        // },
      },
    },
    mods: {
      scenarios: {
        default: { position: [-0.5, -1.6] },
      },
      pulseDefault: { scale: 1.4 },
    },
  };

  layout.addElements = [
    fig,
    // triangle,
    eqn,
  ];
  return layout;
}
