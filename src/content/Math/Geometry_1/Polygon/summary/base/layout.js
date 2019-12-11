// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.split = colors.get('green', 'dark').rgb;
  const width = 0.03;

  const regularPolyPoints = (num, r, angleOffset = 0) => {
    const polyPoints = [];
    for (let i = 0; i < num; i += 1) {
      const angle = Math.PI * 2 / num * i + Math.PI / 2 - Math.PI * 2 / num + Math.PI + angleOffset;
      polyPoints.push([r * Math.cos(-angle), r * Math.sin(-angle)]);
    }
    return polyPoints;
  };

  const pointsP = [
    [-1, -0.2],
    [-0.8, 0.8],
    [-0.4, 0.2],
    [0.6, 0.9],
    [1, -0.5],
    [0.3, -0.2],
    [-0.2, -0.7],
  ];

  const pointsP1 = [
    [-0.8, 0.8],
    [0.6, 0.9],
    [-0.2, -0.7],
  ];

  const pointsP2 = [
    [-1, -0.2],
    [-0.8, 0.8],
    [0.6, 0.9],
    [1, -0.5],
  ];

  // eslint-disable-next-line max-len
  const poly = (name, points, pos = [0, 0], scale = 1) => {
    const t = new Transform().scale(scale, scale);
    const pointsToUse = points.map(p => (new Point(p[0], p[1])).transformBy(t.matrix()));

    const outObj = {
      name,
      method: 'polyLine',
      options: {
        points: pointsToUse,
        width,
        color: colors.sides,
        close: true,
      },
      mods: {
        scenarios: {
          default: { position: pos, scale },
          center: { position: [0, 0], scale: 1 },
        },
        pulseDefault: { scale: 1.4 },
      },
    };
    return outObj;
  };

  const eqnTot = {
    name: 'eqnTot',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        equals: '  =  ',
        tot1: { text: 'total angle', color: colors.angles },
        angle: { text: 'angle', color: colors.angles },
        _360: '360º',
        _180: '180º',
        n: { text: 'n', color: colors.sides },
        _2: '2',
        minus: '  -  ',
        lb: {
          symbol: 'bracketNew', side: 'left', numLines: 1,
        },
        rb: {
          symbol: 'bracketNew', side: 'right', numLines: 1,
        },
        v: { symbol: 'vinculum' },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'center',
        alignV: 'baseline',
      },
      forms: {
        '0': ['tot1', 'equals', {
          bracNew: [['n', 'minus', '_2'], 'lb', 'rb'],
        }, 'times', '_180'],
        '1': [
          'angle', 'equals', '_180', 'minus', { frac: ['_360', 'n', 'v'] },
        ],
      },
    },
    mods: {
      scenarios: {
        default: { position: [-0.2, 0.9] },
      },
    },
  };


  const txt = (name, text, position, color = colors.diagram.text.base) => ({
    name,
    method: 'text',
    options: {
      position,
      text,
      color,
      hAlign: 'left',
    },
  });

  const getName = (n) => {
    if (n === 3) {
      return 'Triangle';
    }
    if (n === 4) {
      return 'Quadrangle';
    }
    if (n === 5) {
      return 'Pentagon';
    }
    if (n === 6) {
      return 'Hexagon';
    }
    if (n === 7) {
      return 'Heptagon';
    }
    if (n === 8) {
      return 'Octagon';
    }
    if (n === 9) {
      return 'Nonagon';
    }
    return 'Decagon';
  };

  const regularPoly = (name, sides, angleOffset = 0, yOffset = 0) => {
    const points = regularPolyPoints(sides, 0.8, angleOffset);
    const collection = {
      name,
      method: 'collection',
      addElements: [
        {
          name: 'poly',
          method: 'polyLine',
          options: {
            width: 0.03,
            close: true,
            color: colors.sides,
            points,
          },
          mods: {
            scenarios: {
              default: { position: [0, yOffset] },
            },
          },
        },
        txt('sidesLabel', 'Sides:', [1.2, 0.5]),
        txt('sides', `${sides}`, [2.5, 0.5], colors.sides),
        txt('nameLabel', 'Name:', [1.2, 0.2]),
        txt('name', getName(sides), [2.5, 0.2], colors.sides),
        txt('angleLabel', 'Angle:', [1.2, -0.1]),
        txt('angle', `${round(180 - 360 / sides, 2)}º`, [2.5, -0.1], colors.angles),
        txt('totAngleLabel', 'Total Angle:', [1.2, -0.4]),
        txt('tot', `${((sides - 2) * 180).toFixed(0)}º`, [2.5, -0.4], colors.angles),
      ],
      mods: {
        scenarios: {
          default: { position: [-1, -0.9] },
        },
      },
    };
    return collection;
  };

  layout.addElements = [
    poly('poly0', pointsP, [1.7, -0.5], 0.9),
    poly('poly1', pointsP1, [-2, -0.5], 0.9),
    poly('poly2', pointsP2, [-0.2, -0.5], 0.9),
    regularPoly('p3', 3, 0, -0.3),
    regularPoly('p4', 4, Math.PI / 4),
    regularPoly('p5', 5),
    regularPoly('p6', 6),
    regularPoly('p7', 7),
    regularPoly('p8', 8),
    regularPoly('p9', 9),
    regularPoly('p10', 10),
    eqnTot,
  ];
  return layout;
}
