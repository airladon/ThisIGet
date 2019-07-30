// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

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

  // const angle = text => ({
  //   color: colors.angles,
  //   curve: {
  //     radius: 0.4,
  //     width: layout.width,
  //     sides: 200,
  //   },
  //   label: {
  //     text,
  //     scale: 0.8,
  //   },
  // });

  // const side = text => ({
  //   color: colors.sides,
  //   label: {
  //     text,
  //     scale: 0.8,
  //     offset: 0.1,
  //     location: 'outside',
  //   },
  // });

  // const triangle = {
  //   method: 'polyLine',
  //   options: {
  //     points: [
  //       [0.7, 0.8],
  //       [1, -0.7],
  //       [-1.2, -0.7],
  //     ],
  //     width: layout.width,
  //     color: colors.sides,
  //     close: true,
  //     angle: [
  //       angle('c'),
  //       angle('b'),
  //       angle('a'),
  //     ],
  //     side: [
  //       side('A'),
  //       side('B'),
  //       side('C'),
  //     ],
  //   },
  //   mods: {
  //     scenarios: {
  //       left: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
  //       right: { position: [1.4, -0.3], rotation: 0, scale: 1 },
  //       summaryLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
  //       summaryRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
  //       summaryTri1: { position: [1, 0.2], rotation: 0, scale: 1 },
  //       qrLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
  //       qrRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
  //       qrLeftAaa: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
  //       qrRightAaa: { position: [1.4, -0.3], rotation: 0, scale: 0.7 },
  //       mirror: { position: [1.4, -0.3], rotation: 0, scale: [-1, 1] },
  //       rotate: { position: [1.4, -0.3], rotation: Math.PI, scale: 1 },
  //       lowLeft: { position: [-1.4, -0.5], rotation: 0, scale: 0.9 },
  //       rightLeft: { position: [1.4, -0.5], rotation: 0, scale: 0.9 },
  //     },
  //   },
  // };

  // layout.tri1 = joinObjects({}, triangle, { name: 'tri1' });
  // layout.tri2 = joinObjects({}, triangle, {
  //   name: 'tri2',
  //   mods: {
  //     interactiveLocation: [0.7, 0.8],
  //   },
  // });

  // layout.congruentTriangles = {
  //   name: 'congruentTriangles',
  //   method: 'collection',
  //   addElements: [
  //     layout.tri1,
  //     layout.tri2,
  //   ],
  // };

  // layout.addElements = [
  //   layout.congruentTriangles,
  // ];

  // layout.label = {
  //   position: new Point(1, -1),
  // };

  // /////////////////////////////////////////////////////////////////
  // SSS
  // /////////////////////////////////////////////////////////////////
  layout.sssPosition = new Point(0, -0.3);
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
  // const height = leftLen * Math.sin(Math.PI / 6);
  const base = joinObjects({}, sssLineBase, {
    name: 'base',
    options: {
      length: hypotenuse,
      label: {
        text: 'C',
        offset: 0.1,
        location: 'outside',
        // subLocation: 'left',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [0, -hypotenuse / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: 0 },
      },
    },
  });

  const left = joinObjects({}, sssLineBase, {
    name: 'left',
    options: {
      length: leftLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
      label: {
        text: 'A',
        offset: 0.1,
        location: 'outside',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [-1, -leftLen / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
        top: { position: [-hypotenuse / 2, 0], rotation: Math.PI / 6 },
        bottom: { position: [-hypotenuse / 2, 0], rotation: -Math.PI / 6 },
        default: { position: [-hypotenuse / 2, 0], rotation: Math.PI / 6 },
      },
    },
  });

  const right = joinObjects({}, sssLineBase, {
    name: 'right',
    options: {
      length: rightLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
      label: {
        text: 'B',
        offset: 0.1,
        location: 'top',
        subLocation: 'left',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [1, -rightLen / 2], rotation: Math.PI / 2 },
        center: { position: [hypotenuse / 2, 0], rotation: Math.PI / 3 },
        top: { position: [hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
        bottom: { position: [hypotenuse / 2, 0], rotation: Math.PI + Math.PI / 3 },
        default: { position: [hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
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
        center: { position: [-hypotenuse / 2, 0], rotation: 0, scale: [1, 1] },
        flip: { position: [hypotenuse / 2, 0], rotation: 0, scale: [-1, 1] },
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
        center: { position: [hypotenuse / 2, 0], rotation: 0, scale: [1, 1] },
        flip: { position: [-hypotenuse / 2, 0], rotation: 0, scale: [-1, 1] },
      },
    },
  };

  const leftBottom = joinObjects({}, left, {
    name: 'leftBottom',
    options: {
      label: {
        location: 'bottom',
      },
    },
    mods: {
      scenarios: {
        default: { position: [-hypotenuse / 2, 0], rotation: -Math.PI / 6 },
      },
    },
  });

  const rightBottom = joinObjects({}, right, {
    name: 'rightBottom',
    options: {
      label: {
        location: 'bottom',
      },
    },
    mods: {
      scenarios: {
        default: { position: [hypotenuse / 2, 0], rotation: Math.PI + Math.PI / 3 },
      },
    },
  });

  const tri = (name, scale) => ({
    name,
    method: 'polyLine',
    options: {
      close: true,
      points: [
        [-hypotenuse / 2, scale * layout.width / 5],
        [hypotenuse / 2,  scale * layout.width / 5],
        [
          -hypotenuse / 2 + leftLen * Math.cos(Math.PI / 6),
          scale * leftLen * Math.sin(Math.PI / 6),
        ],
      ],
      width: layout.width,
      color: colors.sides,
      borderToPoint: 'always',
    },
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: [1, 1] },
      },
    },
  });

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
    rightCircle,
    leftCircle,
    // anyCircleLeft,
    left,
    right,
    base,
    leftBottom,
    rightBottom,
    // scaleLeft,
    // moveLeft,
    moveCirc('circ1', leftLen, [-hypotenuse / 2, 0]),
    moveCirc('circ2', rightLen, [hypotenuse / 2, 0]),
    moveRadius('rad1', [-hypotenuse / 2, 0], 2),
    moveRadius('rad2', [hypotenuse / 2, 0], 1),
    movePad('pad1', [-hypotenuse / 2, 0]),
    movePad('pad2', [hypotenuse / 2, 0]),
    baseLine,
    tri('flipTri', -1),
    tri('fixedTri', 1),
  ];
  return layout;
}
