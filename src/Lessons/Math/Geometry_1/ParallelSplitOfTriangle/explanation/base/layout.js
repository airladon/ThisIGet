// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'highlight',
  'grey',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const points = [
    new Point(-1.5, -1).add(0.3, 0),
    new Point(0, 1).add(0.3, 0),
    new Point(0, -1).add(0.3, 0),
  ];

  const split = [
    new Point(-1, -0.33).add(0.3, 0),
    new Point(0, -0.33).add(0.3, 0),
  ];

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points,
      color: colors.sides,
      close: true,
      width: 0.02,
      side: [
        side('M'),
        side('N'),
        side('B'),
      ],
    },
  };

  const label = (text, p1, p2) => ({
    name: `label${text}`,
    method: 'line',
    options: {
      p1,
      p2,
      offset: 0.4,
      label: {
        text,
        // offset: 0.05,
        location: 'outside',
        color: colors.sides,
      },
      arrows: {
        width: 0.05,
        height: 0.05,
      },
      color: colors.grey,
      dashStyle: {
        style: [(new Line(p1, p2)).distance / 2 - 0.05 - 0.2, 0.4],

      },
      width: 0.005,
    },
  });

  const splitLine = {
    name: 'split',
    method: 'line',
    options: {
      p1: split[0],
      p2: split[1],
      color: colors.sides,
      width: 0.02,
    },
  };

  const splitTri = {
    name: 'splitTri',
    method: 'polyLine',
    options: {
      // points: [
      //   split[0].add(0.025, 0),
      //   points[1].add(-0.02, -0.06),
      //   split[1].add(-0.02, 0),
      // ],
      points: [
        split[0],
        points[1],
        split[1],
      ],
      color: colors.highlight,
      close: true,
      width: 0.02,
      side: [
        side('m'),
        side('n'),
        side('b'),
      ],
      // transform: new Transform().translate(0, 0).scale(0.98),
    },
  };

  const construction = {
    name: 'construction',
    method: 'line',
    options: {
      p1: split[0],
      p2: points[2],
      color: colors.grey,
      width: 0.01,
    },
  };

  const areaLabel = (text, p) => ({
    name: `area${text}`,
    method: 'text',
    options: {
      text,
      position: p,
      size: 0.15,
      color: colors.grey,
    },
  });

  const rightAngle = (name, p1, p2, p3, color = colors.sides) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      color,
      curve: {
        radius: 0.2,
        width: 0.01,
      },
      autoRightAngle: true,
    },
  });

  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // const elements = {

  // }
  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      rightAngle('rightAngle', points[1], points[2], points[0]),
      rightAngle('splitRightAngle', points[1], split[1], split[0], colors.sides),
      tri,
      splitLine,
      splitTri,
      construction,
      label('M', points[0], points[1]),
      label('N', points[1], points[2]),
      areaLabel('1', [-0.65, -0.75]),
      areaLabel('2', [0.05, -0.55]),
      areaLabel('3', [-0.05, 0]),
    ],
    mods: {
      scenarios: {
        left: { position: [-1, -0.3] },
        center: { position: [0.5, -0.3] },
      },
    },
  };
  layout.addElements = [
    fig,
  ];
  return layout;
}
