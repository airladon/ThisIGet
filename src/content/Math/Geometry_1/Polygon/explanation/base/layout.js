// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.angleFill = colors.get('red', 'darker').setOpacity(0.6).rgb;
  colors.tri = colors.get('green').rgb;
  colors.construction = colors.get('grey', 'dark').rgb;
  colors.working = colors.get('grey').rgb;
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
  const poly = (name, points, pos = [0, 0], scale = 1, sideLabel = null, angleLabel = undefined, widthIs: 'inside' | 'mid' = 'mid') => {
    const t = new Transform().scale(scale, scale);
    const pointsToUse = points.map(p => (new Point(p[0], p[1])).transformBy(t.matrix()));

    let outObj = {
      name,
      method: 'polyline',
      options: {
        points: pointsToUse,
        width,
        color: colors.sides,
        close: true,
        widthIs,
      },
      mods: {
        scenarios: {
          default: { position: pos, scale },
          center: { position: [0, 0], scale: 1 },
        },
        pulseDefault: { scale: 1.4 },
      },
    };

    if (sideLabel != null) {
      outObj = joinObjects({}, outObj, {
        options: {
          side: {
            label: {
              text: sideLabel,
              offset: 0.05,
              location: 'outside',
              scale: 0.8,
            },
          },
        },
      });
    }

    if (angleLabel !== undefined) {
      outObj = joinObjects({}, outObj, {
        options: {
          angle: {
            label: {
              text: angleLabel,
              scale: 0.7,
            },
            curve: {
              sides: 50,
              width: 0.01,
              radius: 0.2,
            },
            // direction: -1,
            // rotation: Math.PI / 3,
            color: colors.angles,
          },
        },
      });
    }
    return outObj;
  };

  // const pointsB3 = regularPolyPoints(3, 1.2);
  const r = 1.4;
  const a = Math.PI / 6;
  const pointsTot3 = [
    [0, r],
    [r * Math.cos(a), -r * Math.sin(a)],
    [-r * Math.cos(a), -r * Math.sin(a)],
  ];
  const newPoint4 = [1.8, 0];
  const newPoint5 = [1, 1.2];
  const newPoint6 = [0, 0];
  const pointsTot4 = [
    pointsTot3[0], newPoint4, ...pointsTot3.slice(1),
  ];
  const pointsTot5 = [
    pointsTot3[0], newPoint5, ...pointsTot4.slice(1),
  ];
  const pointsTot6 = [
    ...pointsTot5, newPoint6,
  ];

  const dashed = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      color: colors.tri,
      width: width / 2,
      dashStyle: { style: [0.05, 0.03] },
    },
  });

  const line = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      color: colors.sides,
      width,
    },
  });

  const dot = (name, position) => ({
    name,
    method: 'polygon',
    options: {
      fill: true,
      sides: 50,
      color: colors.sides,
      position,
      radius: 0.05,
    },
  });

  const angle = (name, text, p1, p2, p3, radius = 0.35) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      label: {
        text,
        radius,
        scale: 1,
      },
      curve: {
        radius,
        width: width / 2,
        sides: 50,
      },
      color: colors.angles,
    },
  });

  const angleFill = (name, p1, p2, p3, radius = 0.7, scale = 1) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        radius,
        width: radius,
        sides: 300,
      },
      color: colors.angleFill,
    },
    mods: {
      scenarios: { default: { scale: [1, scale] } },
    },
  });

  const tot = ({
    name: 'tot',
    method: 'collection',
    options: {
      color: colors.sides,
    },
    addElements: [
      angleFill('af', pointsTot6[3], pointsTot6[4], pointsTot6[0], 0.35),
      angleFill('bf', pointsTot6[1], pointsTot6[0], pointsTot6[4], 0.35, -1),
      angleFill('cf', pointsTot6[4], pointsTot6[5], pointsTot6[0], 0.2),
      dot('p4', newPoint4),
      dot('p5', newPoint5),
      dot('p6', newPoint6),
      dashed('l4', pointsTot3[0], pointsTot3[1]),
      dashed('l5', pointsTot4[0], pointsTot4[1]),
      dashed('l6', [pointsTot5[4][0] - 0.02, pointsTot5[4][1]], pointsTot5[0]),
      line('s41', pointsTot3[0], newPoint4),
      line('s42', pointsTot3[1], newPoint4),
      line('s51', pointsTot4[0], newPoint5),
      line('s52', pointsTot4[1], newPoint5),
      line('s61', pointsTot5[0], newPoint6),
      line('s62', pointsTot5[4], newPoint6),
      angle('a', 'a', newPoint6, pointsTot6[4], pointsTot6[0]),
      angle('b', 'b', pointsTot6[4], pointsTot6[0], pointsTot6[5]),
      angle('c', 'c', pointsTot6[0], pointsTot6[5], pointsTot6[4], 0.2),
      angle('e', '', pointsTot6[4], pointsTot6[5], pointsTot6[0]),
      poly('n3', pointsTot3),
      poly('n4', pointsTot4),
      poly('n5', pointsTot5),
      poly('n6', pointsTot6),
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.6] },
        low: { position: [0, -0.8] },
      },
    },
  });

  const newTot = { sub: ['tot1', 'New'] };
  const oldTot = { sub: ['tot2', 'Old'] };

  const eqnTot = {
    name: 'eqnTot',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        equals: '  =  ',
        equals1: '  =  ',
        // New: { color: colors.angles },
        // Old: { color: colors.angles },
        New: 'New',
        Old: 'Old',
        tot1: { text: 'total angle', color: colors.angles },
        tot2: { text: 'total angle', color: colors.angles },
        angle: { text: 'angle', color: colors.angles },
        a1: { text: 'a', color: colors.angles },
        a2: { text: 'a', color: colors.angles },
        b1: { text: 'b', color: colors.angles },
        b2: { text: 'b', color: colors.angles },
        c1: { text: 'c', color: colors.angles },
        c2: { text: 'c', color: colors.angles },
        _360: '360º',
        _3602: '360º',
        _180: '180º',
        _1802: '180º',
        n: { text: 'n', color: colors.sides },
        n2: { text: 'n', color: colors.sides },
        n3: { text: 'n', color: colors.sides },
        n4: { text: 'n', color: colors.sides },
        n5: { text: 'n', color: colors.sides },
        _2: '2',
        p1: '+',
        p2: ' + ',
        p3: ' + ',
        m1: '-',
        m2: '-',
        m3: '-',
        m4: '-',
        lb: {
          symbol: 'bracket', side: 'left',
        },
        rb: {
          symbol: 'bracket', side: 'right',
        },
        brace: {
          symbol: 'brace', side: 'top', color: colors.working,
        },
        box: {
          symbol: 'box', color: colors.angles, lineWidth: 0.008,
          // symbol: 'box', color: colors.angles, width: 0.08,
          // staticSize: [1, 0.2],
        },
        box2: {
          symbol: 'box', color: colors.angles, lineWidth: 0.01,
          // staticSize: [1, 0.2],
        },
        v: { symbol: 'vinculum' },
        v1: { symbol: 'vinculum' },
        v2: { symbol: 'vinculum' },
        times: ' \u00D7 ',
        root: {
          symbol: 'radical',
          color: colors.sides,
          startHeight: 0.5,
          startWidth: 0.7,
          maxStartHeight: 0.15,
          maxStartWidth: 0.15,
          lineWidth: 0.01,
          proportionalToHeight: true,
          // staticSize: [3, 1],
        },
        s1: { symbol: 'strike', style: 'cross', color: colors.working },
        s2: { symbol: 'strike', style: 'cross', color: colors.working },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'center',
        yAlign: 'baseline',
      },
      forms: {
        '0': [newTot, 'equals', oldTot, '   ', 'm1', '   ', 'a1', '   ', 'm2', '   ', 'b1', '   ', 'p1', '   ', '_360', '   ', 'm3', '   ', 'c1'],
        '1': {
          content: [
            newTot, 'equals', oldTot, '   ', 'm1', '   ', 'a1', '   ', 'm2', '   ', 'b1', '   ', 'm3', '   ', 'c1', '   ', 'p1', '   ', '_360',
          ],
          translation: {
            m3: ['curved', 'up', 1],
            c1: ['curved', 'up', 1],
          },
        },
        '2': [
          newTot, 'equals', oldTot, '   ',
          {
            topComment: {
              content: [
                'm1', '   ', 'a1', '   ', 'm2', '   ', 'b1', '   ', 'm3', '   ', 'c1'],
              comment: ['m4', ' ', '_180'],
              symbol: 'brace',
            },
          },
          '   ', 'p1', '   ', '_360',
        ],
        '3': [
          newTot, 'equals', oldTot, '   ',
          'm4', ' ', '_180',
          '   ', 'p1', '   ', '_360',
        ],
        '4': [
          newTot, 'equals', oldTot, '   ',
          {
            topComment: {
              content: ['m4', ' ', '_180', '   ', 'p1', '   ', '_360'],
              comment: ['p2', '_1802'],
              symbol: 'brace',
            },
          },
        ],
        '5': [
          newTot, 'equals', oldTot, '   ',
          'p2', '_1802',
        ],
        '6': {
          box: {
            content: ['tot1', 'equals', {
              brac: ['lb', ['n', ' ', 'm1',' ', '_2'], 'rb'],
            }, 'times', '_180'],
            symbol: 'box2',
            space: 0.2,
          },
        },
        '7': [
          'tot1', 'equals', {
            brac: ['lb', ['n', ' ', 'm1',' ', '_2'], 'rb'],
          }, 'times', '_180',
        ],
        '8': [
          'angle', 'equals', {
            frac: {
              numerator: [
                { brac: ['lb', ['n', ' ', 'm1',' ', '_2'], 'rb'] },
                'times', '_180',
              ],
              denominator: 'n2',
              symbol: 'v',
            },
          },
        ],
        '9': [
          'angle', 'equals', {
            frac: {
              numerator: {
                topComment: {
                  content: [
                    { brac: ['lb', ['n', ' ', 'm1',' ', '_2'], 'rb'] },
                    'times', '_180',
                  ],
                  comment: ['n3', '_1802', '  ', 'm2', '  ', '_3602'],
                  symbol: 'brace',
                },
              },
              denominator: 'n2',
              symbol: 'v',
            },
          },
        ],
        '10': [
          'angle', 'equals', {
            frac: {
              numerator: ['n3', '_1802', '  ', 'm2', '  ', '_3602'],
              denominator: 'n2',
              symbol: 'v',
            },
          },
        ],
        '11': [
          'angle', 'equals', {
            frac: {
              numerator: ['n3', '_1802', '  ', 'm2', '  ', '_3602'],
              denominator: 'n2',
              symbol: 'v',
            },
          }, 'equals1', {
            frac: {
              numerator: ['n', '_180'],
              denominator: 'n4',
              symbol: 'v1',
            },
          }, '  ', 'm1', '  ', {
            frac: {
              numerator: ['_360'],
              denominator: 'n5',
              symbol: 'v2',
            },
          },
        ],
        '12': [
          'angle', 'equals', {
            frac: {
              numerator: ['n', '_180'],
              denominator: 'n4',
              symbol: 'v1',
            },
          }, '  ', 'm1', '  ', {
            frac: {
              numerator: ['_360'],
              denominator: 'n5',
              symbol: 'v2',
            },
          },
        ],
        '13': [
          'angle', 'equals', {
            frac: {
              numerator: [{ strike: ['n', 's1'] }, '_180'],
              denominator: { strike: ['n4', 's2'] },
              symbol: 'v1',
            },
          }, '  ', 'm1', '  ', {
            frac: {
              numerator: ['_360'],
              denominator: 'n5',
              symbol: 'v2',
            },
          },
        ],
        '14': [
          'angle', 'equals', '_180', '  ', 'm1', '  ', { frac: ['_360', 'v2', 'n5'] },
          // {
          //   box: {
          //     content: '_1802',
          //     symbol: 'box',
          //     // space: -0.01,
          //     // inSize: true,
          //   },
          // }, '_3602',
        ],
      },
    },
    mods: {
      scenarios: {
        default: { position: [-0.7, 0.9] },
        bottom: { position: [-0.2, -0.9] },
        high: { position: [-0.2, 1] },
      },
    },
  };

  // const highlighter = {
  //   name: 'highlighter',
  //   method: 'rectangle',
  //   options: {
  //     length: 1,
  //     width: 1,
  //     fill: true,
  //     color: colors.angleFill,
  //   },
  // };
  const sPoints = regularPolyPoints(5, 1.2);
  const sLine = (name, p2) => ({
    name,
    method: 'line',
    options: {
      width: 0.01,
      color: colors.split,
      p1: [0, 0],
      p2,
      dashStyle: {
        style: [0.05, 0.03],
      },
      // label: {
      //   text: 'r',
      //   offset: 0.01,
      // },
    },
  });
  const sAng = (name, p1index, p3index) => ({
    name,
    method: 'angle',
    options: {
      p1: sPoints[p1index],
      p2: [0, 0],
      p3: sPoints[p3index],
      curve: {
        sides: 50,
        radius: 0.2,
        width: 0.01,
      },
      label: {
        text: null,
      },
      color: colors.angles,
    },
  });
  const iAng = (name, p1index, p2index, p3index) => ({
    name,
    method: 'angle',
    options: {
      p1: sPoints[p1index],
      p2: sPoints[p2index],
      p3: sPoints[p3index],
      curve: {
        sides: 50,
        radius: 0.2,
        width: 0.01,
        num: 2,
        step: 0.02,
      },
      color: colors.angles,
    },
  });
  const mark = (name, p1Index, p2Index = null, num = 1, color = colors.sides, length = 0.2) => {
    let p2;
    if (p2Index == null) {
      p2 = new Point(0, 0);
    } else {
      p2 = sPoints[p2Index];
    }
    const l = new Line(sPoints[p1Index], p2);
    return {
      name,
      method: 'marks',
      options: {
        num,
        width: 0.02,
        length,
        rotation: l.angle(),
        position: l.midPoint(),
        color,
      },
    };
  };
  // const dmark = (name, p1Index, p2Index)
  const split = {
    name: 'split',
    method: 'collection',
    addElements: [
      {
        name: 'circle',
        method: 'polygon',
        options: {
          sides: 100,
          color: colors.split,
          radius: 1.21,
          width: 0.01,
        },
      },
      sAng('a0', 1, 0),
      sAng('a1', 2, 1),
      sAng('a2', 3, 2),
      sAng('a3', 4, 3),
      sAng('a4', 0, 4),
      // sAng('a4', 5, 4),
      // sAng('a5', 0, 5),
      iAng('i0', 0, 1, 2),
      iAng('i1', 1, 2, 3),
      iAng('i2', 2, 3, 4),
      iAng('i3', 3, 4, 0),
      iAng('i4', 4, 0, 1),
      // iAng('i4', 4, 5, 0),
      // iAng('i5', 5, 0, 1),
      sLine('s0', sPoints[0]),
      sLine('s1', sPoints[1]),
      sLine('s2', sPoints[2]),
      sLine('s3', sPoints[3]),
      sLine('s4', sPoints[4]),
      // sLine('s5', sPoints[5]),
      mark('m0', 0, 1),
      mark('m1', 1, 2),
      mark('m2', 2, 3),
      mark('m3', 3, 4),
      mark('m4', 4, 0),
      //
      mark('r0', 0, null, 2, colors.split, 0.15),
      mark('r1', 1, null, 2, colors.split, 0.15),
      mark('r2', 2, null, 2, colors.split, 0.15),
      mark('r3', 3, null, 2, colors.split, 0.15),
      mark('r4', 4, null, 2, colors.split, 0.15),
      // mark('m4', 4, 5),
      // mark('m5', 5, 0),
      poly('line', sPoints, [0, 0], 1, null, undefined, 'mid'),
    ],
    options: {
      pulse: 1.2,
    },
    mods: {
      scenarios: {
        default: { position: [0, -0.3] },
        low: { position: [0, -0.6] },
      },
    },
  };

  layout.addElements = [
    // highlighter,
    poly('tri', regularPolyPoints(3, 1), [-2, -0.5], 0.9, 'A', null),
    poly('quad', regularPolyPoints(4, 1, Math.PI / 4), [0, -0.3], 0.9, 'B', ''),
    poly('pent', regularPolyPoints(5, 1), [2, -0.3], 0.9, 'C', null),
    // poly('hex', regularPolyPoints(6, 1)),
    // poly('hep', regularPolyPoints(7, 1)),
    // poly('oct', regularPolyPoints(8, 1)),
    poly('poly0', pointsP, [1.7, -0.2], 0.9),
    poly('poly1', pointsP1, [-2, -0.2], 0.9),
    poly('poly2', pointsP2, [-0.2, -0.2], 0.9),
    tot,
    eqnTot,
    split,
  ];
  return layout;
}
