// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.small = colors.get('green').rgb;
  layout.width = 0.02;

  const points1 = [
    new Point(-0.6, 0),
    new Point(0, 0),
    new Point(0.4, 0.9),
  ];
  const s = 1.8;
  const points2 = [
    new Point(points1[0].x * s, 0),
    new Point(0, 0),
    new Point(points1[2].x * s, points1[2].y * s),
  ];
  const lineC = new Line(points1[0], points1[2]);
  const a = lineC.angle();
  const lineRC = new Line(points2[0], points2[2]);

  const w = 0.06;
  const arrow = (name, p, r, color = colors.sides) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: '1',
        method: 'line',
        options: {
          p1: [-w, -w], p2: [0, 0], width: 0.01, color,
        },
      },
      {
        name: '2',
        method: 'line',
        options: {
          p1: [-w, w], p2: [0, 0], width: 0.01, color,
        },
      },
    ],
    options: {
      // position: p,
      transform: new Transform().scale(1, 1).rotate(r).translate(p),
    },
  });

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'inside',
    },
  });

  const angle = p => ({
    name: 'b',
    method: 'angle',
    options: {
      label: {
        text: 'b',
        offset: 0.01,
        scale: 0.6,
      },
      curve: {
        radius: 0.2,
        width: 0.01,
        sides: 100,
      },
      sides: {
        color: colors.sides,
        length: 0.25,
        width: 0.02,
      },
      angle: a,
      color: colors.angles,
      position: p,
    },
  });

  const tri = (name, p, sideA, sideB, defaultP) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'ss',
        method: 'polyline',
        options: {
          points: p,
          color: colors.sides,
          close: false,
          width: 0.02,
          side: [
            side(sideA),
            side(sideB),
          ],
        },
      },
      angle(p[0]),
      {
        name: 'C',
        method: 'line',
        options: {
          p1: p[0],
          p2: p[2],
          dashStyle: {
            style: [0.05, 0.02],
          },
          width: 0.01,
          color: colors.sides,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { scale: 1, position: defaultP },
      },
    },
  });

  const pos1 = new Point(-1, -1);
  const pos2 = new Point(1.3, -1);

  const bAngle = joinObjects(angle([0, 0]), {
    mods: {
      scenarios: {
        default: { position: pos1.add(points2[0]) },
        initial: { position: pos1.add(points1[0]) },
      },
    },
  });

  const dashedLine = (name, p1, p2, defaultPos) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      dashStyle: {
        style: [0.05, 0.02],
      },
      width: 0.01,
      color: colors.sides,
      // label: {
      //   text: label,
      //   offset: 0.05,
      //   location: 'inside',
      // },
    },
    mods: {
      scenarios: {
        default: { position: defaultPos },
      },
    },
  });

  const rBLine = dashedLine('rBLine', points1[2], points2[2], pos1.add(points1[2]));

  const rCLine = dashedLine('rCLine', points2[0], points2[2], pos1.add(points2[0]));

  const rALine = {
    name: 'rALine',
    method: 'line',
    options: {
      p1: points1[0],
      p2: points2[0],
      width: 0.02,
      color: colors.sides,
    },
    mods: {
      scenarios: {
        default: { position: pos1.add(points1[0]) },
      },
    },
  };

  const dimension = (name, label, p1, p2, defaultPos) => ({
    name,
    method: 'line',
    options: {
      arrows: {
        width: 0.08,
        height: 0.08,
      },
      label: {
        text: label,
        offset: 0.05,
        location: 'inside',
      },
      width: 0.01,
      color: colors.sides,
      p1: p1.add(defaultPos),
      p2: p2.add(defaultPos),
      offset: -0.3,
    },
  });

  const txt = (name, text, defaultPos) => ({
    name,
    method: 'text',
    options: {
      text,
      color: colors.sides,
      size: 0.2 * 0.8,
    },
    mods: {
      scenarios: {
        default: { position: defaultPos },
      },
    },
  });

  layout.addElements = [
    tri('tri1', points1, 'A', 'B', pos1),
    tri('tri2', points2, 'sA', 'sB', pos2),
    bAngle,
    rBLine,
    rCLine,
    rALine,
    dimension('rADim', 'sA', points2[0], points2[1], pos1),
    dimension('rBDim', 'sB', points2[1], points2[2], pos1),
    arrow('arrow1', lineC.pointAtPercent(0.5).add(pos1), a),
    arrow('arrow2', lineRC.pointAtPercent(0.43).add(pos1), a),
    txt('cLabel', 'C', lineC.pointAtPercent(0.5).add(pos1).add(0.05, 0.2)),
    txt('rcLabel', 'sC', lineRC.pointAtPercent(0.5).add(pos1).add(0, 0.2)),
  ];

  return layout;
}
