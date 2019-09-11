// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig;

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
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.02;

  // /////////////////////////////////////////////////////////////////
  // SSS
  // /////////////////////////////////////////////////////////////////
  layout.sssPosition = new Point(0, 0);
  const sssLineBase = {
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
  layout.defaultLen = leftLen;
  layout.hypotenuse = hypotenuse;

  const moveCirc = (name, r, defPos) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polygon',
        options: {
          width: 3,
          color: colors.construction,
          sides: 200,
          radius: leftLen,
          linePrimitives: true,
        },
      },
      {
        name: 'center',
        method: 'polygon',
        options: {
          width: 3,
          color: colors.construction,
          sides: 20,
          radius: 0.07,
          fill: true,
        },
      },
      {
        name: 'scale',
        method: 'polygon',
        options: {
          color: [1, 1, 1, 0.001],
          sides: 50,
          radius: leftLen * 1.2,
          fill: true,
        },
        mods: {
          move: {
            type: 'scale',
            minTransform: new Transform().scale(0.3, 0.3).rotate(0).translate(-1000, -1000),
            maxTransform: new Transform().scale(1, 1).rotate(0).translate(1000, 1000),
          },
          scenarios: {
            center: { position: [0, 0], rotation: 0, scale: r / leftLen },
          },
          interactiveLocation: [0, leftLen],
        },
      },
    ],
    mods: {
      scenarios: {
        center: { position: defPos, rotation: 0, scale: 1 },
      },
    },
  });

  const movePad = (name, defPos) => ({
    name,
    method: 'polygon',
    options: {
      color: [1, 0, 0, 0.001],
      sides: 50,
      radius: 0.2,
      fill: true,
    },
    mods: {
      move: {
        type: 'translate',
        minTransform: new Transform().scale(1, 1).rotate(0).translate(-2, 0),
        maxTransform: new Transform().scale(1, 1).rotate(0).translate(2, 0),
      },
      scenarios: {
        center: { position: defPos, rotation: 0, scale: 1 },
      },
    },
  });

  const moveRadius = (name, defPos, defRot) => joinObjects({}, sssLineBase, {
    name,
    options: {
      length: leftLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
    },
    mods: {
      scenarios: {
        center: { position: defPos, rotation: defRot, scale: 1 },
      },
      interactiveLocation: [leftLen * 0.8, 0],
    },
  });

  const baseLine = joinObjects({}, sssLineBase, {
    name: 'baseLine',
  });

  layout.addElementsSSS = [
    moveCirc('circ1', leftLen, [-hypotenuse / 2, 0]),
    moveCirc('circ2', rightLen, [hypotenuse / 2, 0]),
    moveRadius('rad1', [-hypotenuse / 2, 0], 2),
    moveRadius('rad2', [hypotenuse / 2, 0], 1),
    movePad('pad1', [-hypotenuse / 2, 0]),
    movePad('pad2', [hypotenuse / 2, 0]),
    baseLine,
  ];
  return layout;
}
