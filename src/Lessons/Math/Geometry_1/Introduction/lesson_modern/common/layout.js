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
  const wheelSize = 1;
  const wheelPoints = 4;
  const textureFile = `/static/dist/${textureMap}`;

  const image = {
    fill: true,
    sides: wheelPoints,
    radius: wheelSize,
    color: [1,1,0,1],
    point: new Point(0, 0),
    textureLocation: textureFile,
    transform: new Transform('image').translate(0, 0),
  };

  const wheel = {
    textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
  };

  layout.addElements = [
    // {
    //   name: 'wheel',
    //   method: 'polygon',
    //   options: [image, wheel],
    // },
    ['', 'wheel', 'shapes/polygon', [image, wheel]],
    // ['', 'c', 'polygon', {
    //   fill: true,
    //   radius: 1,
    //   point: new Point(-1, 0),
    //   color: [0, 0.5, 0, 1],
    //   sides: 12,
    // }],
  ];
  return layout;
}
