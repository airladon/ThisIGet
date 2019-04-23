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

  const hypotenuse = 1.5;
  const leftLen = hypotenuse * Math.sin(Math.PI / 3);
  const RightLen = hypotenuse * Math.sin(Math.PI / 6);
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
      length: RightLen,
    },
    mods: {
      scenarios: {
        initial: { position: [1, -RightLen / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
      },
    },
  });


  layout.addElements = [
    base,
    left,
    right,
  ];
  return layout;
}
