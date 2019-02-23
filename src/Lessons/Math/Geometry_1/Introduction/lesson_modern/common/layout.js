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
  'dimension',
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
  const left = new Point(-1, -0.4);
  const center = new Point(0, -0.4);
  const right = new Point(1, -0.4);
  const scenarios = {
    left: { position: left },
    center: { position: center },
    right: { position: right },
  };

  const filledCircle = {
    fill: true,
    sides: wheelPoints,
    radius: wheelSize,
    color: [1, 1, 0, 1],
    transform: new Transform('filledCircle').translate(0, 0),
    textureLocation: textureFile,
  };

  layout.circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      fill: false,
      radius: wheelSize,
      width: 0.05,
      sides: wheelPoints,
      color: colors.circle,
      transform: new Transform('Circle').scale(1, 1).translate(0, 0),
    },
    mods: { scenarios },
  };

  layout.wheel = {
    name: 'wheel',
    method: 'polygon',
    options: [filledCircle, {
      textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
    }],
    mods: { scenarios },
  };

  layout.diameter = {
    name: 'diameter',
    method: 'line',
    options: {
      length: wheelSize * 2 - 0.1,
      vertexSpaceStart: 'center',
      width: 0.025,
      color: colors.dimension,
      arrows: {
        width: 0.1,
        height: 0.1,
      },
    },
    mods: { scenarios },
  };

  layout.circumferenceRadius = wheelSize * 1.2;
  layout.circumferenceLineWidth = 0.025;
  layout.circumferenceArrowDimension = 0.1;
  layout.circumference = {
    name: 'circumference',
    method: 'collection',
    options: {
      transform: new Transform('Circumference').rotate(-Math.PI / 2).translate(0, 0),
    },
    addElements: [
      {
        name: 'line',
        method: 'polygon',
        options: {
          fill: false,
          radius: layout.circumferenceRadius,
          width: layout.circumferenceLineWidth,
          sides: 300,
          color: colors.dimension,
          transform: new Transform('Circle').scale(1, 1).translate(0, 0),
        },
      },
      {
        name: 'arrow',
        method: 'arrow',
        options: {
          width: layout.circumferenceArrowDimension,
          legWidth: 0,
          height: layout.circumferenceArrowDimension,
          legHeight: 0,
          color: colors.dimension,
          tip: new Point(0, 0),
        },
      },
    ],
    mods: { scenarios },
  };

  // const wheel = ['', 'wheel', 'polygon', [filledCircle, {
  //   textureLocation: textureFile,
  //   textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
  // }]];

  layout.addElements = [
    // ['', 'wheel', 'shapes/polygon', [filledCircle, wheel]],
    layout.wheel,
    layout.circle,
    layout.circumference,
    layout.diameter,
  ];
  return layout;
}
