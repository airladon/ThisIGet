// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import textureMap from '../../../../../common/images/textureMaps/circles.png';

const {
  Point,
  Rect,
  Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'circle',
  'dimension',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors = colors;
  layout.position = new Point(0, 0);

  // General
  // const linewidth = 0.03;
  const wheelSize = 0.8;
  const wheelPoints = 50;
  const textureFile = `${textureMap}`;
  const left = new Point(-1, -0.4);
  const center = new Point(0, -0.4);
  const right = new Point(1, -0.4);
  const moreLeft = new Point(-2, -0.4);
  const moreRight = new Point(2, -0.4);
  const circleLineWidth = 0.05;
  const scenarios = {
    moreLeft: { position: moreLeft },
    left: { position: left },
    center: { position: center },
    right: { position: right },
    moreRight: { position: moreRight },
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
      radius: wheelSize + circleLineWidth,
      width: circleLineWidth,
      sides: wheelPoints,
      color: colors.circle,
      transform: new Transform('Circle').scale(1, 1).translate(0, 0),
    },
    mods: { scenarios },
  };

  layout.darkCircle = {
    name: 'darkCircle',
    method: 'polygon',
    options: [filledCircle, {
      color: [0, 0, 0, 0.7],
      textureLocation: '',
    }],
    mods: { scenarios },
  };

  const mods = { scenarios };
  const wheelTex = { textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333) };
  const clockTex = { textureCoords: new Rect(0, 0.3333, 0.3333, 0.3333) };
  const ballTex = { textureCoords: new Rect(0.3333, 0.6666, 0.3333, 0.3333) };
  const earthTex = { textureCoords: new Rect(0, 0.6666, 0.3333, 0.3333) };
  layout.wheel = ['', 'wheel', 'polygon', [filledCircle, wheelTex], mods];
  layout.clock = ['', 'clock', 'polygon', [filledCircle, clockTex], mods];
  layout.ball = ['', 'ball', 'polygon', [filledCircle, ballTex], mods];
  layout.earth = ['', 'earth', 'polygon', [filledCircle, earthTex], mods];

  layout.textD = {
    name: 'd',
    method: 'text',
    options: {
      text: 'd',
      vAlign: 'baseline',
      hAlign: 'left',
      position: new Point(-0.05, 0.1),
      color: colors.dimension,
    },
  };

  layout.textC = {
    name: 'c',
    method: 'text',
    options: {
      text: 'c',
      vAlign: 'baseline',
      hAlign: 'left',
      position: new Point(-0.05, wheelSize * 1.2 + 0.1),
      color: colors.dimension,
    },
  };

  layout.diameter = {
    name: 'diameter',
    method: 'line',
    options: {
      length: wheelSize * 1.97,
      vertexSpaceStart: 'center',
      width: 0.015,
      color: colors.dimension,
      arrows: {
        width: 0.1,
        height: 0.1,
      },
    },
    mods: { scenarios },
  };

  layout.circumferenceRadius = wheelSize * 1.2;
  layout.circumferenceLineWidth = 0.015;
  layout.circumferenceArrowDimension = 0.1;
  layout.circumference = {
    name: 'circumference',
    method: 'collection',
    options: {
      transform: new Transform('Circumference').rotate(Math.PI / 2).translate(0, 0),
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
          clockwise: true,
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

  layout.circumferenceEquation = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: layout.colors.dimension,
      scale: 1,
      defaultFormAlignment: {
        alignH: 'center',
      },
      elements: {
        c: 'c',
        'pi': 'π',
        'd': 'd',
        'equals': ' = ',
      },
      forms: {
        'base': ['c', 'equals', 'pi', 'space', 'd'],
      },
    },
    mods: {
      scenarios: {
        left: { position: new Point(-2.2, 0) },
        bottom: { position: new Point(0, -1.3) },
      },
    },
  };

  layout.properties = {
    name: 'properties',
    method: 'collection',
    options: {
      transform: new Transform('Properties').translate(0, 0),
    },
    addElements: [
      layout.darkCircle,
      layout.circumference,
      layout.textC,
      layout.diameter,
      layout.textD,
      layout.circumferenceEquation,
    ],
    mods: { scenarios },
  };

  layout.addElements = [
    // ['', 'wheel', 'shapes/polygon', [filledCircle, wheel]],
    layout.wheel,
    layout.earth,
    layout.ball,
    layout.clock,
    layout.circle,
    layout.properties,
  ];
  return layout;
}
