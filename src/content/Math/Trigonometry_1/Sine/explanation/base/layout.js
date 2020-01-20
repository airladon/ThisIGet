// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig.tools.g2;

const { round } = Fig.tools.math;

const { DiagramFont } = Fig;
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
  colors.get('blue').toCssVar('--color-lines');
  colors.working = colors.get('grey', 'dark').rgb;

  const eqnOpp = ({
    elements: {
      value: { text: '0.000', color: colors.components },
      r: { color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      opposite: { color: colors.components },
      brace: {
        symbol: 'brace', width: 0.05, lineWidth: 0.012, color: colors.working, side: 'top',
      },
    },
    forms: {
      'real': {
        content: {
          container: {
            content: 'value',
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'realTimesR': {
        content: {
          container: {
            content: ['value', 'times', 'r'],
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'realR': {
        content: {
          container: {
            content: ['value', 'r'],
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'realRToOpposite': {
        content: {
          container: {
            content: {
              topComment: {
                content: ['value', 'r'],
                comment: 'opposite',
                symbol: 'brace',
                inSize: false,
              },
            },
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'opposite': {
        content: {
          container: {
            content: ['opposite'],
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'oppositeTimesR': {
        content: {
          container: {
            content: ['opposite', 'times', 'r'],
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
      'oppositeR': {
        content: {
          container: {
            content: ['opposite', 'r'],
            width: 0.7,
            ascent: 0.13,
            descent: 0.05,
            xAlign: 'left',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
    },
  });

  const eqnAngle = ({
    elements: {
      angle: { color: colors.angles },
      theta: { text: '\u03B8', color: colors.angles },
      brace: {
        symbol: 'brace', lineWidth: 0.012, width: 0.05, side: 'top', color: colors.working,
      },
      box: { symbol: 'box', color: [0, 0, 0, 0] },
      value: { text: '40º', color: colors.angles },
    },
    forms: {
      'real': {
        content: {
          container: {
            content: ['value'],
            width: 0.5,
            descent: 0.04,
            ascent: 0.13,
            xAlign: 0.1,
            yAlign: 'bottom',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 0.7 },
      },
      'angle': {
        content: {
          container: {
            content: ['angle'],
            width: 0.5,
            descent: 0.04,
            ascent: 0.13,
            xAlign: 0.1,
            yAlign: 'bottom',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 0.7 },
      },
      'angleToTheta': {
        content: {
          container: {
            content: {
              topComment: {
                content: 'angle', comment: 'theta', symbol: 'brace', inSize: false,
              },
            },
            width: 0.5,
            descent: 0.04,
            ascent: 0.13,
            xAlign: 0.1,
            yAlign: 'bottom',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 0.7 },
      },
      'theta': {
        content: {
          container: {
            content: ['theta'],
            width: 0.5,
            descent: 0.04,
            ascent: 0.13,
            xAlign: 0.1,
            yAlign: 'bottom',
          },
        },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 0.7 },
      },
    },
  });

  const eqnR = ({
    elements: {
      r: { text: 'r', color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      _1: { text: '1', color: colors.lines },
      s: { symbol: 'strike', style: 'cross', color: colors.working },
      value: { text: '1.', color: colors.line },
      hyp: { text: 'hypotenuse', color: colors.line },
      brace: { symbol: 'brace', width: 0.05, lineWidth: 0.012, color: colors.working, side: 'top' },
    },
    forms: {
      real: {
        content: {
          container: {
            content: 'value',
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        alignment: { alignH: 'center' },
      },
      realTimesR: {
        content: {
          container: {
            content: ['r', 'times', 'value'],
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        alignment: { alignH: 'center' },
      },
      r: {
        content: {
          container: {
            content: ['r'],
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        alignment: { alignH: 'center' },
      },
      rToHyp: {
        content: {
          container: {
            content: {
              topComment: {
                content: ['  ', 'r', '  '],
                comment: 'hyp',
                symbol: 'brace',
                inSize: false,
              },
            },
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        alignment: { alignH: 'center' },
      },
      hyp: {
        content: {
          container: {
            content: 'hyp',
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        alignment: { alignH: 'center' },
      },
      '0': {
        content: {
          container: {
            content: '_1',
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
        // alignment: { alignH: 'center' },
      },
      '1': {
        content: {
          container: {
            content: ['r', 'times', '_1'],
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
      },
      '1a': {
        content: {
          container: {
            content: [
              'r',
              'times',
              { strike: ['_1', 's'] },
            ],
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
      },
      '2': {
        content: {
          container: {
            content: 'r',
            width: 0.07,
            xAlign: 'right',
          },
        },
        scale: 1,
      },
    },
  });

  const r = 2;
  layout.r = r;
  const line = (name, min, max) => ({
    name,
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
        maxTransform: new Transform().scale(1, 1).rotate(max).translate(1000, 1000),
        minTransform: new Transform().scale(1, 1).rotate(min).translate(-1000, -1000),
      },
    },
  });
  const component = (name, color) => ({
    name,
    method: 'line',
    options: {
      p1: [0, 0],
      p2: [1, 0],
      color,
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

  const circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      sides: 400,
      lineWidth: 0.008,
      radius: r,
      color: colors.working,
    },
  };

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
        scale: 0.9,
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
      // {
      //   name: 'arc1',
      //   method: 'polygon',
      //   options: {
      //     sides: 600,
      //     width: 0.015,
      //     radius: r,
      //     color: colors.angles,
      //   },
      // },
      circle,
      {
        name: 'arc',
        method: 'polygon',
        options: {
          sides: 400,
          width: 0.015,
          radius: r,
          color: colors.angles,
        },
      },
      {
        name: 'mirrorArc',
        method: 'polygon',
        options: {
          sides: 400,
          width: 0.015,
          radius: r,
          color: colors.angles,
          clockwise: true,
        },
      },
      // angle('real', null),
      angle('theta', eqnAngle),
      // angle('theta', eqnAngle),
      angle('right', ''),
      angle('complement', null),
      // lineLabel('sineTheta', eqnSine, colors.components, 'right'),
      // lineLabel('sine', null, colors.components, 'right'),
      // lineLabel('opposite', 'opposite', colors.components, 'right'),
      lineLabel('hypotenuse', eqnR, colors.lines, 'top', 'left'),
      // lineLabel('realHyp', null, colors.lines, 'top', 'left'),
      lineLabel('oppLabel', eqnOpp, colors.components, 'right'),
      component('h', colors.lines),
      component('v', colors.lines),
      component('opp', colors.components),
      component('mirrorV', colors.components),
      // angle('arc', )
      line('mirrorLine', -Math.PI / 2, 0),
      line('line', 0, Math.PI / 2),
    ],
    mods: {
      scenarios: {
        default: { position: [-r / 2, -1], scale: 1 },
        left: { position: [-2.3, -1], scale: 1 },
        small: { position: [0, 0.3], scale: 0.5 },
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
        hyp1: { text: 'hypotenuse = 1', color: colors.components },
        hyp: { text: 'hypotenuse', color: colors.lines },
        hyp1_1: { text: 'hypotenuse = 1' },
        hypr: { text: 'hypotenuse = r', color: colors.components },
        r: { color: colors.lines },
        r_1: { color: colors.lines },
        times: ' \u00D7 ',
        times1: ' \u00D7 ',
        pi1: 'π',
        pi2: 'π',
        pi3: 'π',
        pi4: 'π',
        '16': '16',
        '5': '5 and here it is',
        '5f': '5!',
        '4': '4',
        '2': '2',
        '3': '3',
        '3f': '3!',
        '7': '7',
        '7f': '7!',
        'a': 'a',
        'minus1': '  –  ',
        'minus2': '  –  ',
        'minus3': '  –  ',
        'dots': '...',
        'plus1': '  +  ',
        'plus2': '  +  ',
        'sine': { text: 'sine', style: 'normal' },
        'sin': { text: 'sin', style: 'normal' },
        // 'AB': { text: 'AB', font: new DiagramFont('Times New Roman', 'normal', 0.3, 'bold', 'left', 'alphabetic', [1, 0, 0, 1]) },
        'AB': { text: 'AB', weight: 'normal', size: 0.3 },
        'sin1': { text: 'sin', style: 'normal' },
        'sin2': { text: 'sin', style: 'normal' },
        lb: {
          symbol: 'bracket',
          side: 'left',
          // side: 'top',
          // staticHeight: 'first',
          // staticHeight: 1,
          // draw: 'static',
          // radius: 0.1,
          // width: 0.05,
          // tipWidth: 0.01,
          // height: 0.4,
          // lineWidth: 0.015,
        },
        rb: { symbol: 'bracket', side: 'right' },
        lb1: { symbol: 'squareBracket', side: 'left' },
        rb1: { symbol: 'squareBracket', side: 'right' },
        sym: {
          symbol: 'int',
          draw: 'dynamic',
          sides: 20,
          // staticHeight: 'first',
          // width: 1.6,
          // lineWidth: 0.05,
          // percentage: 0.99999999999,
          // tipWidth: 0.06,
          // lineWidth: 0.17,
          num: 3,
          serif: true,
          type: 'line',
          lineIntegralSides: 50,
        },
        arrow: { symbol: 'arrow' },
        v: { symbol: 'vinculum' },
        v1: { symbol: 'vinculum' },
        v2: { symbol: 'vinculum' },
        opp: { text: 'opposite', color: colors.components },
        opp1: { text: 'opposite', color: colors.components },
        angle: { text: 'angle', color: colors.angles },
        brace: {
          symbol: 'brace', side: 'top', color: colors.working, width: 0.05, lineWidth: 0.012,
        },
        brace1: {
          symbol: 'brace', side: 'top', width: 0.05, lineWidth: 0.012,  color: colors.working,
        },
        box: {
          symbol: 'box',
          color: [0, 0.9, 0, 1],
          lineWidth: 0.05,
          draw: 'static',
          staticHeight: 'first',
          staticWidth: 'first',
          // fill: true,
        },
        l1: {
          symbol: 'brace',
          side: 'left',
        },
        // r1: {
        //   symbol: 'brace',
        //   side: 'right',
        //   lineWidth: 0.02,
        //   width: 0.1,
        // },
        box1: { symbol: 'box', color: [0, 0.9, 0, 1], lineWidth: 0.005 },
        v: { symbol: 'vinculum' },
        s1: { symbol: 'strike', style: 'horizontal', lineWidth: 0.05 },
        rad: { symbol: 'radical', draw: 'dynamic' },
        // strike: { symbol: 'xStrike', color: colors.working },
        // r: { symbol: 'radical', color: colors.sides },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        'base': {
          content: [
            // {
            //   bottomComment: {
            //     content: 'opp',
            //     comment: 'hyp1',
            //     inSize: false,
            //     scale: 0.5,
            //   },
            // },
            'opp',
            'equals', 'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'baseTimesR': {
          content: [
            'r', 'times',
            {
              bottomComment: {
                content: 'opp',
                comment: 'hyp1',
                inSize: false,
                scale: 0.5,
              },
            },
            'equals',
            'r_1', 'times1',
            'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'baseTimesRToHypR': {
          content: [
            {
              topComment: {
                content: [
                  'r', 'times',
                  {
                    bottomComment: {
                      content: 'opp',
                      comment: 'hyp1',
                      inSize: false,
                      scale: 0.5,
                    },
                  },
                ],
                comment: {
                  bottomComment: {
                    content: 'opp1',
                    comment: 'hypr',
                    scale: 0.6,
                    insize: false,
                  },
                },
                symbol: 'brace1',
                inSize: false,
              },
            },
            'equals',
            'r_1', 'times1',
            'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'hypR': {
          content: [
            {
              bottomComment: {
                content: 'opp1',
                comment: 'hypr',
                scale: 0.6,
                insize: false,
              },
            },
            'equals',
            'r_1', 'times1',
            'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'hypRToGeneral': {
          content: [
            {
              topComment: {
                content: {
                  bottomComment: {
                    content: 'opp1',
                    comment: 'hypr',
                    scale: 0.6,
                    insize: false,
                  },
                },
                comment: 'opp',
                symbol: 'brace',
                inSize: false,
              },
            },
            'equals',
            {
              topComment: {
                content: ['  ', 'r_1', '  '],
                comment: 'hyp',
                symbol: 'brace1',
                inSize: false,
                contentSpace: 0.08,
              },
            },
            'times1',
            'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        'general': {
          content: [
            'opp',
            'equals',
            'hyp',
            'times1',
            'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 2.2,
          },
        },
        'generalToSin': {
          content: [
            'opp',
            'equals',
            'hyp',
            'times1',
            {
              topComment: {
                content: 'func',
                comment: 'sin',
                symbol: 'brace',
                inSize: false,
              },
            },
            { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 2.2,
          },
        },
        'sin': {
          content: [
            'opp',
            'equals',
            'hyp',
            'times1',
            'sin', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 2.2,
          },
        },
        '0': {
          content: ['opp', 'equals', 'func', { brac: ['lb', 'angle', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '0sine1': {
          content: [
            'vert',
            'equals',
            {
              topComment: {
                content: 'func',
                comment: 'sin',
                symbol: 'brace',
              },
            },
            {
              brac: ['lb', 'angle', 'rb'],
            },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '0sine2': {
          content: [
            'vert',
            'equals',
            'sin',
            {
              brac: ['lb', 'angle', 'rb'],
            },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '1': {
          content: [{
            topComment: {
              content: 'vert',
              comment: 'opp',
              symbol: 'brace',
            },
          }, 'equals', 'func', {
            brac: ['lb', {
              topComment: {
                content: 'angle',
                comment: 'theta',
                symbol: 'brace1',
                inSize: false,
              },
            }, 'rb'],
          },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2': {
          content: ['opp', 'equals', 'func', { brac: ['lb', 'theta', 'rb'] }],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2a0': {
          content: [
            {
              bottomComment: {
                content: 'opp', comment: 'hyp1', inSize: false, scale: 0.5,
              },
            },
            'equals',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2a': {
          content: [
            'r', 'times',
            {
              bottomComment: {
                content: 'opp', comment: 'hyp1', inSize: false, scale: 0.5,
              },
            },
            'equals',
            'r_1', 'times1',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2b': {
          content: [
            {
              topComment: {
                content: [
                  'r', 'times',
                  {
                    bottomComment: {
                      content: 'opp', comment: 'hyp1', inSize: false, scale: 0.5,
                    },
                  },
                ],
                comment: {
                  bottomComment: {
                    content: 'opp1', comment: 'hypr', inSize: true, scale: 0.7,
                  },
                },
                symbol: 'brace',
              },
            },
            'equals',
            'r_1', 'times1',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2c': {
          content: [
            {
              bottomComment: {
                content: 'opp1', comment: 'hypr', inSize: false, scale: 0.5,
              },
            },
            'equals',
            'r_1', 'times1',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2d': {
          content: [
            'opp1',
            'equals',
            'r_1', 'times1',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2e': {
          content: [
            'opp1',
            'equals',
            {
              bottomComment: {
                content: 'func', comment: 'hyp1_1', inSize: false, commentSpace: 0.07, scale: 0.5,
              },
            },
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2f': {
          content: [
            'opp1',
            'equals',
            'sine',
            { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2b2': {
          content: [
            { bottomComment: { content: 'opp', comment: 'hypr', inSize: false } },
            'equals',
            'r_1', 'times1',
            'func', { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '2c2': {
          content: [
            'opp',
            'equals',
            'r_1', 'times1',
            'func', { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'equals',
            alignH: 'right',
          },
        },
        '0b': {
          content: ['opp', 'equals', 'func', { brac: ['lb', 'theta', 'rb'] }],
          alignment: {
            fixTo: 'opp',
            alignH: 'right',
          },
        },
        '0a': {
          content: [
            'opp', 'equals', 'sine', { brac: ['lb', 'theta', 'rb'] },
          ],
          alignment: {
            fixTo: 'opp',
            alignH: 'right',
          },
        },
        // '0b': {
        //   content: [
        //     'opp', 'equals', 'sine', { brac: ['theta', 'lb', 'rb'] },
        //     'equals1', 'sin1', { brac: ['theta1', 'lb1', 'rb1'] },
        //   ],
        //   alignment: {
        //     fixTo: 'opp',
        //     alignH: 'right',
        //   },
        // },
        '0c': {
          content: [
            'opp', 'equals', 'sine', { brac: ['lb', 'theta', 'rb'] },
            'equals1', 'sin1', ' ' , 'theta1',
          ],
          alignment: {
            fixTo: 'opp',
            alignH: 'right',
          },
        },
        '0d': {
          content: [
            'opp', 'equals', 'sine', { brac: ['lb', 'theta', 'rb'] },
            'equals1', 'sin1', { brac: ['lb1', 'theta1', 'rb1'] },
            'equals2', 'sin2', ' ', 'theta2',
          ],
          alignment: {
            fixTo: 'opp',
            alignH: 'right',
          },
        },
        '5': {
          content: [
            'opp', 'approx', {
              frac: [
                ['16', 'theta', { brac: ['lb', ['pi1', 'minus1', 'theta1'], 'rb'] }],
                'v',
                ['5', { sup: ['pi2', '2'] }, 'minus2', '4', 'theta3', {
                  brac: ['lb1', ['pi3', 'minus3', 'theta4'], 'rb1'],
                }],
              ],
            },
          ],
          alignment: {
            alignH: 0.8,
          },
        },
        '6': {
          content: [
            'opp', 'equals', 'theta', 'minus1',
            { frac: [{ sup: ['theta1', '2', 0.6, 0.02] }, 'v', '3f'] },
            'plus1',
            { frac: [{ sup: ['theta2', '3', 0.6, 0.02] }, 'v1', '5f'] },
            'minus2',
            { frac: [{ sup: ['theta3', '7', 0.6, 0.02] }, 'v2', '7f'] },
            'plus2', 'dots',
          ],
          alignment: {
            alignH: 0.4,
          },
        },
      },
    },
    mods: {
      scenarios: {
        left: { position: [-1.5, -1.6] },
        // left: { position: [-1.3, -1.6] },
        default: { position: [-0.3, -1.6] },
      },
      pulseDefault: { scale: 1.4 },
    },
  };

  const cell = (name, text, x, y, color) => ({
    name,
    method: 'text',
    options: {
      text,
      hAlign: 'center',
      vAlign: 'baseline',
      color,
      position: [x, y],
      size: 0.15,
      style: 'normal',
    },
  });

  const sineCell = (name, a, x, y) => ({
    name,
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.7,
      elements: {
        value: { text: `${round(Math.sin(a * Math.PI / 180), 3)}`, color: colors.components },
        r: { color: colors.lines },
        times: { text: ' \u00D7 ', color: colors.lines },
      },
      defaultFormAlignment: {
        fixTo: 'value',
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        'base': ['value'],
        'baseTimesR': ['value', 'times', 'r'],
        'baseR': a === 0 ? ['value'] : ['value', ' ', 'r'],
      },
      position: [x, y],
    },
  });

  const angleHeading = (x, y) => ({
    name: 'angleHeading',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        angle: { color: colors.angles },
        brace: {
          symbol: 'brace', width: 0.05, lineWidth: 0.012, side: 'top', color: colors.working,
        },
        theta: { text: '\u03B8', color: colors.angles },
      },
      defaultFormAlignment: {
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        angle: 'angle',
        angleToTheta: {
          topComment: {
            content: 'angle',
            comment: 'theta',
            symbol: 'brace',
          },
        },
        theta: 'theta',
      },
      position: [x, y],
    },
  });

  const sineHeading = (x, y) => ({
    name: 'sineHeading',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        opp: { text: 'opposite', color: colors.components },
        hyp1: { text: 'hypotenuse = 1', color: colors.components },
        hypR: { text: 'hypotenuse = r', color: colors.components },
        brace: {
          symbol: 'brace', width: 0.05, lineWidth: 0.012, side: 'top', color: colors.working,
        },
        func: { text: 'function' },
        theta: { text: '\u03B8', color: colors.angles },
        angle: { color: colors.angles },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        sin: { style: 'normal' },
      },
      defaultFormAlignment: {
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        opp: 'opp',
        oppHyp1: {
          content: {
            bottomComment: {
              content: 'opp',
              comment: 'hyp1',
              scale: 0.5,
            },
          },
          alignment: {
            alignV: 0.1,
          },
        },
        oppHypR: {
          content: {
            bottomComment: {
              content: 'opp',
              comment: 'hypR',
              scale: 0.5,
            },
          },
          alignment: {
            alignV: 0.1,
          },
        },
        oppHyp1ToFunc: {
          content: {
            topComment: {
              content: {
                bottomComment: {
                  content: 'opp',
                  comment: 'hyp1',
                  scale: 0.5,
                },
              },
              comment: ['func', { brac: ['lb', 'angle', 'rb'] }],
              symbol: 'brace',
              inSize: false,
            },
          },
          alignment: {
            alignV: 0.1,
          },
        },
        oppToFunc: {
          content: {
            topComment: {
              content: 'opp',
              comment: ['func', { brac: ['lb', 'angle', 'rb'] }],
              symbol: 'brace',
              inSize: false,
            },
          },
          // alignment: {
          //   alignV: 0.1,
          // },
        },
        func: {
          content: ['func', { brac: ['lb', 'angle', 'rb'] }],
          scale: 0.9,
        },
        funcToSin: {
          content: [
            {
              topComment: {
                content: 'func',
                comment: 'sin',
                symbol: 'brace',
                inSize: false,
              },
            },
            { brac: ['lb', 'angle', 'rb'] }],
          scale: 0.9,
        },
        sin: {
          content: ['sin', { brac: ['lb', 'angle', 'rb'] }],
          scale: 0.9,
        },
      },
      position: [x, y],
    },
  });

  const box = name => ({
    name,
    method: 'box',
    options: {
      lineWidth: 0.01,
      color: colors.angles,
    },
    mods: {
      pulseDefault: { scale: 1.2 },
    },
  });

  const createTableElements = (angles) => {
    const elements = [];
    const x = 1;
    const y = 0.16;
    elements.push(angleHeading(0, 0.25));
    elements.push(sineHeading(x, 0.25));
    elements.push({
      name: 'line',
      method: 'line',
      options: {
        p1: [-0.3, 0.16],
        p2: [x + 0.6, 0.16],
        lineWidth: 0.01,
        color: colors.diagram.text.base,
      },
    });
    angles.forEach((a, index) => {
      if (typeof a === 'number') {
        elements.push(cell(`${index}`, `${a}º`, 0, 0 - index * y, colors.angles));
        elements.push(sineCell(`eqn_${index}`, a, x, 0 - index * y));
      } else {
        elements.push(cell(`${index}`, '\u22EE', 0, 0 - index * y, colors.angles));
        elements.push(cell(`${index}_1`, '\u22EE', x, 0 - index * y, colors.components));
      }
    });
    return elements;
  };
  const table = {
    name: 'table',
    method: 'collection',
    addElements: [
      // cell('0', '0º', 0),
      // cell('1', '1º', -0.15),
      // cell('2', '2º', -0.3),
      // cell('d1', '\u22EE', -0.45),
      // cell('43', '43º', -0.6),
      ...createTableElements([0, 1, 2, 'd', 39, 40, 41, 'd', 59, 60, 61, 'd', 90]),
    ],
    options: {
      position: [1, 0.5],
    },
    mods: {
      pulseDefault: { scale: 1.15 },
    },
  };

  layout.addElements = [
    fig,
    // triangle,
    eqn,
    table,
    box('box1'),
    box('box2'),
  ];
  return layout;
}
