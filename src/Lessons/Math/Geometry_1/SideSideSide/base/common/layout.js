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
  const height = leftLen * Math.sin(Math.PI / 6);
  const base = joinObjects({}, line, {
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

  const left = joinObjects({}, line, {
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

  const right = joinObjects({}, line, {
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

  const intersectTop = new Point(
    -hypotenuse / 2 + leftLen * Math.cos(Math.PI / 6),
    height,
  );
  const intersectBottom = new Point(
    -hypotenuse / 2 + leftLen * Math.cos(Math.PI / 6),
    -height,
  );

  const constructionLine = {
    name: 'constructionLine',
    method: 'line',
    options: {
      width: layout.width,
      color: colors.sides,
      length: height * 2,
      vertexSpaceStart: 'start',
    },
    mods: {
      scenarios: {
        default: {
          position: intersectTop,
          rotation: -Math.PI / 2,
        },
      },
    },
  };

  const angle = (name, text, position, rotation, angle) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      curve: {
        width: layout.width,
        sides: 100,
        radius: 0.4,
      },
      label: {
        text,
        radius: 0.35,
      },
      angle,
    },
    mods: {
      scenarios: {
        default: {
          position,
          rotation,
        },
      },
    },
  });

  const angleTopLeft = angle(
    'angleTopLeft', 'a', intersectTop, Math.PI + Math.PI / 6, Math.PI / 3,
  );
  const angleBottomLeft = angle(
    'angleBottomLeft', 'a', intersectBottom, Math.PI / 2, Math.PI / 3,
  );

  const angleTopRight = angle(
    'angleTopRight', 'b', intersectTop, -Math.PI / 2, Math.PI / 6,
  );
  const angleBottomRight = angle(
    'angleBottomRight', 'b', intersectBottom, Math.PI / 3, Math.PI / 6,
  );
  const angleTop = angle(
    'angleTop', 'a + b', intersectTop, Math.PI + Math.PI / 6, Math.PI / 2,
  );
  const angleBottom = angle(
    'angleBottom', 'a + b', intersectBottom, Math.PI / 3, Math.PI / 2,
  );

  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  const angleCongruent = text => ({
    color: colors.angles,
    curve: {
      radius: 0.4,
      width: layout.width,
      sides: 200,
    },
    label: {
      text,
      scale: 0.8,
    },
  });

  const sideCongruent = text => ({
    color: colors.sides,
    label: {
      text,
      scale: 0.8,
      offset: 0.1,
      location: 'outside',
    },
  });

  const triangle = {
    method: 'polyLine',
    options: {
      points: [
        [0.7, 0.8],
        [1, -0.7],
        [-1.2, -0.7],
      ],
      width: layout.width,
      color: colors.sides,
      close: true,
      angle: [
        angleCongruent('c'),
        angleCongruent('b'),
        angleCongruent('a'),
      ],
      side: [
        sideCongruent('A'),
        sideCongruent('B'),
        sideCongruent('C'),
      ],
    },
    mods: {
      scenarios: {
        default: { position: [-1.4, -0.1], rotation: 0, scale: 1 },
      },
    },
  };

  layout.tri1 = joinObjects({}, triangle, { name: 'tri1' });
  layout.tri2 = joinObjects({}, triangle, {
    name: 'tri2',
    mods: {
      scenarios: {
        default: { position: [1.4, -0.1], rotation: 0, scale: 1 },
      },
    },
  });

  layout.congruentTriangles = {
    name: 'congruentTriangles',
    method: 'collection',
    addElements: [
      layout.tri1,
      layout.tri2,
    ],
  };
  layout.addElements = [
    leftCircle,
    rightCircle,
    angleTopLeft,
    angleBottomLeft,
    angleTopRight,
    angleBottomRight,
    angleTop,
    angleBottom,
    base,
    constructionLine,
    left,
    right,
    leftBottom,
    rightBottom,
    layout.congruentTriangles,
  ];
  return layout;
}
