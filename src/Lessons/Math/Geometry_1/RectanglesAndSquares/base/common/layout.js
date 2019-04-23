// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'disabled',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const width = 0.02;
  const w = 3.5;
  const h = 1.5;
  const points = [
    new Point(-w / 2, -h / 2),
    new Point(-w / 2, h / 2),
    new Point(w / 2, h / 2),
    new Point(w / 2, -h / 2),
  ];

  const line = (name, position, length, angle) => ({
    name,
    method: 'line',
    options: {
      width,
      color: colors.sides,
      label: {
        text: 'A',
        offset: 0.1,
        location: 'outside',
      },
      position,
      angle,
      length,
      vertexSpaceStart: 'start',
    },
  });

  const angle = (name, position, rotation, ang = Math.PI / 2, text = '', radius = 0.3) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      curve: {
        width,
        radius,
        sides: 100,
      },
      rotation,
      angle: ang,
      position,
      label: {
        text,
        radius: radius - 0.03,
      },
      autoRightAngle: true,
    },
  });

  const diagAngle = Math.PI - Math.atan(h / w);
  const diagLength =  Math.sqrt(w ** 2 + h ** 2);
  const aAngle = Math.PI - diagAngle;
  const rectangle = {
    name: 'rect',
    method: 'collection',
    addElements: [
      angle('bottomLeft', points[0], 0),
      angle('topLeft', points[1], Math.PI / 2 * 3),
      angle('topRight', points[2], Math.PI),
      angle('bottomRight', points[3], Math.PI / 2),
      angle('bottomRightDiag', points[3], diagAngle, aAngle, 'a', 0.5),
      angle('topLeftDiag', points[1], -aAngle, aAngle, 'a', 0.5),
      line('top', points[1], w, 0),
      line('left', points[0], h, Math.PI / 2),
      line('right', points[2], h, -Math.PI / 2),
      line('bottom', points[3], w, Math.PI),
      line('diagonal', points[1], diagLength, -aAngle),
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
      },
    },
  };
  layout.addElements = [
    rectangle,
  ];
  return layout;
}
