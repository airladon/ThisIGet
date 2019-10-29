// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue', 'base').rgb;
  colors.highlight = colors.get('red').rgb;
  colors.grey = colors.get('grey', 'base').rgb;
  colors.darkGrey = colors.get('grey', 'darker').rgb;
  colors.circle = colors.get('red', 'base').rgb;
  colors.quad = colors.get('green', 'base').rgb;
  const points = [
    new Point(-1.5, -1).add(0.3, 0),
    new Point(0, 1).add(0.3, 0),
    new Point(0.5, -1).add(0.3, 0),
  ];

  // *****************************************************************
  // *****************************************************************
  // *****************************************************************
  const makeCircle = name => ({
    name,
    method: 'polygon',
    options: {
      color: colors.circle,
      sides: 100,
      width: 0.02,
      radius: 0.8,
      // transform: new Transform().scale(s, s).translate(0, 0),
    },
    mods: {
      scenarios: {
        small: { scale: 0.4, position: [-2, 0.5] },
        overlay: { scale: 0.4, position: [-2, -0.8] },
        large: { scale: 0.8, position: [-2, -0.8] },
      },
    },
  });

  const makeTri = name => ({
    name,
    method: 'polyLine',
    options: {
      points: [
        [-1, -0.8],
        [0.6, -0.8],
        [0.2, 0.8],
      ],
      width: 0.02,
      color: colors.sides,
      close: true,
    },
    mods: {
      scenarios: {
        small: { scale: 0.4, position: [0, 0.5] },
        overlay: { scale: 0.4, position: [0, -0.9] },
        large: { scale: 0.8, position: [0, -0.8] },
      },
    },
  });

  const makeQuad = name => ({
    name,
    method: 'polyLine',
    options: {
      points: [
        [-1, -0.8],
        [0.8, -0.4],
        [0.4, 0.8],
        [-0.8, 0.4],
      ],
      width: 0.02,
      color: colors.quad,
      close: true,
    },
    mods: {
      scenarios: {
        small: { scale: 0.4, position: [2, 0.5] },
        overlay: { scale: 0.4, position: [2, -0.8] },
        large: { scale: 0.8, position: [2, -0.8] },
      },
    },
  });

  const circ1 = makeCircle('circ1');
  const circ2 = makeCircle('circ2');
  const tri1 = makeTri('tri1');
  const tri2 = makeTri('tri2');
  const quad1 = makeQuad('quad1');
  const quad2 = makeQuad('quad2');

  const examples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      circ1,
      circ2,
      tri1,
      tri2,
      quad1,
      quad2,
    ]
  }
  // *****************************************************************
  // *****************************************************************
  // *****************************************************************

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points,
      color: colors.sides,
      close: true,
      width: 0.02,
      side: [
        side('A'),
        side('C'),
        side('B'),
      ],
    },
    mods: {
      move: {
        type: 'scale',
      },
      touchInBoundingRect: true,
    },
  };

  // const ball = {
  //   name: 'ball',
  //   method: 'polygon',
  //   options: {
  //     sides: 10,
  //     fill: true,
  //     color: colors.sides,
  //     radius: 1,
  //   },
  //   mods: {
  //     move: {
  //       type: 'scale',
  //     },
  //   },
  // };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      tri,
      // ball,
    ],
    mods: {
      scenarios: {
        left: { position: [-1.2, -0.3] },
        center: { position: [0.5, -0.3] },
      },
    },
  };

  layout.addElements = [
    fig,
    examples,
  ];
  return layout;
}
