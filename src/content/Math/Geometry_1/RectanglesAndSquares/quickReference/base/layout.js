// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrRectangles_sides = colors.get('blue').rgb;
  colors.qrRectangles_angles = colors.get('red').rgb;

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
      color: colors.qrRectangles_sides,
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
      color: colors.qrRectangles_angles,
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

  const square = {
    name: 'square',
    method: 'polyLine',
    options: {
      points: [[-h / 2, -h / 2], [-h / 2, h / 2], [h / 2, h / 2], [h / 2, -h / 2]],
      close: true,
      width,
      color: colors.qrRectangles_sides,
      angle: {
        label: { text: '' },
        curve: {
          width,
          radius: 0.3,
        },
        color: colors.qrRectangles_angles,
      },
      side: {
        label: { text: 'A', offset: 0.1 },
      },
    },
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
      },
    },
  };

  layout.addElements = [
    rectangle,
    square,
  ];
  return layout;
}
