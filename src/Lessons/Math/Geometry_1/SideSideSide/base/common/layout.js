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
        location: 'top',
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
  )
  const intersectBottom = new Point(
    -hypotenuse / 2 + leftLen * Math.cos(Math.PI / 6),
    height,
  )
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
      radius: 0.3,
      curve: {
        width: layout.width,
        sides: 100,
      },
      label: {
        text,
        radius: 0.31,
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
    'angleTopRight', 'a', intersectTop, -Math.PI / 2, Math.PI / 6,
  );
  const angleBottomRight = angle(
    'angleBottomRight', 'a', intersectBottom, Math.PI / 3, Math.PI / 6,
  );

  layout.addElements = [
    leftCircle,
    rightCircle,
    angleTopLeft,
    angleBottomLeft,
    angleTopRight,
    angleBottomRight,
    constructionLine,
    base,
    left,
    right,
    leftBottom,
    rightBottom,
  ];
  return layout;
}
