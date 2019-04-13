// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'pads',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.02;

  const angle = (text) => {
    return {
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
    };
  };

  const side = (text) => {
    return {
      color: colors.sides,
      label: {
        text,
        scale: 0.8,
        offset: 0.1,
        location: 'outside',
      },
    };
  };

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
        angle('c'),
        angle('b'),
        angle('a'),
      ],
      side: [
        side('A'),
        side('B'),
        side('C'),
      ],
    },
    mods: {
      scenarios: {
        left: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
        right: { position: [1.4, -0.3], rotation: 0, scale: 1 },
        mirror: { position: [1.4, -0.3], rotation: 0, scale: [-1, 1] },
        rotate: { position: [1.4, -0.3], rotation: Math.PI, scale: 1 },
      },
    },
  };

  layout.tri1 = joinObjects({}, triangle, { name: 'tri1' });
  layout.tri2 = joinObjects({}, triangle, {
    name: 'tri2',
    mods: {
      interactiveLocation: [0.7, 0.8],
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
    layout.congruentTriangles,
  ];

  // /////////////////////////////////////////////////////////////////
  // AAA
  // /////////////////////////////////////////////////////////////////
  const aaaAngle = (rc, rt) => ({
    color: colors.angles,
    curve: {
      radius: rc,
      width: layout.width,
    },
    sides: 200,
    label: {
      text: null,
      showRealAngle: true,
      precision: 0,
      radius: rt,
    },
  });

  const aaaPad = () => ({
    color: colors.pads,
    isMovable: true,
    sides: 20,
    radius: 0.07,
    touchRadius: 0.8,
    fill: true,
  });


  layout.aaaTri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
      ],
      color: colors.sides,
      width: layout.width,
      close: true,
      angle: [
        aaaAngle(0.3, 0.4),
        aaaAngle(0.3, 0.3),
        aaaAngle(0.3, 0.3),
      ],
      pad: [
        aaaPad(),
        aaaPad(),
        aaaPad(),
      ],
    },
  };


  layout.aaa = {
    name: 'fig',
    method: 'collection',
    options: {
      position: [0, -0.3],
    },
    addElements: [
      layout.aaaTri,
    ],
  };

  layout.addElementsAAA = [
    layout.aaa,
  ];

  // /////////////////////////////////////////////////////////////////
  // SAS
  // /////////////////////////////////////////////////////////////////
  const movablePad = (moveable) => {
    if (moveable) {
      return {
        color: colors.pads,
        isMovable: true,
        sides: 20,
        radius: 0.07,
        touchRadius: 0.3,
        fill: true,
        boundary: 'diagram',
        touchRadiusInBoundary: false,
      };
    }
    return {
      color: colors.diagram.background,
      radius: 0.01,
      touchRadius: 0.01,
    };
  };
  layout.sas = {
    name: 'fig',
    method: 'polyLine',
    options: {
      position: [0, 0],
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
      ],
      color: colors.sides,
      width: layout.width,
      close: false,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.4,
          width: layout.width,
          sides: 100,
        },
        label: {
          text: null,
          showRealAngle: true,
          precision: 0,
          radius: 0.4,
        },
      },
      side: {
        offset: 0.1,
        label: {
          text: null,
        },
      },
      pad: [
        movablePad(true),
        movablePad(false),
        movablePad(false),
        movablePad(false),
      ],
    },
  };

  layout.addElementsSAS = [
    layout.sas,
  ];

  // /////////////////////////////////////////////////////////////////
  // ASA
  // /////////////////////////////////////////////////////////////////
  layout.asa = {
    name: 'fig',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
      ],
      color: colors.sides,
      width: layout.width,
      close: false,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.4,
          width: layout.width,
          sides: 100,
        },
        label: {
          text: null,
          showRealAngle: true,
          precision: 0,
          radius: 0.4,
        },
      },
      side: {
        offset: 0.1,
        label: {
          text: null,
        },
      },
      pad: [
        movablePad(true),
        movablePad(false),
        movablePad(false),
        movablePad(true),
      ],
    },
  };

  layout.addElementsASA = [
    layout.asa,
  ];

  return layout;
}
