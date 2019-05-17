// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

// const {
//   // Point,
//   // Rect,
//   // Transform,
//   // Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrAreaCircle_sides',
  'qrAreaCircle_radius',
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
      radius: radius + 0.02,
      width: 0.03,
      sides: 200,
      color: colors.qrAreaCircle_sides,
    },
  };

  layout.polygonSides = [
    6,
    10,
    50,
  ];
  const triAngle = layout.polygonSides.map(a => Math.PI * 2 / a);

  const poly = (name, index) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'radius',
        method: 'line',
        options: {
          p1: [0, 0],
          p2: [radius, 0],
          width: 0.015,
          label: {
            text: 'r',
            offset: 0.05,
            location: 'outside',
          },
          color: colors.qrAreaCircle_radius,
        },
        mods: {
          scenarios: {
            height: { rotation: triAngle[index] / 2 },
            circle: { rotation: 0 },
          },
        },
      },
    ],
  });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      circle,
      poly('polyMost', 2),
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
        left: { position: [-1.2, -0.2] },
      },
    },
  };

  const r2 = { sup: ['__r', [' ', '_2']] };
  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      elements: {
        _Area: { text: 'Area', color: colors.qrAreaCircle_sides },
        equals: '  =  ',
        __r: { text: 'r', color: colors.qrAreaCircle_radius },
        _2: '2',
        pi: 'π',
      },
      forms: {
        '14': ['_Area', 'equals', 'pi', ' ', r2],
      },
    },
    mods: {
      scenarios: {
        right: { position: [1.2, 0] },
        qr: { position: [2.7, 0.5], scale: 1.2 },
        summary: { position: [1.2, -0.2] },
      },
    },
  };


  layout.addElements = [
    fig,
    eqn,
  ];
  return layout;
}
