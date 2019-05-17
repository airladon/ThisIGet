// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrCongruent_sides',
  'qrCongruent_angles',
  'qrCongruent_pads',
  'disabled',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.02;

  const angle = text => ({
    color: colors.qrCongruent_angles,
    curve: {
      radius: 0.4,
      width: layout.width,
      sides: 200,
    },
    label: {
      text,
      scale: 0.8,
    },
  });

  const side = text => ({
    color: colors.qrCongruent_sides,
    label: {
      text,
      scale: 0.8,
      offset: 0.1,
      location: 'outside',
    },
  });

  const triangle = {
    method: 'polyLine',
    options: {
      points: [
        [0.7, 0.8],
        [1, -0.7],
        [-1.2, -0.7],
      ],
      width: layout.width,
      color: colors.qrCongruent_sides,
      close: true,
      angle: [
        angle('c'),
        angle('b'),
        angle('a'),
      ],
      side: [
        side('A'),
        side('B'),
        side('C'),
      ],
    },
    mods: {
      scenarios: {
        left: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
        right: { position: [1.4, -0.3], rotation: 0, scale: 1 },
        summaryLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
        summaryRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
        summaryTri1: { position: [1, 0.2], rotation: 0, scale: 1 },
        qrLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
        qrRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
        qrLeftAaa: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
        qrRightAaa: { position: [1.4, -0.3], rotation: 0, scale: 0.7 },
        mirror: { position: [1.4, -0.3], rotation: 0, scale: [-1, 1] },
        rotate: { position: [1.4, -0.3], rotation: Math.PI, scale: 1 },
        lowLeft: { position: [-1.4, -0.5], rotation: 0, scale: 0.9 },
        rightLeft: { position: [1.4, -0.5], rotation: 0, scale: 0.9 },
      },
    },
  };

  layout.tri1 = joinObjects({}, triangle, { name: 'tri1' });
  layout.tri2 = joinObjects({}, triangle, {
    name: 'tri2',
    mods: {
      interactiveLocation: [0.7, 0.8],
    },
  });

  layout.congruentTriangles = {
    name: 'congruentTriangles',
    method: 'collection',
    addElements: [
      layout.tri1,
      layout.tri2,
    ],
  };

  layout.addElements = [
    layout.congruentTriangles,
  ];

  layout.label = {
    position: new Point(1, -1),
  };
  return layout;
}
