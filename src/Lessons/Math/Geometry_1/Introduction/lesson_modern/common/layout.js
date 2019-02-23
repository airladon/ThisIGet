// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  Point,
  Rect,
  Transform,
  // Line,
} = Fig.tools.g2;

const cssColorNames = [
  'circle',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors = colors;
  layout.position = new Point(0, 0);

  // General
  // const linewidth = 0.03;
  const wheelSize = 0.8;
  const wheelPoints = 50;
  const textureFile = `/static/dist/${textureMap}`;

  const filledCircle = {
    fill: true,
    sides: wheelPoints,
    radius: wheelSize,
    color: [1, 1, 0, 1],
    transform: new Transform('filledCircle').translate(0, 0),
    textureLocation: textureFile,
  };

  const circle = {
    geometry: {
      name: 'circle',
      method: 'polygon',
      options: {
        fill: false,
        radius: wheelSize,
        width: 0.05,
        sides: wheelPoints,
        color: colors.circle,
        transform: new Transform('Circle').translate(0, 0),
      },
      mods: {
        scenarios: {
          left: { position: new Point(-1, -0.4) },
          right: { position: new Point(1, -0.4) },
        },
      },
    },
  };

  const wheel = {
    geometry: {
      name: 'wheel',
      method: 'polygon',
      options: [filledCircle, {
        textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
      }],
      mods: {
        scenarios: {
          center: { position: new Point(0, -0.4) },
          left: { position: new Point(-1, -0.4) },
        },
      },
    },
  };

  // const wheel = ['', 'wheel', 'polygon', [filledCircle, {
  //   textureLocation: textureFile,
  //   textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
  // }]];

  layout.addElements = [
    // ['', 'wheel', 'shapes/polygon', [filledCircle, wheel]],
    wheel.geometry,
    circle.geometry,
  ];
  return layout;
}
