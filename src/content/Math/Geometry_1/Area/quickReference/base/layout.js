// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  // Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrArea_sides = colors.get('blue').rgb;
  colors.qrArea_angles = colors.get('red').rgb;
  colors.qrArea_highlight = colors.get('red').rgb;
  colors.qrArea_grid = colors.get('grey', 'darker').rgb;
  colors.qrArea_gridLight = colors.get('grey', 'base').rgb;
  colors.qrArea_measure = colors.get('grey', 'base').rgb;
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const shapeCircle = {
    name: 'circle',
    method: 'polygon',
    options: {
      width: 0.03,
      color: colors.qrArea_sides,
      sides: 100,
      radius: 0.625,
      position: [-1.75, -0.37],
    },
  };
  const shapeSquare = {
    name: 'square',
    method: 'polygon',
    options: {
      width: 0.03,
      color: colors.qrArea_sides,
      sides: 4,
      radius: 0.89,
      rotation: Math.PI / 4,
      position: [0, -0.37],
    },
  };
  const shapeTriangle = {
    name: 'triangle',
    method: 'polygon',
    options: {
      width: 0.05,
      color: colors.qrArea_sides,
      sides: 3,
      radius: 0.84,
      rotation: -Math.PI / 6,
      position: [1.7, -0.58],
    },
  };
  const shapes = {
    name: 'shapes',
    method: 'collection',
    addElements: [
      shapeCircle,
      shapeSquare,
      shapeTriangle,
    ],
    options: {
      position: [0, 0.2],
    },
    mods: {
      scenarios: {
        summary: { position: [0, 0.4] },
      },
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////

  const gridL = 5;
  const gridW = 1.75;
  layout.grid = {
    length: gridL,
    height: gridW,
  };

  const measureAreaGrid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-2.5, -1.25, 5, 1.75),
      xStep: 0.25,
      yStep: 0.25,
      numLinesThick: 2,
      color: colors.qrArea_grid,
    },
  };

  const unitShape = {
    name: 'unitShape',
    method: 'collection',
    addElements: [
      measureAreaGrid,
    ],
    options: {
      position: [0, 0.2],
    },
    mods: {
      scenarios: {
        summary: { position: [0, 0.4] },
      },
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const rectWidth = 2.5;
  const rectHeight = 1.5;
  const rectGrid = 0.25;
  const rect = {
    name: 'line',
    method: 'polyLine',
    options: {
      points: [
        [-rectWidth / 2, -rectHeight / 2],
        [-rectWidth / 2, rectHeight / 2],
        [rectWidth / 2, rectHeight / 2],
        [rectWidth / 2, -rectHeight / 2],
      ],
      color: colors.qrArea_sides,
      width: 0.03,
      close: true,
    },
  };

  const label = (name, text, position) => ({
    name,
    method: 'text',
    options: {
      text,
      position,
      color: colors.qrArea_sides,
      size: 0.15,
    },
  });

  const rectangle = {
    name: 'rectangle',
    method: 'collection',
    addElements: [
      // rectangleGrid,
      rect,
      // row,
      label('labelB', 'B', [-rectWidth / 2 - 0.2, 0]),
      label('labelA', 'A', [0, -rectHeight / 2 - 0.2]),
      label('labelHeight', 'height', [-rectWidth / 2 - 0.3, 0]),
      label('labelWidth', 'width', [0, -rectHeight / 2 - 0.2]),
      label('label6', '6m', [-rectWidth / 2 - 0.3, 0]),
      label('label10', '10m', [0, -rectHeight / 2 - 0.2]),
    ],
    options: {
      position: [0, -0.3],
    },
    mods: {
      scenarios: {
        summary: { position: [0, 0], scale: 1.2 },
      },
    },
  };

  const squareLine = {
    name: 'line',
    method: 'polyLine',
    options: {
      points: [
        [-rectHeight / 2, -rectHeight / 2],
        [-rectHeight / 2, rectHeight / 2],
        [rectHeight / 2, rectHeight / 2],
        [rectHeight / 2, -rectHeight / 2],
      ],
      color: colors.qrArea_sides,
      width: 0.03,
      close: true,
    },
  };
  const squareGrid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-rectHeight / 2, -rectHeight / 2, rectHeight, rectHeight),
      xStep: rectGrid,
      yStep: rectGrid,
      color: colors.qrArea_grid,
    },
  };
  const square = {
    name: 'square',
    method: 'collection',
    addElements: [
      squareGrid,
      squareLine,
      label('labelB1', 'B', [-rectHeight / 2 - 0.2, 0]),
      label('labelB2', 'B', [0, -rectHeight / 2 - 0.2]),
    ],
    options: {
      position: [0, -0.3],
    },
    mods: {
      scenarios: {
        summary: { position: [0, 0], scale: 1.2 },
      },
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        _Area: { text: 'Area', color: colors.qrArea_sides },
        equals: '  =  ',
        __2: { text: '2', color: colors.qrArea_sides },
        x: ' \u00D7 ',
        _x: ' \u00D7 ',
        __x: ' \u00D7 ',
        __B: { text: ' B ', color: colors.qrArea_sides },
        width: { text: ' width ', color: colors.qrArea_sides },
        height: { text: ' height ',color: colors.qrArea_sides },
      },
      forms: {
        summaryRect: ['_Area', 'equals', 'width', 'x', 'height'],
        summarySquare: ['_Area', 'equals', { sup: ['__B', '__2'] }],
      },
      defaultFormAlignment: {
        alignH: 'center',
      },
    },
    mods: {
      scenarios: {
        // top: { position: [0, 0.9] },
        // square: { position: [0, 0.8] },
        // nav: { position: [-2.74, 1.6] },
        summary: { position: [0, 0] },
        // qr: { position: [0, -1.5] },
      },
      isTouchable: false,
    },
  };

  const areaEqn = (name, value, x) => ({
    name,
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 0.9,
      elements: {
        _Area: { text: 'Area', color: colors.qrArea_sides },
        equals: '  =  ',
        value: { text: value },
        m: { text: 'm', color: colors.qrArea_sides },
        _2: { text: '2', color: colors.qrArea_sides },
      },
      forms: {
        '0': ['_Area', 'equals', 'value', ' ', { sup: ['m', '_2'] }],
      },
      defaultFormAlignment: {
        alignH: 'center',
      },
    },
    mods: {
      scenarios: {
        qr: { position: [x, -1.3] },
      },
    },
  });

  layout.addElements = [
    // examples,
    unitShape,
    // measure,
    shapes,
    rectangle,
    eqn,
    square,
    areaEqn('areaSquare', '25', 0),
    areaEqn('areaCircle', '19.3', -1.8),
    areaEqn('areaTriangle', '14.3', 1.8),
  ];
  return layout;
}
