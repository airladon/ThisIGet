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

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'circle',
  'dimension',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors = colors;
  layout.limits = new Rect(-5, -1, 10, 2);
  layout.position = new Point(0, 0);
  // General
  // const linewidth = 0.03;
  const radius = 0.9;
  const sides = 50;
  const textureFile = `/static/dist/${textureMap}`;
  const lineWidth = 0.05;
  const dimensionWidth = 0.015;

  const left = new Point(-4, 0);
  const centerLeft = new Point(-1, 0);
  const center = new Point(0, 0);
  const centerRight = new Point(1, 0);
  const right = new Point(-4, 0);
  const scenarios = {
    left: { position: left },
    centerLeft: { position: centerLeft },
    center: { position: center },
    centerRight: { position: centerRight },
    right: { position: right },
  };
  const mods = { scenarios };

  const collection = {
    transform: new Transform('collection').scale(1,1).translate(0, 0),
  };
  const wheelTex = { textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333) };
  // const clockTex = { textureCoords: new Rect(0, 0.3333, 0.3333, 0.3333) };
  // const ballTex = { textureCoords: new Rect(0.3333, 0.6666, 0.3333, 0.3333) };
  // const earthTex = { textureCoords: new Rect(0, 0.6666, 0.3333, 0.3333) };

  const circle = {
    sides,
    radius,
    fill: false,
    width: lineWidth,
    color: colors.circle,
    transform: new Transform('circle').scale(1,1).rotate(0).translate(0, 0),
  };

  const filledCircle = joinObjects({}, circle, {
    fill: true,
    textureLocation: textureFile,
  });

  // const wheel = joinObjects({}, filledCircle, wheelTex, {
  //   transform: new Transform('circle').scale(1,1).translate(scenarios.left.position),
  // });

  layout.fig1 = {
    name: 'fig1',
    method: 'collection',
    options: collection,
    addElements: [
      {
        name: 'wheel',
        method: 'polygon',
        options: [filledCircle, wheelTex],
        mods,
      },
      {
        name: 'circle',
        method: 'polygon',
        options: [circle],
        mods,
      },
    ],
  };

  const diameter = {
    length: radius * 2 - lineWidth * 2,
    width: dimensionWidth,
    vertexSpaceStart: 'center',
    color: colors.dimension,
    arrows: {
      width: dimensionWidth * 8,
      height: dimensionWidth * 8,
    },
  };

  const darkCircle = {
    options: [filledCircle, {
      color: [0, 0, 0, 0.7],
      textureLocation: '',
    }],
  };

  const text = {
    vAlign: 'baseline',
    hAlign: 'left',
    color: colors.dimension,
  };

  const textD = {
    text: 'd',
    position: new Point(-0.05, 0.1),
  };

  const textC = {
    text: 'c',
    position: new Point(-0.05, radius * 1.2 + 0.1),
  };

  layout.circumferenceRadius = radius * 1.2;
  layout.circumferenceLineWidth = dimensionWidth;
  layout.circumferenceArrowDimension = dimensionWidth * 8;
  const circumference = {
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
  };


  layout.fig2 = {
    name: 'fig2',
    method: 'collection',
    options: collection,
    addElements: [
      {
        name: 'circle',
        method: 'polygon',
        options: [circle],
      },
      {
        name: 'dimensions',
        method: 'collection',
        addElements: [
          {
            name: 'darkCircle',
            method: 'polygon',
            options: [darkCircle, { color: [0, 0, 0, 0] }],
          },
          {
            name: 'diameter',
            method: 'line',
            options: [diameter],
          },
          {
            name: 'd',
            method: 'text',
            options: [text, textD],
          },
          {
            name: 'c',
            method: 'text',
            options: [text, textC],
          },
          circumference,
        ],
      },
    ],
  };


  // const fig1 = ['', 'fig1', 'collection', [collection], mods, [
  //   ['', 'wheel', 'polygon', [filledCircle, wheelTex], mods],
  //   ['', 'circle', 'polygon', [circle], mods],
  // ]];

  // layout.circle = {
  //   name: 'circle',
  //   method: 'polygon',
  //   options: {
  //     fill: false,
  //     radius: wheelSize + circleLineWidth,
  //     width: circleLineWidth,
  //     sides: wheelPoints,
  //     color: colors.circle,
  //     transform: new Transform('Circle').scale(1, 1).translate(0, 0),
  //   },
  //   mods: { scenarios },
  // };

  // layout.darkCircle = {
  //   name: 'darkCircle',
  //   method: 'polygon',
  //   options: [filledCircle, {
  //     color: [0, 0, 0, 0.7],
  //     textureLocation: '',
  //   }],
  //   mods: { scenarios },
  // };

  // const mods = { scenarios };
  // layout.wheel = ['', 'wheel', 'polygon', [filledCircle, wheelTex], mods];
  // layout.clock = ['', 'clock', 'polygon', [filledCircle, clockTex], mods];
  // layout.ball = ['', 'ball', 'polygon', [filledCircle, ballTex], mods];
  // layout.earth = ['', 'earth', 'polygon', [filledCircle, earthTex], mods];

  // layout.textD = {
  //   name: 'd',
  //   method: 'text',
  //   options: {
  //     text: 'd',
  //     vAlign: 'baseline',
  //     hAlign: 'left',
  //     position: new Point(-0.05, 0.1),
  //     color: colors.dimension,
  //   },
  // };

  // layout.textC = {
  //   name: 'c',
  //   method: 'text',
  //   options: {
  //     text: 'c',
  //     vAlign: 'baseline',
  //     hAlign: 'left',
  //     position: new Point(-0.05, wheelSize * 1.2 + 0.1),
  //     color: colors.dimension,
  //   },
  // };

  // layout.diameter = {
  //   name: 'diameter',
  //   method: 'line',
  //   options: {
  //     length: wheelSize * 1.97,
  //     vertexSpaceStart: 'center',
  //     width: 0.015,
  //     color: colors.dimension,
  //     arrows: {
  //       width: 0.1,
  //       height: 0.1,
  //     },
  //   },
  //   mods: { scenarios },
  // };

  // layout.circumferenceRadius = wheelSize * 1.2;
  // layout.circumferenceLineWidth = 0.015;
  // layout.circumferenceArrowDimension = 0.1;
  // layout.circumference = {
  //   name: 'circumference',
  //   method: 'collection',
  //   options: {
  //     transform: new Transform('Circumference').rotate(Math.PI / 2).translate(0, 0),
  //   },
  //   addElements: [
  //     {
  //       name: 'line',
  //       method: 'polygon',
  //       options: {
  //         fill: false,
  //         radius: layout.circumferenceRadius,
  //         width: layout.circumferenceLineWidth,
  //         sides: 300,
  //         color: colors.dimension,
  //         clockwise: true,
  //         transform: new Transform('Circle').scale(1, 1).translate(0, 0),
  //       },
  //     },
  //     {
  //       name: 'arrow',
  //       method: 'arrow',
  //       options: {
  //         width: layout.circumferenceArrowDimension,
  //         legWidth: 0,
  //         height: layout.circumferenceArrowDimension,
  //         legHeight: 0,
  //         color: colors.dimension,
  //         tip: new Point(0, 0),
  //       },
  //     },
  //   ],
  //   mods: { scenarios },
  // };

  // layout.circumferenceEquation = {
  //   name: 'eqn',
  //   method: 'addEquation',
  //   options: {
  //     color: layout.colors.dimension,
  //     scale: 1,
  //     defaultFormAlignment: {
  //       alignH: 'center',
  //     },
  //     elements: {
  //       c: 'c',
  //       'pi': 'π',
  //       'd': 'd',
  //       'equals': ' = ',
  //     },
  //     forms: {
  //       'base': ['c', 'equals', 'pi', 'space', 'd'],
  //     },
  //   },
  //   mods: {
  //     scenarios: {
  //       left: { position: new Point(-2.2, 0) },
  //       bottom: { position: new Point(0, -1.3) },
  //     },
  //   },
  // };

  // layout.properties = {
  //   name: 'properties',
  //   method: 'collection',
  //   options: {
  //     transform: new Transform('Properties').translate(0, 0),
  //   },
  //   addElements: [
  //     layout.darkCircle,
  //     layout.circumference,
  //     layout.textC,
  //     layout.diameter,
  //     layout.textD,
  //     layout.circumferenceEquation,
  //   ],
  //   mods: { scenarios },
  // };

  layout.addElements = [
    // ['', 'wheel', 'shapes/polygon', [filledCircle, wheel]],
    layout.fig1,
    layout.fig2,
    // layout.wheel,
    // layout.earth,
    // layout.ball,
    // layout.clock,
    // layout.circle,
    // layout.properties,
  ];
  return layout;
}
