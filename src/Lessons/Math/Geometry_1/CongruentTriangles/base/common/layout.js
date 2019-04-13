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

  // const aaaAngle = (name, rc, rt) => ({
  //   {
  //     name,
  //     method: 'angle',
  //     options: {
  //     color: colors.angles,
  //     curve: {
  //       radius: rc,
  //       width: layout.width,
  //     },
  //     sides: 200,
  //     label: {
  //       text: null,
  //       showRealAngle: true,
  //       precision: 0,
  //       radius: rt,
  //     },
  //   }
  // });

  // layout.aaaLeft = aaaAngle('corner1', 0.3, 0.3);
  // layout.aaaTop = aaaAngle('corner1', 0.3, 0.4);
  // layout.aaaRight = aaaAngle('corner1', 0.3, 0.3);
  layout.aaa = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout.aaaTri,
      // layout.aaaLeft,
      // layout.aaaTop,
      // layout.aaaRight,
    ],
  };

  layout.addElementsAAA = [
    layout.aaa,
  ];
  // ],
  //   AAA: {
  //     c1: {
  //       angle: Math.PI / 6,
  //       scenario: { position: new Point(-2, -1), rotation: 0 },
  //       side: 3,
  //       limitLine: new Line(new Point(-2.2, -1), new Point(-1, -1)),
  //     },
  //     c2: {
  //       angle: Math.PI / 3,
  //       scenario: { position: new Point(2, -1), rotation: Math.PI / 3 * 2 },
  //       side: 2,
  //       limitLine: new Line(new Point(2.2, -1), new Point(1, -1)),
  //     },
  //     c3: {
  //       angle: Math.PI / 2,
  //       scenario: {
  //         position: new Point(1, 2 * (Math.sqrt(3) / 2 - 0.5)),
  //         rotation: Math.PI / 6 * 7,
  //       },
  //       side: 0.5,
  //       limitLine: null,
  //     },
  //   },
  return layout;
}
