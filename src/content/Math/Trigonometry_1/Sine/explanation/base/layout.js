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
  colors.working = colors.get('grey', 'light').rgb;

  const points = [
    new Point(0, 0),
    new Point(2.7, 0),
    new Point(2.7, 1.6),
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
          name: 'line',
          method: 'polyLine',
          options: {
            points,
            color: colors.lines,
            width: 0.02,
            close: true,
          },
        },
        {
          name: 'theta',
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
      // options: {
      //   position: [-1.5, -0.8],
      // },
      mods: {
        scenarios: {
          default: { position: [-1.5, -1] },
          right: { position: [-0.6, -1] },
        },
      },
    },
    {
      name: 'eqnCos',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.8,
        elements: {
          hyp: { text: 'hypotenuse', color: colors.lines },
          adj: { text: 'adjacent', color: colors.lines },
          equals: ' = ',
          const: 'constant',
          v: { symbol: 'vinculum', color: colors.lines },
        },
        defaultFormAlignment: {
          fixTo: 'equals',
        },
        forms: {
          '0': [
            { frac: ['adj', 'v', 'hyp'] },
            'equals', 'const',
          ],
        },
        position: [-1.8, -0.4],
      },
    },
    {
      name: 'eqnTan',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.8,
        elements: {
          // hyp: { text: 'hypotenuse', color: colors.lines },
          equals: ' = ',
          adj: { text: 'adjacent', color: colors.lines },
          opp: { text: 'opposite', color: colors.lines },
          const: 'constant',
          v: { symbol: 'vinculum', color: colors.lines },
        },
        defaultFormAlignment: {
          fixTo: 'equals',
        },
        forms: {
          '0': [
            { frac: ['opp', 'v', 'adj'] },
            'equals', 'const',
          ],
        },
        position: [-1.8, -1.1],
      },
    },
    {
      name: 'eqnSin',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.8,
        elements: {
          hyp: { text: 'hypotenuse', color: colors.lines },
          equals: ' = ',
          // adj: { text: 'adjacent', color: colors.lines },
          opp: { text: 'opposite', color: colors.lines },
          const: 'constant',
          v: { symbol: 'vinculum', color: colors.lines },
        },
        defaultFormAlignment: {
          fixTo: 'equals',
        },
        forms: {
          '0': [
            { frac: ['opp', 'v', 'hyp'] },
            'equals', 'const',
          ],
        },
        position: [-1.8, 0.3],
      },
    },
    {
      name: 'eqn',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.9,
        elements: {
          v_11: { symbol: 'vinculum' },
          v_12: { symbol: 'vinculum' },
          v_21: { symbol: 'vinculum', color: colors.working },
          v_31: { symbol: 'vinculum', color: colors.working },
          v_32: { symbol: 'vinculum', color: colors.working },
          v_41: { symbol: 'vinculum', color: colors.working },
          equals: '  =  ',
          equals2: { text: '  =  ', color: colors.working },
          equals3: { text: '  =  ', color: colors.working },
          A_11: { color: colors.lines },
          A_12: { color: colors.lines },
          A_21: { color: colors.working },
          A_31: { color: colors.working },
          A_41: { color: colors.working },
          B_11: { color: colors.lines },
          B_12: { color: colors.lines },
          B_21: { color: colors.working },
          B_31: { color: colors.working },
          B_41: { color: colors.working },
          C_11: { color: colors.lines },
          C_12: { color: colors.lines },
          C_21: { color: colors.working },
          C_31: { color: colors.working },
          C_41: { color: colors.working },
          times_11: { text: ' \u00D7 ', color: colors.lines },
          times_12: { text: ' \u00D7 ', color: colors.lines },
          times_21: { text: ' \u00D7 ', color: colors.working },
          times_22: { text: ' \u00D7 ', color: colors.working },
          times_31: { text: ' \u00D7 ', color: colors.working },
          times_41: { text: ' \u00D7 ', color: colors.working },
          s_11: { color: colors.components },
          s_12: { color: colors.components },
          s_21: { color: colors.working },
          s_22: { color: colors.working },
          s_31: { color: colors.working },
          s_32: { color: colors.working },
        },
        defaultFormAlignment: {
          fixTo: 'equals',    // Points can also be defined as objects
          alignH: 'left',
          alignV: 'baseline',
        },
        forms: {
          // sine: [
          //   // 'sin', { brac: ['lb', 'theta', 'rb'] },
          //   'sin', ' ', 'theta',
          //   'equals',
          //   { frac: ['opposite', 'v1', 'hypotenuse'] },
          // ],
          BonA: [
            { frac: [['s_11', 'times_11', 'B_11'], 'v_11', ['s_12', 'times_12', 'A_11']] },
            'equals',
            { frac: ['B_12', 'v_12', 'A_12'] },
          ],
          ConA: [
            { frac: [['s_11', 'times_11', 'C_11'], 'v_11', ['s_12', 'times_12', 'A_11']] },
            'equals',
            { frac: ['C_12', 'v_12', 'A_12'] },
          ],
          AonB: [
            { frac: [['s_11', 'times_11', 'A_11'], 'v_11', ['s_12', 'times_12', 'B_11']] },
            'equals',
            { frac: ['A_12', 'v_12', 'B_12'] },
          ],
          ConB: [
            { frac: [['s_11', 'times_11', 'C_11'], 'v_11', ['s_12', 'times_12', 'B_11']] },
            'equals',
            { frac: ['C_12', 'v_12', 'B_12'] },
          ],
          AonC: [
            { frac: [['s_11', 'times_11', 'A_11'], 'v_11', ['s_12', 'times_12', 'C_11']] },
            'equals',
            { frac: ['A_12', 'v_12', 'C_12'] },
          ],
          BonC: [
            { frac: [['s_11', 'times_11', 'B_11'], 'v_11', ['s_12', 'times_12', 'C_11']] },
            'equals',
            { frac: ['B_12', 'v_12', 'C_12'] },
          ],
        },
        position: [-0.2, -1.7],
      },
    },
  ];
  return layout;
}
