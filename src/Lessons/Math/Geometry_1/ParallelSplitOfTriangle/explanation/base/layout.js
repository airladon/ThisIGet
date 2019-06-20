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
    new Point(-1.5, -1),
    new Point(0, 1),
    new Point(0, -1),
  ];

  const split = [
    new Point(-1, -0.33),
    new Point(0, -0.33),
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
        side(''),
        side(''),
        side('B'),
      ],
    },
  };

  const label = (text, p1, p2, distance) => ({
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
      width: 0.01,
    },
  };

  const splitTri = {
    name: 'splitTri',
    method: 'polyLine',
    options: {
      points: [
        split[0].add(0.025, 0),
        points[1].add(-0.02, -0.06),
        split[1].add(-0.02, 0),
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

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      tri,
      splitLine,
      splitTri,
      label('M', points[0], points[1], 1.01),
      label('N', points[1], points[2], 0.759),
    ],
  };
  layout.addElements = [
    fig,
  ];
  return layout;
}
