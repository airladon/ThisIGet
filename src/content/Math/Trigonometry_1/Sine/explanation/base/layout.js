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
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
const { round } = Fig.tools.math;

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
    new Point(2.3, 0),
    new Point(2.3, 1.6),
  ];
  layout.points = points;
  layout.triLen = new Line(points[0], points[2]).length();
  const historyRadius = 1;
  layout.historyRadius = historyRadius;
  const historyAngle = Math.atan2(points[2].y, points[2].x) * 1.2;
  layout.historyAngle = historyAngle;
  const historyPoints = [
    new Point(0, 0),
    new Point(historyRadius * Math.cos(historyAngle), 0),
    new Point(historyRadius * Math.cos(historyAngle), historyRadius * Math.sin(historyAngle)),
  ];
  layout.historyPoints = historyPoints;

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
      name: 'rotator',
      method: 'collection',
      addElements: [
        {
          name: 'line',
          method: 'line',
          options: {
            p1: points[0],
            p2: points[2],
            color: [1, 0, 0, 0.0001],
            width: 0.1,
          },
          mods: {
            move: {
              canBeMovedAfterLosingTouch: true,
            },
          },
        },
        {
          name: 'pad',
          method: 'polygon',
          options: {
            sides: 10,
            color: [1, 0, 0, 0.0001],
            radius: 0.3,
            fill: true,
            position: points[2],
          },
          mods: {
            move: {
              canBeMovedAfterLosingTouch: true,
            },
          },
        },
      ],
      options: {
        position: [-0.6, -1.3],
      },
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
          right: { position: [-0.6, -1.3] },
        },
      },
    },
    {
      name: 'history',
      method: 'collection',
      addElements: [
        {
          name: 'circle',
          method: 'polygon',
          options: {
            sides: 100,
            width: 0.015,
            radius: 1,
            color: colors.angles,
          },
        },
        {
          name: 'arc',
          method: 'polygon',
          options: {
            radius: historyRadius,
            width: 0.015,
            rotation: -historyAngle,
            angleToDraw: historyAngle * 2,
            sides: 200,
            color: colors.angles,
          },
        },
        {
          name: 'axis',
          method: 'line',
          options: {
            p1: historyPoints[0],
            p2: [historyRadius, 0],
            width: 0.015,
            color: colors.lines,
          },
        },
        {
          name: 'tri',
          method: 'collection',
          addElements: [
            {
              name: 'right',
              method: 'angle',
              options: {
                p1: historyPoints[2],
                p2: historyPoints[1],
                p3: historyPoints[0],
                curve: {
                  radius: 0.15,
                  sides: 20,
                  width: 0.01,
                },
                color: colors.angles,
                autoRightAngle: true,
              },
            },
            {
              name: 'line',
              method: 'polyLine',
              options: {
                points: [
                  historyPoints[0],
                  historyPoints[1],
                  historyPoints[2].sub(0, 0.015),
                ],
                color: colors.lines,
                width: 0.015,
                close: true,
              },
            },
          ],
        },
        {
          name: 'sin',
          method: 'line',
          options: {
            p1: historyPoints[1],
            p2: historyPoints[2],
            width: 0.015,
            color: colors.lines,
          },
        },
        {
          name: 'bowString',
          method: 'line',
          options: {
            p1: historyPoints[2],
            p2: new Point(historyPoints[2].x, -historyPoints[2].y),
            width: 0.015,
            color: colors.lines,
          },
        },
        {
          name: 'mirrorString',
          method: 'line',
          options: {
            p1: historyPoints[0],
            p2: new Point(historyPoints[2].x, -historyPoints[2].y),
            width: 0.015,
            color: colors.lines,
          },
        },
      ],
      options: {
        position: [0, -0.5],
      },
    },
    {
      name: 'eqnSame',
      method: 'addEquation',
      options: {
        color: colors.diagram.text.base,
        scale: 0.8,
        elements: {
          hyp: { text: 'hypotenuse', color: colors.lines },
          adj: { text: 'adjacent', color: colors.lines },
          opp: { text: 'opposite', color: colors.lines },
          v: { symbol: 'vinculum' },
          equals: '  =  ',
          const: 'is same for all right angle triangles with angle ',
          theta: { text: '\u03b8', color: colors.angles },
          value: '1',
          lb: { symbol: 'bracket', side: 'left' },
          rb: { symbol: 'bracket', side: 'right' },
          func: { text: 'function', style: 'normal' },
          sin: { text: 'sin', style: 'normal' },
          times: { text: ' \u00D7 ', color: colors.lines },
        },
        defaultFormAlignment: {
          fixTo: 'v',
        },
        forms: {
          'oppOnHyp': {
            content: [{ frac: ['opp', 'v','hyp'] }, '   ', 'const', 'theta'],
            alignment: { fixTo: 'const' },
          },
          'adjOnHyp': {
            content: [{ frac: ['adj', 'v','hyp'] }, '   ', 'const', 'theta'],
            alignment: { fixTo: 'const' },
          },
          'oppOnAdj': {
            content: [{ frac: ['opp', 'v','adj'] }, '   ', 'const', 'theta'],
            alignment: { fixTo: 'const' },
          },
          'ratioValue': {
            content: [{ frac: ['opp', 'v','hyp'] }, 'equals', 'value'],
            alignment: { fixTo: 'equals' },
          },
          'function': {
            content: [
              { frac: ['opp', 'v','hyp'] },
              'equals', 'func', { brac: ['lb', 'theta', 'rb'] },
            ],
            alignment: { fixTo: 'equals' },
          },
          'sin': {
            content: [
              { frac: ['opp', 'v','hyp'] },
              'equals', 'sin', { brac: ['lb', 'theta', 'rb'] },
            ],
            alignment: { fixTo: 'equals' },
          },
          'opp': {
            content: [
              'opp',
              'equals', 'sin', { brac: ['lb', 'theta', 'rb'] }, 'times', 'hyp',
            ],
            alignment: { fixTo: 'equals' },
            translation: {
              'opp': ['curved', 'up', 0.45],
              'hyp': ['curved', 'down', 0.45],
            },
          },
          'hyp': {
            content: [
              'hyp',
              'equals', { frac: ['opp', 'v', ['sin', { brac: ['lb', 'theta', 'rb'] }]] },
            ],
            alignment: { fixTo: 'equals' },
            translation: {
              'opp': ['curved', 'up', 0.45],
              'hyp': ['curved', 'down', 0.45],
            },
          },
        },
      },
      mods: {
        scenarios: {
          default: { position: [-1.2, -1.7] },
          left: { position: [-1.7, -0.5] },
        },
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
        value: { text: `${round(Math.sin(a * Math.PI / 180), 4)}`, color: colors.components },
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
    method: 'text',
    options: {
      text: '\u03B8',
      hAlign: 'center',
      vAlign: 'baseline',
      color: colors.angles,
      position: [x, y],
      size: 0.2 * 0.9,
      style: 'italic',
    },
  });

  const sineHeading = (x, y) => ({
    name: 'sineHeading',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        theta: { text: '\u03B8', color: colors.angles },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        sin: { style: 'normal' },
      },
      defaultFormAlignment: {
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        sin: {
          content: ['sin', { brac: ['lb', 'theta', 'rb'] }],
          scale: 0.9,
        },
      },
      position: [x, y],
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
      // ...createTableElements([0, 1, 2, 'd', 39, 40, 41, 'd', 59, 60, 61, 'd', 
      ...createTableElements([0, 1, 2, 3, 4, 5, 6, 7, 8, 'd', 87, 88, 89, 90]),
    ],
    options: {
      position: [1, 0.5],
    },
    mods: {
      pulseDefault: { scale: 1.15 },
      scenarios: {
        default: { position: [-0.5, 0.5] },
      },
    },
  };

  layout.addElements.push(table);

  const frac = (num, v, dem) => ({
    frac: [num, v, dem],
  });

  const sup = (num, pow) => ({
    sup: {
      content: num,
      superscript: pow,
      scale: 0.7,
    },
  });

  const powerSeries = {
    name: 'powerSeries',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.8,
      elements: {
        sin: { style: 'normal' },
        a_0: { text: '\u03B8', color: colors.angles },
        a_1: { text: '\u03B8', color: colors.angles },
        a_3: { text: '\u03B8', color: colors.angles },
        a_5: { text: '\u03B8', color: colors.angles },
        a_7: { text: '\u03B8', color: colors.angles },
        equals: '  =  ',
        v_3: { symbol: 'vinculum' },
        v_5: { symbol: 'vinculum' },
        v_7: { symbol: 'vinculum' },
        m_1: '  –  ',
        m_2: '  –  ',
        p_1: '  +  ',
        dots: ' + ...',
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
      },
      forms: {
        base: {
          content: [
            'sin',
            { brac: ['lb', 'a_0', 'rb'] },
            'equals', 'a_1', 'm_1',
            frac(sup('a_3', '3_a'), 'v_3', '3\u00D72\u00D71'),
            'p_1',
            frac(sup('a_5', '5_a'), 'v_5', '5\u00D74\u00D73\u00D72\u00D71'),
            'm_2',
            frac(sup('a_7', '7_a'), 'v_7', '7\u00D76\u00D75\u00D74\u00D73\u00D72\u00D71'),
            'dots',
          ],
          alignment: {
            alignH: 'center',
          },
        },
      },
    },
    mods: {
      scenarios: {
        default: { position: [0, -0.5] },
      },
      pulseDefault: { scale: 1.1 },
    },
  };

  layout.addElements.push(powerSeries);

  return layout;
}
