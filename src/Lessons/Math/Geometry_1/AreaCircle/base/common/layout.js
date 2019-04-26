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

  const lightCircle = {
    name: 'lightCircle',
    method: 'polygon',
    options: {
      radius,
      width: 0.01,
      sides: 200,
      color: colors.grid,
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

  const poly = (name, sides) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'fill',
        method: 'polygon',
        options: {
          radius,
          fill: true,
          sides,
          color: colors.areaPoly,
        },
      },
      {
        name: 'lines',
        method: 'radialLines',
        options: {
          outerRadius: radius,
          dAngle: Math.PI * 2 / sides,
          color: colors.sides,
          width: 0.008,
        },
      },
      {
        name: 'borderHighlight',
        method: 'polygon',
        options: {
          radius,
          width: 0.02,
          sides,
          color: colors.border,
        },
      },
      {
        name: 'border',
        method: 'polygon',
        options: {
          radius,
          width: 0.008,
          sides,
          color: colors.sides,
        },
      },
    ],
  });

  const triAngle = Math.PI * 2 / layout.polygonSides[0];
  const triPoints = [
    [0, 0],
    [radius, 0],
    [radius * Math.cos(triAngle), radius * Math.sin(triAngle)],
  ];
  const tri = {
    name: 'tri',
    method: 'collection',
    addElements: [
      {
        name: 'fill',
        method: 'fan',
        options: {
          points: triPoints,
          color: colors.areaTri,
        },
      },
      {
        name: 'height',
        method: 'line',
        options: {
          p1: [0, 0],
          p2: [
            radius * Math.cos(triAngle / 2) * Math.cos(triAngle / 2),
            radius * Math.cos(triAngle / 2) * Math.sin(triAngle / 2),
          ],
          width: 0.015,
          label: {
            text: 'h',
            offset: 0.05,
            location: 'outside',
          },
          color: colors.height,
        },
      },
      {
        name: 'base',
        method: 'line',
        options: {
          p2: [radius, 0],
          p1: [radius * Math.cos(triAngle), radius * Math.sin(triAngle)],
          width: 0.015,
          offset: 0.3,
          label: {
            text: 'b',
            offset: 0.05,
            location: 'outside',
          },
          arrows: {
            width: 0.05,
            height: 0.05,
          },
          color: colors.border,
        },
      },
    ],
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      grid,
      circle,
      lightCircle,
      tri,
      poly('poly', layout.polygonSides[0]),
      poly('polyMore', layout.polygonSides[1]),
      poly('polyMost', layout.polygonSides[2]),
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
        left: { position: [-1, -0.2] },
      },
    },
  };


  layout.addElements = [
    fig,
  ];
  return layout;
}
