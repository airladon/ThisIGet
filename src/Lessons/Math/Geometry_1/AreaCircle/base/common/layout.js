// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'grid',
  'sides',
  'areaTri',
  'areaTriLabel',
  'areaPoly',
  'areaPolyLabel',
  'areaCircle',
  'areaCircleLabel',
  'height',
  'border',
  'radius',
  'circumference',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const radius = 1.25;
  layout.radius = radius;
  const circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      radius,
      width: 0.03,
      sides: 200,
      color: colors.sides,
    },
  };

  const grid = {
    name: 'grid',
    method: 'grid',
    options: {
      xStep: 0.25,
      yStep: 0.25,
      bounds: new Rect(-radius, -radius, radius * 2, radius * 2),
      color: colors.grid,
    },
  };

  layout.polygonSides = [
    6,
    10,
    50,
  ];

  const poly = sides => ({
    name: `poly${sides}`,
    method: 'polygon',
    options: {
      radius,
      width: 0.03,
      sides,
      color: colors.sides,
    },
  });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      grid,
      circle,
      poly(6),
    ],
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
