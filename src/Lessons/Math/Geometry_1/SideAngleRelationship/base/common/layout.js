// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'equalSide',
  'isosceles',
  'fill',
  'description',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const triPoints = [
    new Point(-2, -1),
    new Point(-1.5, 0.6),
    new Point(0.7, -1),
  ];

  const leftLine = new Line(triPoints[0], triPoints[1]);
  const rightLine = new Line(triPoints[1], triPoints[2]);
  const isoscelesPoint = new Point(
    triPoints[1].x + leftLine.distance * Math.cos(rightLine.angle()),
    triPoints[1].y + leftLine.distance * Math.sin(rightLine.angle()),
  );
  const isoscelesBase = new Line(triPoints[0], isoscelesPoint);

  const width = 0.04;
  const angle = (text, radius = 0.3) => ({
    color: colors.angles,
    curve: {
      radius,
      width: 0.015,
      sides: 200,
    },
    label: {
      text,
      radius: radius - 0.05,
    },
  });
  const side = text => ({
    label: {
      text,
      location: 'outside',
      offset: 0.05,
    },
  });

  const sideDash = text => ({
    label: {
      text,
      // location: 'outside',
      offset: 0,
      orientation: 'baseToLine',
    },
  });

  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      color: colors.sides,
      width,
      close: true,
      points: triPoints,
      angle: [
        angle('b'),
        angle('c'),
        angle('a'),
      ],
      side: [
        side('A'),
        side('B'),
        side('C'),
      ],
    },
  };

  const isosceles = {
    name: 'isosceles',
    method: 'polyLine',
    options: {
      color: colors.isosceles,
      width: width / 3,
      close: true,
      points: [
        triPoints[0],
        triPoints[1],
        isoscelesPoint,
      ],
      angle: [
        angle('m', 0.55),
        angle('', 0),
        angle('n', 0.3),
      ],
      side: [
        sideDash('|'),
        sideDash('|'),
        sideDash(''),
      ],
    },
    mods: {
      scenarios: {
        default: { position: [-0.045, -0.017], scale: 0.96 },
      },
    },
  };

  const lowerAngle = {
    name: 'lowerAngle',
    method: 'angle',
    options: {
      curve: {
        radius: 0.57,
        width: 0.014,
        sides: 200,
      },
      label: {
        text: 'o',
      },
      color: colors.angle,
      position: triPoints[0],
      angle: isoscelesBase.angle(),
    },
  };

  const lowerTriangle = {
    name: 'lowerTriangle',
    method: 'fan',
    options: {
      fill: true,
      color: colors.fill,
      points: [triPoints[0], isoscelesPoint, triPoints[2]],
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      lowerTriangle,
      lowerAngle,
      tri,
      isosceles,
    ],
    mods: {
      scenarios: {
        default: { position: [0.7, 0], scale: 1 },
        left: { position: [-1.1, 0], scale: 0.8 },
      },
    },
  };

  const elements = {
    A: { color: colors.sides },
    B: { color: colors.sides },
    m: { color: colors.angles },
    n: { color: colors.angles },
    o: { color: colors.angles },
    a: { color: colors.angles },
    b: { color: colors.angles },
    equals: '  =  ',
    _equals: '  =  ',
    plus: ' + ',
    greater: ' > ',
    less: ' < ',
  };

  const eqn = (name, y) => ({
    // name: 'eqn',
    name,
    method: 'addNavigator',
    options: {
      navType: 'description',
      color: colors.diagram.text.base,
      defaultFormAlignment: {
        alignH: 'center',
        alignV: 'middle',
      },
      scale: 0.9,
      elements,
      forms: {
        'sides0': {
          content: ['B', 'greater', 'A'],
          description: 'Start with:',
        },
        'sides1': {
          content: ['n', 'equals', 'o', 'plus', 'a'],
          description: 'n is an exterior angle:',
        },
        'sides2': {
          content: ['m', 'equals', 'o', 'plus', 'a'],
          description: 'm and n are equal angles in the isosceles triangle:',
        },
        'sides3': {
          content: ['m', 'greater', 'a'],
          description: 'm is the sum of a and o, and therefore must be greater than a:',
        },
        'sides4': {
          content: ['b', 'greater', 'a'],
          description: 'b is the sum of m and o and therefore must be greater than a:',
        },
      },
    },
    mods: {
      scenarios: {
        default: { position: [2, y] },
      },
    },
  });

  const nav = (name, y) => ({
    name,
    method: 'addNavigator',
    options: {
      navType: 'description',
      equation: eqn(`${name}Eqn`, y),
      interactive: false,
    },
    mods: {
      scenarios: {
        default: { position: [0.5, y] },
      },
    },
  });


  const longestSideExample = {
    name: 'longestExample',
    method: 'polyLine',
    options: {
      width: width * 0.7,
      close: true,
      color: colors.sides,
      angle: [
        angle('', 0),
        angle('a', 0.2),
        angle('', 0),
      ],
      side: [
        side(''),
        side(''),
        side('A'),
      ],
      points: [[-2, -0.25], [0, 0.25], [2, -0.25]],
    },
    mods: {
      scenarios: {
        default: { position: [0, 0.4] },
      },
    },
  };

  const shortestSideExample = {
    name: 'shortestExample',
    method: 'polyLine',
    options: {
      width: width * 0.7,
      close: true,
      color: colors.sides,
      angle: [
        angle('', 0),
        angle('', 0),
        angle('a', 0.5),
      ],
      side: [
        side('A'),
        side(''),
        side(''),
      ],
      points: [[-2, -0.5], [-2, 0.5], [2, 0]],
    },
    mods: {
      scenarios: {
        default: { position: [0, -1] },
      },
    },
  };

  layout.addElements = [
    longestSideExample,
    shortestSideExample,
    fig,
    nav('0', 0.5),
    nav('1', 0),
    nav('2', -0.5),
    nav('3', -1),
    nav('4', -1.5),
  ];
  return layout;
}
