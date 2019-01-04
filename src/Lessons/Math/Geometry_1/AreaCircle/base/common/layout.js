// @flow
import Fig from 'figureone';
import baseLayout from '../../../../LessonsCommon/layout';

const { Point, Transform, polarToRect } = Fig.tools.g2;

const cssColorNames = [
  'lines',
  'areaTri',
  'areaTriLabel',
  'areaPoly',
  'areaPolyLabel',
  'areaCircle',
  'areaCircleLabel',
  'height',
  'border',
  'radius',
  'circumference',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.position = new Point(0, -0.4);
  const width = 0.015;

  layout.grid = {
    position: new Point(0, 0),
    smallPosition: new Point(0, 0),
    spacing: 0.25,
    length: 2.5,
    height: 2.5,
  };

  layout.collection = {
    scenarios: {
      center: {
        position: new Point(0, -0.4),
      },
      left: {
        position: new Point(-1, -0.4),
      },
    },
  };

  layout.polygonSides = [
    6,
    10,
    50,
  ];

  layout.circle = {
    default: {
      radius: 1.25,
      sides: 100,
      width: width * 2,
      transform: new Transform(),
    },
    circle: {
      color: layout.colors.lines,
    },
    fill: {
      fill: true,
      color: layout.colors.areaCircle,
    },
    back: {
      color: layout.colors.circumference,
      width,
    },
    radiusLine: {
      vertexSpaceStart: 'start',
      length: 1.25 - width,
      width,
      angle: -Math.PI * 2 / layout.polygonSides[2] / 2,
      color: layout.colors.radius,
      label: {
        text: 'r',
        location: 'top',
        orientation: 'horizontal',
        offset: -0.02,
      },
    },
  };

  layout.polygon = {
    default: {
      radius: layout.circle.default.radius - layout.circle.back.width,
      width,
      transform: new Transform('poly'),
    },
    polygon: {
      color: layout.colors.lines,
    },
    border: {
      color: layout.colors.border,
    },
    fill: {
      fill: true,
      color: layout.colors.areaPoly,
    },
  };

  layout.radialLines = {
    lines: sideNum => ({
      innerRadius: 0,
      outerRadius: layout.circle.default.radius - layout.circle.back.width,
      width: width / 2,
      angleStep: Math.PI * 2 / sideNum,
      color: layout.colors.lines,
      transform: new Transform('lines'),
    }),
  };

  layout.triangle = {
    height: (sideNum) => {
      const { radius } = layout.polygon.default;
      const heightDimension = radius * Math.cos(Math.PI * 2 / sideNum / 2);
      return {
        vertexSpaceStart: 'start',
        length: heightDimension,
        angle: -Math.PI * 2 / sideNum / 2,
        width,
        color: layout.colors.height,
        label: {
          text: 'h',
          location: 'top',
          orientation: 'horizontal',
          offset: 0.02,
          // linePosition: 0.5 + 0.4 * sideNum / Math.max(...layout.polygonSides),
        },
      };
    },
    base: (sideNum) => {
      const { radius } = layout.polygon.default;
      const w = layout.polygon.default.width;
      const heightDimension = radius * Math.cos(Math.PI * 2 / sideNum / 2);
      return {
        vertexSpaceStart: 'start',
        p1: polarToRect(radius - w / 2, 0),
        p2: polarToRect(radius - w / 2, -Math.PI * 2 / sideNum),
        width,
        color: layout.colors.border,
        label: {
          text: 'b',
          location: 'right',
          orientation: 'horizontal',
          offset: 0.02,
        },
        arrows: {},
        offset: radius * 1.1 - heightDimension,
      };
    },
    fill: (sideNum) => {
      const { radius } = layout.polygon.default;
      const w = layout.polygon.default.width;
      return {
        points: [
          new Point(0, 0),
          polarToRect(radius - w / 2, 0),
          polarToRect(radius - w / 2, -Math.PI * 2 / sideNum),
        ],
        color: layout.colors.areaTri,
        transform: new Transform().rotate(0),
      };
    },
  };

  layout.triangleAreaEquation = new Point(2.5, 0);
  layout.borderEquation = new Point(2.8, 0.6);

  layout.selector = {
    position: new Point(0, -1.4),
  };
  return layout;
}
