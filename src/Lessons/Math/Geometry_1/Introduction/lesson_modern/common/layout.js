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
  // 'lines',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
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

  const wheel = {
    geometry: {
      name: 'wheel',
      method: 'polygon',
      options: [filledCircle, {
        textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
      }],
    },
    scenarios: {
      center: { position: new Point(0, -0.4) },
      left: { position: new Point(-1, -0.4) },
    },
  };

  // const wheel = ['', 'wheel', 'polygon', [filledCircle, {
  //   textureLocation: textureFile,
  //   textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
  // }]];

  layout.addElements = [
    // ['', 'wheel', 'shapes/polygon', [filledCircle, wheel]],
    wheel.geometry,
  ];
  return layout;
}
