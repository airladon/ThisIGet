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
  'lines',
  'angle1',
  'angle2',
  'angle3',
  'disabled',
  'parallel',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.03;
  const exampleTri = {
    method: 'polyLine',
    options: {
      width: layout.width,
      color: colors.lines,
      close: true,
    },
  };

  const tri1 = joinObjects({}, exampleTri, {
    name: 'tri1',
    options: {
      points: [
        [-0.5, -0.5],
        [0, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-1.7, 0),
    },
  });

  const tri2 = joinObjects({}, exampleTri, {
    name: 'tri2',
    options: {
      points: [
        [-0.5, -0.5],
        [0.5, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-0.15, 0),
    },
  });

  const tri3 = joinObjects({}, exampleTri, {
    name: 'tri3',
    options: {
      points: [
        [-0.3, -0.5],
        [-0.8, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(1.7, 0),
    },
  });

  const triangleExamples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      tri1,
      tri2,
      tri3,
    ],
  };

  layout.addElements = [
    triangleExamples,
  ];
  return layout;
}
