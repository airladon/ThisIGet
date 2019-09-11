// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';
import { activator } from '../../../../../../js/tools/misc';

const {
  Point,
  Rect,
  Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects, duplicateFromTo } = Fig.tools.misc;

const cssColorNames = [
  'circle',
  'dimensions',
  'dimensionsDark',
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
  const textureFile = `${textureMap}`;
  const lineWidth = 0.05;
  const dimensionWidth = 0.015;

  const left = new Point(-1.3, 0);
  const centerLeft = new Point(-1, 0);
  const center = new Point(0, 0);
  const centerRight = new Point(1, 0);
  const right = new Point(1.3, 0);
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
  const clockTex = { textureCoords: new Rect(0, 0.3333, 0.3333, 0.3333) };
  const ballTex = { textureCoords: new Rect(0.3333, 0.6666, 0.3333, 0.3333) };
  const earthTex = { textureCoords: new Rect(0, 0.6666, 0.3333, 0.3333) };

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


  // ////////////////////////////////////////////////////////////////////////
  // Figure 1
  // ////////////////////////////////////////////////////////////////////////
  layout.fig1 = {
    name: 'fig1',
    method: 'collection',
    options: collection,
    addElements: [
      activator(4, 2),
      {
        name: 'wheel',
        method: 'polygon',
        options: [filledCircle, wheelTex],
        mods: joinObjects({}, mods, {
          isTouchable: true,
          isMovable: true,
          move: {
            type: 'rotation',
          },
        }),
      },
      {
        name: 'circle',
        method: 'polygon',
        options: [circle],
        mods,
      },
    ],
    mods: { hasTouchableElements: true },
  };

  // ////////////////////////////////////////////////////////////////////////
  // Figure 2
  // ////////////////////////////////////////////////////////////////////////
  const diameter = {
    length: radius * 2 - lineWidth * 2,
    width: dimensionWidth,
    vertexSpaceStart: 'center',
    color: colors.dimensions,
    arrows: {
      width: dimensionWidth * 8,
      height: dimensionWidth * 8,
    },
  };

  const darkCircle = joinObjects({}, filledCircle, {
    color: [0, 0, 0, 0],
    textureLocation: '',
  });


  const text = {
    vAlign: 'baseline',
    hAlign: 'left',
    color: colors.dimensions,
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
          color: colors.dimensions,
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
          color: colors.dimensions,
          tip: new Point(0, 0),
        },
      },
    ],
  };

  const equation = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: layout.colors.dimensions,
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
        left: { position: new Point(-radius * 1.8, 0) },
        bottom: { position: new Point(0, -radius * 1.5) },
      },
    },
  };


  const dimensions = {
    name: 'dimensions',
    method: 'collection',
    options: {
      transform: new Transform().scale(1,1).translate(0, 0),
    },
    mods,
    addElements: [
      {
        name: 'darkCircle',
        method: 'polygon',
        options: [darkCircle],
      },
      equation,
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
  };

  layout.fig2 = {
    name: 'fig2',
    method: 'collection',
    options: collection,
    addElements: [
      activator(4.5, 2.6),
      {
        name: 'circle',
        method: 'polygon',
        options: [circle],
      },
      dimensions,
    ],
    mods: { hasTouchableElements: true },
  };

  // ////////////////////////////////////////////////////////////////////////
  // Figure 3
  // ////////////////////////////////////////////////////////////////////////
  const dimensions2 = {};
  duplicateFromTo(dimensions, dimensions2);
  dimensions2.addElements[0].options[0].color = [0.9, 0.9, 0.9, 0.2];
  layout.fig3 = {
    name: 'fig3',
    method: 'collection',
    options: collection,
    addElements: [
      activator(5, 3),
      {
        name: 'clock',
        method: 'polygon',
        options: [filledCircle, clockTex],
        mods,
        scenario: 'left',
      },
      {
        name: 'ball',
        method: 'polygon',
        options: [filledCircle, ballTex],
        mods,
        scenario: 'right',
      },
      dimensions2,
    ],
    mods: { hasTouchableElements: true },
  };

  // ////////////////////////////////////////////////////////////////////////
  // Figure 3
  // ////////////////////////////////////////////////////////////////////////
  duplicateFromTo(dimensions, dimensions2);
  // dimensions2.addElements[0].options[0].color = [0.9, 0.9, 0.9, 0.2];
  layout.fig4 = {
    name: 'fig4',
    method: 'collection',
    options: collection,
    addElements: [
      {
        name: 'earth',
        method: 'polygon',
        options: [filledCircle, earthTex],
        mods,
        scenario: 'center',
      },
      // dimensions2,
    ],
  };

  layout.fig4 = joinObjects({}, layout.fig4, { name: 'fig4' });
  layout.addElements = [
    layout.fig1,
    layout.fig2,
    layout.fig3,
    layout.fig4,
  ];
  return layout;
}
