// @flow
import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

const {
  Point,
  // Transform,
  polarToRect,
} = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();

  const width = 0.01;
  const rad = 1.1;
  const position = [0, -0.2];
  layout.area = {
    positions: {
      low: [0, -0.5],
      middle: [0, 0],
    },
  };
  const circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      radius: rad,
      sides: 100,
      width: width * 3,
      color: layout.colors.sides,
      position,
    },
  };

  const area = {
    name: 'area',
    method: 'collection',
    addElements: [
      {
        name: 'fill',
        method: 'polygon',
        options: {
          radius: rad,
          sides: 100,
          fill: true,
          color: layout.colors.areaPoly,
        },
      },
      {
        name: 'label',
        method: 'text',
        options: {
          text: 'Area = ?',
          color: layout.colors.sides,
          size: 0.18,
          position: [0, -0.4],
        },
      },
    ],
    options: {
      position,
    },
  };

  const radius = {
    name: 'radius',
    method: 'line',
    options: {
      vertexSpaceStart: 'start',
      length: rad - width,
      width: width * 3,
      angle: 0,
      color: layout.colors.radius,
      label: {
        text: 'r = ?',
        location: 'top',
        orientation: 'horizontal',
        offset: 0.07,
        scale: 0.9,
      },
      position,
    },
  };

  const diameter = {
    name: 'diameter',
    method: 'line',
    options: {
      vertexSpaceStart: 'center',
      length: (rad - width) * 2,
      width: width * 3,
      angle: 0,
      color: layout.colors.radius,
      label: {
        text: 'd = ?',
        location: 'top',
        orientation: 'horizontal',
        offset: 0.07,
        scale: 0.9,
      },
      position,
    },
  };

  const circumference = {
    name: 'circumference',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polygon',
        options: {
          radius: rad * 1.2,
          sides: 100,
          sidesToDraw: 100 * 0.99,
          width: width * 0.9,
          color: layout.colors.radius,
        },
      },
      {
        name: 'arrow',
        method: 'arrow',
        options: {
          width: width * 7,
          height: width * 7,
          legWidth: 0,
          legHeight: 0,
          rotation: Math.PI,
          position: new Point(rad * 1.2 - width * 0.45, -width),
          color: layout.colors.radius,
          tip: new Point(0, 0),
        },
      },
      {
        name: 'label',
        method: 'text',
        options: {
          text: 'Circumference = ?',
          color: layout.colors.radius,
          hAlign: 'left',
          vAlign: 'bottom',
          size: 0.18,
          position: polarToRect(rad * 1.3, 1),
        },
      },
    ],
    options: {
      position,
    },
  };

  layout.addElementsQuiz = [
    area,
    circle,
    radius,
    diameter,
    circumference,
  ];
  return layout;
}
