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

  const sineAngle = {
    box: {
      content: ['sin', { brac: ['lb', 'angle', 'rb'] }],
      symbol: 'sinContainer',
      space: 0.1,
    },
  };
  const opp = {
    box: {
      content: 'opposite',
      symbol: 'oppContainer',
      space: 0.1,
    },
  };
  const hyp = {
    box: {
      content: 'hypotenuse',
      symbol: 'hypContainer',
      space: 0.1,
    },
  };
  layout.addElements = [
    {
      name: 'tri',
      method: 'collection',
      addElements: [
        {
          name: 'tri',
          method: 'polyline',
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
              text: 'angle',
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
            color: colors.components,
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
          opposite: { color: colors.components },
          hypotenuse: { color: colors.lines },
          angle: { color: colors.angles },
          sin: { style: 'normal' },
          lb: { symbol: 'bracket', side: 'left' },
          rb: { symbol: 'bracket', side: 'right' },
          v: { symbol: 'vinculum' },
          times: ' \u00D7 ',
          equals: '  =  ',
          oppContainer: {
            symbol: 'box',
            fill: true,
            color: [1, 0, 0, 0.001],
            mods: { interactiveLocation: new Point(0.35, 0.17) },
          },
          hypContainer: {
            symbol: 'box',
            fill: true,
            color: [1, 0, 0, 0.001],
            mods: { interactiveLocation: new Point(0.45, 0.17) },
          },
          sinContainer: {
            symbol: 'box',
            fill: true,
            color: [1, 0, 0, 0.001],
            mods: { interactiveLocation: new Point(0.2, 0.21) },
          },
        },
        formDefaults: { alignment: {
          fixTo: 'equals',    // Points can also be defined as objects
          xAlign: 'center',
          yAlign: 'baseline',
        } },
        forms: {
          // opp: {
          //   content: [opp, 'equals', hyp, 'times', sineAngle],
          // },
          oppFromHyp: {
            content: [opp, 'equals', hyp, 'times', sineAngle],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.3],
              'oppContainer': ['curved', 'up', 0.3],
              'hypotenuse': ['curved', 'down', 0.45],
              'hypContainer': ['curved', 'down', 0.45],
              'sin': ['linear'],
              'lb': ['linear'],
              'rb': ['linear'],
              'sinContainer': ['linear'],
              'angle': ['linear'],
            } },
          },
          oppFromSine: {
            content: [opp, 'equals', hyp, 'times', sineAngle],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.45],
              'oppContainer': ['curved', 'up', 0.45],
              'hypotenuse': ['linear'],
              'hypContainer': ['linear'],
              'sin': ['curved', 'down', 0.3],
              'lb': ['curved', 'down', 0.3],
              'rb': ['curved', 'down', 0.3],
              'sinContainer': ['curved', 'down', 0.3],
              'angle': ['curved', 'down', 0.3],
            } },
          },
          // hyp: {
          //   content: [hyp, 'equals', { frac: [opp, 'v', sineAngle] }],
          // },
          hypFromOpp: {
            content: [hyp, 'equals', { frac: [opp, 'v', sineAngle] }],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.45],
              'oppContainer': ['curved', 'up', 0.45],
              'hypotenuse': ['curved', 'down', 0.45],
              'hypContainer': ['curved', 'down', 0.45],
              'sin': ['linear'],
              'lb': ['linear'],
              'rb': ['linear'],
              'sinContainer': ['linear'],
              'angle': ['linear'],
            } },
          },
          hypFromSine: {
            content: [hyp, 'equals', { frac: [opp, 'v', sineAngle] }],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.45],
              'oppContainer': ['curved', 'up', 0.45],
              'hypotenuse': ['curved', 'down', 0.45],
              'hypContainer': ['curved', 'down', 0.45],
              'sin': ['curved', 'down', 0.8],
              'lb': ['curved', 'down', 0.8],
              'rb': ['curved', 'down', 0.8],
              'sinContainer': ['curved', 'down', 0.8],
              'angle': ['curved', 'down', 0.8],
            } },
          },
          // sine: {
          //   content: [sineAngle, 'equals', { frac: [opp, 'v', hyp] }],
          //   translation: {
          //     'opposite': ['curved', 'up', 0.45],
          //     'oppContainer': ['curved', 'up', 0.45],
          //     'hypotenuse': ['curved', 'down', 0.45],
          //     'hypContainer': ['curved', 'down', 0.45],
          //     'sin': ['curved', 'down', 0.8],
          //     'lb': ['curved', 'down', 0.8],
          //     'rb': ['curved', 'down', 0.8],
          //     'sinContainer': ['curved', 'down', 0.8],
          //     'angle': ['curved', 'down', 0.8],
          //   },
          // },
          sineFromOpp: {
            content: [sineAngle, 'equals', { frac: [opp, 'v', hyp] }],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.45],
              'oppContainer': ['curved', 'up', 0.45],
              'hypotenuse': ['linear'],
              'hypContainer': ['linear'],
              'sin': ['curved', 'down', 0.3],
              'lb': ['curved', 'down', 0.3],
              'rb': ['curved', 'down', 0.3],
              'sinContainer': ['curved', 'down', 0.3],
              'angle': ['curved', 'down', 0.3],
            } },
          },
          sineFromHyp: {
            content: [sineAngle, 'equals', { frac: [opp, 'v', hyp] }],
            animation: { translation: {
              'opposite': ['curved', 'up', 0.45],
              'oppContainer': ['curved', 'up', 0.45],
              'hypotenuse': ['curved', 'down', 0.45],
              'hypContainer': ['curved', 'down', 0.45],
              'sin': ['curved', 'down', 0.8],
              'lb': ['curved', 'down', 0.8],
              'rb': ['curved', 'down', 0.8],
              'sinContainer': ['curved', 'down', 0.8],
              'angle': ['curved', 'down', 0.8],
            } },
          },
        },
        position: [0, -1.4],
      },
    },
  ];
  return layout;
}
