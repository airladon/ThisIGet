// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'pads',
  'disabled',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.position = [0, -0.3];
  const { colors } = layout;
  layout.width = 0.02;

  const line = {
    method: 'line',
    options: {
      color: colors.sides,
      width: layout.width,
      vertexSpaceStart: 'start',
    },
  };

  const hypotenuse = 1.7;
  const leftLen = hypotenuse * Math.sin(Math.PI / 3);
  const rightLen = hypotenuse * Math.sin(Math.PI / 6);
  const base = joinObjects({}, line, {
    name: 'base',
    options: {
      length: hypotenuse,
    },
    mods: {
      scenarios: {
        initial: { position: [0, -hypotenuse / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: 0 },
      },
    },
  });

  const left = joinObjects({}, line, {
    name: 'left',
    options: {
      length: leftLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
    },
    mods: {
      scenarios: {
        initial: { position: [-1, -leftLen / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
      },
    },
  });

  const right = joinObjects({}, line, {
    name: 'right',
    options: {
      length: rightLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
    },
    mods: {
      scenarios: {
        initial: { position: [1, -rightLen / 2], rotation: Math.PI / 2 },
        center: { position: [hypotenuse / 2, 0], rotation: Math.PI / 3 },
      },
    },
  });

  const leftCircle = {
    name: 'leftCircle',
    method: 'polygon',
    options: {
      width: layout.width / 2,
      color: colors.construction,
      sides: 200,
      radius: leftLen,
    },
    mods: {
      scenarios: {
        center: { position: [-hypotenuse / 2, 0], rotation: 0 },
      },
    },
  };
  const rightCircle = {
    name: 'rightCircle',
    method: 'polygon',
    options: {
      width: layout.width / 2,
      color: colors.construction,
      sides: 200,
      radius: rightLen,
    },
    mods: {
      scenarios: {
        center: { position: [hypotenuse / 2, 0], rotation: 0 },
      },
    },
  };


  layout.addElements = [
    leftCircle,
    rightCircle,
    base,
    left,
    right,
  ];
  return layout;
}
