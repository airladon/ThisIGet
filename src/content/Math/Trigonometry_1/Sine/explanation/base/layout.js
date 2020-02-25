// @flow
// import commonLayout from '../../explanation/base/layout';

// export default function diagramLayout() {
//   const layout: Object = commonLayout();

//   return layout;
// }
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
  colors.lines = colors.get('blue').rgb;
  colors.components = colors.get('green').rgb;
  colors.angles = colors.get('red').rgb;
  colors.axes = colors.get('grey', 'dark').rgb;
  colors.get('red').toCssVar('--color-angles');
  colors.get('green').toCssVar('--color-components');
  colors.get('blue').toCssVar('--color-lines');
  colors.working = colors.get('grey', 'dark').rgb;

  const points = [
    new Point(0, 0),
    new Point(3, 0),
    new Point(3, 1.5),
  ];

  const simX2 = 1;
  const simX3 = 1.3;
  const simY2 = 1.3;
  const simPoints1 = [
    new Point(0, 0),
    new Point(simX2, simY2),
    new Point(simX3, 0),
  ];
  const simScale = 1.4;
  const simPoints2 = [
    new Point(0, 0),
    new Point(simX2 * simScale, simY2 * simScale),
    new Point(simX3 * simScale, 0),
  ];

  const simAngle = label => ({
    color: colors.angles,
    curve: {
      radius: 0.3,
      width: 0.02,
      sides: 200,
    },
    label: {
      text: label,
      radius: 0.3,
      scale: 0.9,
    },
  });
  const simSide = label => ({
    label: {
      text: label,
      scale: 0.9,
      // offset: 0.2,
      offset: 0.1,
      location: 'outside',
    },
  });
  const scaleEqn = label => ({
    elements: {
      value: { text: label, color: colors.lines },
      times: { text: ' \u00D7 ', color: colors.lines },
      s: { color: colors.components, mods: { pulseDefault: { scale: 3 } } },
    },
    forms: {
      '0': {
        content: ['s', 'times', 'value'],
        // content: {
        //   container: {
        //     content: ['s', 'value'],
        //     width: 0.2,
        //     ascent: 0.13,
        //     descent: 0.05,
        //     xAlign: 'left',
        //   },
        // },
        scale: 0.9,
        alignment: { alignH: 'center', alignV: 'middle' },
      },
    },
  });

  layout.addElements = [
    {
      name: 'similar',
      method: 'collection',
      addElements: [
        {
          name: 'tri1',
          method: 'polyLine',
          options: {
            points: simPoints1,
            color: colors.lines,
            width: 0.02,
            close: true,
            angle: [
              simAngle('a'),
              simAngle('b'),
              simAngle('c'),
            ],
            side: [
              simSide('C'),
              simSide('A'),
              simSide('B'),
            ],
          },
          mods: {
            scenarios: {
              default: { position: [-2, -0.7] },
            },
            pulseDefault: { scale: 1.2 },
          },
        },
        {
          name: 'tri2',
          method: 'polyLine',
          options: {
            points: simPoints2,
            color: colors.lines,
            width: 0.02,
            close: true,
            angle: [
              simAngle('a'),
              simAngle('b'),
              simAngle('c'),
            ],
            side: [
              simSide(scaleEqn('C')),
              simSide(scaleEqn('A')),
              simSide(scaleEqn('B')),
            ],
          },
          mods: {
            scenarios: {
              default: { position: [0, -1] },
            },
            pulseDefault: { scale: 1.2 },
          },
        },
      ],
    },
    {
      name: 'tri',
      method: 'collection',
      addElements: [
        {
          name: 'tri',
          method: 'polyLine',
          options: {
            points,
            color: colors.lines,
            width: 0.02,
            close: true,
          },
        },
        {
          name: 'angle',
          method: 'angle',
          options: {
            p1: points[1],
            p2: points[0],
            p3: points[2],
            curve: {
              radius: 0.6,
              sides: 100,
            },
            color: colors.angles,
            label: {
              text: '\u03b8',
              scale: 0.9,
              radius: 0.6,
            },
          },
        },
        {
          name: 'complement',
          method: 'angle',
          options: {
            p1: points[0],
            p2: points[2],
            p3: points[1],
            curve: {
              radius: 0.6,
              sides: 100,
            },
            color: colors.angles,
            label: {
              text: '90º–\u03b8',
              scale: 0.9,
              radius: 0.6,
            },
          },
        },
        {
          name: 'right',
          method: 'angle',
          options: {
            p1: points[2],
            p2: points[1],
            p3: points[0],
            curve: {
              radius: 0.4,
              sides: 100,
            },
            color: colors.angles,
            autoRightAngle: true,
          },
        },
        {
          name: 'hyp',
          method: 'line',
          options: {
            p1: points[0],
            p2: points[2],
            showLine: false,
            label: {
              text: 'hypotenuse',
              offset: 0.2,
              location: 'top',
              scale: 0.9,
            },
            color: colors.lines,
          },
        },
        {
          name: 'opp',
          method: 'line',
          options: {
            p1: points[2],
            p2: points[1],
            showLine: false,
            label: {
              text: 'opposite',
              offset: 0.1,
              location: 'right',
              scale: 0.9,
            },
            color: colors.lines,
          },
        },
        {
          name: 'adj',
          method: 'line',
          options: {
            p1: points[0],
            p2: points[1],
            showLine: false,
            label: {
              text: 'adjacent',
              offset: 0.1,
              location: 'bottom',
              scale: 0.9,
            },
            color: colors.lines,
          },
        },
      ],
      options: {
        position: [-1.5, -0.8],
      },
    },
    {
      name: 'eqn',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.9,
        elements: {
          opposite: { color: colors.lines },
          hypotenuse: { color: colors.lines },
          adjacent: { color: colors.lines },
          angle: { color: colors.angles },
          theta: { text: '\u03b8', color: colors.angles },
          sin: { style: 'normal' },
          lb: { symbol: 'bracket', side: 'left' },
          rb: { symbol: 'bracket', side: 'right' },
          v1: { symbol: 'vinculum' },
          v2: { symbol: 'vinculum' },
          v3: { symbol: 'vinculum' },
          v4: { symbol: 'vinculum' },
          times: ' \u00D7 ',
          equals: '  =  ',
          equals2: '  =  ',
          A_1: { color: colors.lines },
          B_1: { color: colors.lines },
          A_2: { color: colors.lines },
          B_2: { color: colors.lines },
          A_3: { color: colors.lines },
          B_3: { color: colors.lines },
          times1: { text: ' \u00D7 ', color: colors.lines },
          times2: { text: ' \u00D7 ', color: colors.lines },
          times3: { text: ' \u00D7 ', color: colors.lines },
          s_1: { color: colors.components },
          s_2: { color: colors.components },
          s_3: { color: colors.components },
          s_4: { color: colors.components },
          brace: { symbol: 'brace', side: 'top', lineWidth: 0.01 },
          box: { symbol: 'box', lineWidth: 0.01, color: colors.working },
          strike: { symbol: 'strike', style: 'cross', color: colors.working },
        },
        defaultFormAlignment: {
          fixTo: 'equals',    // Points can also be defined as objects
          alignH: 'left',
          alignV: 'baseline',
        },
        forms: {
          sine: [
            // 'sin', { brac: ['lb', 'theta', 'rb'] },
            'sin', ' ', 'theta',
            'equals',
            { frac: ['opposite', 'v1', 'hypotenuse'] },
          ],
          AonB: [
            { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
            'equals',
            {
              sup: {
                content: {
                  strike: {
                    content: { frac: ['s_3', 'v2', 's_4'] },
                    symbol: 'strike',
                  },
                },
                superscript: '1',
                offset: [0.03, 0.07],
              },
            },
            'times3', { frac: ['A_2', 'v3', 'B_2'] },
            'equals2',
            { frac: ['A_3', 'v4', 'B_3'] },
          ],
          AonB1: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
            ],
            alignment: { fixTo: 'v1' },
          },
          AonB2: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
              'equals',
              { frac: ['s_3', 'v2', 's_4'] },
              'times3', { frac: ['A_2', 'v3', 'B_2'] },
            ],
            alignment: { fixTo: 'v1' },
          },
          AonB3: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
              'equals',
              {
                sup: {
                  content: {
                    strike: {
                      content: { frac: ['s_3', 'v2', 's_4'] },
                      symbol: 'strike',
                    },
                  },
                  superscript: '1',
                  offset: [0.03, 0.07],
                  inSize: false,
                },
              },
              'times3', { frac: ['A_2', 'v3', 'B_2'] },
            ],
            alignment: { fixTo: 'v1' },
          },
          AonB4: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
              'equals',
              '1',
              'times3', { frac: ['A_2', 'v3', 'B_2'] },
            ],
            alignment: { fixTo: 'v1' },
          },
          AonB5: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
              'equals',
              {
                strike: {
                  content: [ '1', 'times3'],
                  symbol: 'strike',
                },
              },
              { frac: ['A_2', 'v3', 'B_2'] },
            ],
            alignment: { fixTo: 'v1' },
          },
          AonB6: {
            content: [
              { frac: [['s_1', 'times1', 'A_1'], 'v1', ['s_2', 'times2', 'B_1']] },
              'equals',
              { frac: ['A_2', 'v3', 'B_2'] },
            ],
            alignment: { fixTo: 'v1' },
          },
        },
        position: [-0.7, -1.7],
      },
    },
  ];
  return layout;
}
