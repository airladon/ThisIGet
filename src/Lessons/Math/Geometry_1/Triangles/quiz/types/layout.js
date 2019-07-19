// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'angles',
  'pads',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  layout.width = 0.03;
  // const exampleTri = {
  //   method: 'polyLine',
  //   options: {
  //     width: layout.width,
  //     color: colors.lines,
  //     close: true,
  //   },
  // };

  // const tri1 = joinObjects({}, exampleTri, {
  //   name: 'tri1',
  //   options: {
  //     points: [
  //       [-0.5, -0.5],
  //       [0, 0.5],
  //       [0.5, -0.5],
  //     ],
  //     position: new Point(-1.7, 0),
  //   },
  // });

  // const tri2 = joinObjects({}, exampleTri, {
  //   name: 'tri2',
  //   options: {
  //     points: [
  //       [-0.5, -0.5],
  //       [0.5, 0.5],
  //       [0.5, -0.5],
  //     ],
  //     position: new Point(-0.15, 0),
  //   },
  // });

  // const tri3 = joinObjects({}, exampleTri, {
  //   name: 'tri3',
  //   options: {
  //     points: [
  //       [-0.3, -0.5],
  //       [-0.8, 0.5],
  //       [0.5, -0.5],
  //     ],
  //     position: new Point(1.7, 0),
  //   },
  // });

  // const triangleExamples = {
  //   name: 'examples',
  //   method: 'collection',
  //   addElements: [
  //     tri1,
  //     tri2,
  //     tri3,
  //   ],
  // };

  // ////////////////////////////////////////////////////////
  //   Variable Triangle
  // ////////////////////////////////////////////////////////
  layout.defaultTri = [
    [2, -1.1],
    [-2, -1.1],
    [-1, 0.7],
  ];
  layout.customTriangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      pad: {
        color: [1, 1, 1, 0.01],
        radius: 0.3,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.9, -1.6, 5.8, 3],
      },
      // angle: {
      //   color: colors.angles,
      //   curve: {
      //     radius: 0.3,
      //     width: layout.width,
      //   },
      //   autoRightAngle: false,
      // },
      // side: {
      //   offset: 0.3,
      //   color: colors.sideLengths,
      //   showLine: true,
      //   width: layout.width / 2,
      //   vertexSpaceStart: 'center',
      //   arrows: {
      //     width: 0.08,
      //     height: 0.08,
      //   },
      // },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        label: {
          radius: 0.31,
        },
        autoRightAngle: false,
      },
      side: {
        label: {
          // text: '',
          offset: 0.1,
          precision: 2,
        },
      },
    },
    // mods: {
    //   _pad0: { scenarios: { props: { position: layout.defaultTri[0] } } },
    //   _pad1: { scenarios: { props: { position: layout.defaultTri[1] } } },
    //   _pad2: { scenarios: { props: { position: layout.defaultTri[2] } } },
    // },
  };

  // ////////////////////////////////////////////////////////
  //   Triangle Types
  // ////////////////////////////////////////////////////////
  // layout.triangleTypes = {
  //   name: 'triangleType',
  //   method: 'polyLine',
  //   options: {
  //     points: layout.defaultTri,
  //     close: true,
  //     color: colors.lines,
  //     width: layout.width,
  //     pad: {
  //       color: colors.diagram.background,
  //       radius: 0.2,
  //       sides: 30,
  //       fill: true,
  //       isMovable: true,
  //       touchRadius: 0.4,
  //       boundary: [-2.5, -1.7, 5, 3],
  //     },
  //     angle: {
  //       color: colors.angles,
  //       curve: {
  //         radius: 0.3,
  //         width: layout.width,
  //       },
  //       label: {
  //         radius: 0.31,
  //       },
  //       autoRightAngle: true,
  //     },
  //     side: {
  //       label: {
  //         // text: '',
  //         offset: 0.1,
  //       },
  //     },
  //   },
  //   mods: {
  //     scenarios: {
  //       left: { position: [1, 0.3], scale: 0.8 },
  //     },
  //   },
  // };

  // layout.typeDefinition = {
  //   name: 'definition',
  //   method: 'textHTML',
  //   options: {
  //     // size: 0.15,
  //     // color: colors.diagram.text.base,
  //     id: 'triangle_type_definition',
  //     text: 'test',
  //     alignV: 'top',
  //     alignH: 'center',
  //     position: [1.3, -0.8],
  //   },
  // };

  layout.addElements = [
    // layout.typeDefinition,
    // triangleExamples,
    layout.customTriangle,
    // layout.totalAngle,
    // layout.triangleTypes,
  ];
  return layout;
}
