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
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.tri = colors.get('red').rgb;
  colors.construction = colors.get('grey', 'dark').rgb;

  const regularPolyPoints = (num, r) => {
    const polyPoints = [];
    for (let i = 0; i < num; i += 1) {
      const angle = Math.PI * 2 / num * i + Math.PI / 2 - Math.PI * 2 / num;
      polyPoints.push([r * Math.cos(angle), r * Math.sin(angle)]);
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
    // [-1, -0.2],
    [-0.8, 0.8],
    // [-0.4, 0.2],
    [0.6, 0.9],
    // [1, -0.5],
    // [0.3, -0.2],
    [-0.2, -0.7],
  ];

  const pointsP2 = [
    [-1, -0.2],
    [-0.8, 0.8],
    // [-0.4, 0.2],
    [0.6, 0.9],
    [1, -0.5],
    // [0.3, -0.2],
    // [-0.2, -0.7],
  ];


  const poly = (name, points, pos = [0, 0], scale = 1) => {
    const t = new Transform().scale(scale, scale);
    const pointsToUse = points.map(p => (new Point(p[0], p[1])).transformBy(t.matrix()));
    return {
      name,
      method: 'polyLine',
      options: {
        points: pointsToUse,
        width: 0.03,
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
  };

  const polyBuilder = (points, tris) => {
    // const sides = [];
    const triangles = [];
    // for (let i = 1; i < points.length + 1; i += 1) {
    //   const side = {
    //     name: `side${i - 1}`,
    //     method: 'line',
    //     options: {
    //       p1: points[i - 1],
    //       p2: points[i % (points.length)],
    //       color: colors.sides,
    //       width: 0.03,
    //     },
    //   };
    //   sides.push(side);
    // }
    // sides.push(poly('line', points));
    tris.forEach((triPair, index) => {
      const tri = {
        name: `tri${index}`,
        method: 'line',
        options: {
          p1: points[triPair[0]],
          p2: points[triPair[1]],
          dashStyle: { style: [0.05, 0.03] },
          width: 0.02,
          color: colors.tri,
        },
      };
      triangles.push(tri);
    });
    return {
      name: 'polyB',
      method: 'collection',
      options: {
        color: colors.sides,
      },
      addElements: triangles,
    };
  };

  layout.addElements = [
    poly('tri', regularPolyPoints(3, 1), [-1, 0]),
    poly('quad', regularPolyPoints(4, 1), [1, 0]),
    poly('pent', regularPolyPoints(5, 1)),
    poly('hex', regularPolyPoints(6, 1)),
    poly('hep', regularPolyPoints(7, 1)),
    poly('oct', regularPolyPoints(8, 1)),
    poly('poly0', pointsP, [1.7, -0.2], 0.9),
    // poly('poly', pointsP, [1.7, -0.2], 0.9),
    poly('poly1', pointsP1, [-2, -0.2], 0.9),
    poly('poly2', pointsP2, [-0.2, -0.2], 0.9),
    polyBuilder(pointsP, [
      [0, 2],
      [2, 6],
      [2, 5],
      [3, 5],
    ]),
  ];
  return layout;
}
