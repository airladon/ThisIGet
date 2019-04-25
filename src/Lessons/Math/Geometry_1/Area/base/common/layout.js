// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'example1',
  'example2',
  'disabled',
  'grid',
  'angles',
  'measure',
  'gridLight',
  'highlight',
  'row',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const exampleSquareLarge = {
    name: 'largeSquare',
    method: 'rectangle',
    options: {
      width: 2,
      height: 2,
      color: colors.example1,
      position: [-1, 0],
    },
  };

  const exampleSquareSmall = {
    name: 'smallSquare',
    method: 'rectangle',
    options: {
      width: 1,
      height: 1,
      color: colors.example2,
      position: [1.2, 0],
    },
  };

  const exampleCircleLarge = {
    name: 'largeCircle',
    method: 'polygon',
    options: {
      fill: true,
      radius: 1,
      sides: 200,
      color: colors.example1,
      position: [-1, 0],
    },
  };

  const examples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      exampleSquareLarge,
      exampleSquareSmall,
      exampleCircleLarge,
    ],
    options: {
      position: [0, -0.2],
    },
  };

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
      color: colors.sides,
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
      color: colors.sides,
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
      color: colors.sides,
      sides: 3,
      radius: 0.84,
      rotation: -Math.PI / 6,
      position: [1.7, -0.58],
    },
  };
  const shapeCircleLabel = {
    name: 'circleLabel',
    method: 'text',
    options: { color: colors.sides, position: [-1.75, -1.45], size: 0.15 },
  };
  const shapeSquareLabel = {
    name: 'squareLabel',
    method: 'text',
    options: { color: colors.sides, position: [0, -1.45], size: 0.15 },
  };
  const shapeTriangleLabel = {
    name: 'triangleLabel',
    method: 'text',
    options: { color: colors.sides, position: [1.75, -1.45], size: 0.15 },
  };
  const htmlText = (name, value, position) => ({
    name,
    method: 'textHTML',
    options: {
      text: `Area = ${value}m<sup>2</sup>`,
      classes: 'area__label',
      alignH: 'center',
      position,
    },
  });
  // const shapeHtmlTriangleLabel = {
  //   name: 'triangleHtmlLabel',
  //   method: 'textHTML',
  //   options: {
  //     text: 'Area = m<sup>2</sup>',
  //     classes: 'area__label',
  //     alignH: 'center',
  //     color: colors.sides,
  //     position: [0, -1.45],
  //   },
  // };
  const shapes = {
    name: 'shapes',
    method: 'collection',
    addElements: [
      shapeCircle,
      shapeSquare,
      shapeTriangle,
      shapeCircleLabel,
      shapeSquareLabel,
      shapeTriangleLabel,
      // shapeHtmlTriangleLabel,
      htmlText('triangleHtmlLabel', 14.5, [1.75, -1.45]),
      htmlText('squareHtmlLabel', 25, [0, -1.45]),
      htmlText('circleHtmlLabel', 19.6, [-1.75, -1.45]),
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

  const measureLengthTicks = {
    name: 'ticks',
    method: 'grid',
    options: {
      bounds: new Rect(-2, -0.05, 4, 0.1),
      xStep: 1,
      yStep: 0,
      numLinesThick: 2,
      color: colors.measure,
      position: [0, -0.2],
    },
  };

  const measureLengthMeasureLine = {
    name: 'measureLine',
    method: 'line',
    options: {
      width: 0.01,
      color: colors.measure,
      length: 4,
      vertexSpaceStart: 'center',
      position: [0, -0.2],
    },
  };

  const measureLengthLabel = {
    name: 'label',
    method: 'text',
    options: {
      color: colors.measure,
      text: '1m',
      position: [-1.5, -0.05],
      size: 0.15,
    },
  };

  const measureLengthLine = {
    name: 'line',
    method: 'line',
    options: {
      width: 0.03,
      color: colors.sides,
      length: 4,
      vertexSpaceStart: 'center',
      position: [0, -0.7],
    },
  };

  const measureLength = {
    name: 'length',
    method: 'collection',
    addElements: [
      measureLengthTicks,
      measureLengthMeasureLine,
      measureLengthLabel,
      measureLengthLine,
    ],
  };

  const measureAngleRadius = 2.2;
  const measureAngleAngle = {
    name: 'angle',
    method: 'polyLine',
    options: {
      points: [
        [measureAngleRadius, 0],
        [0, 0],
        [
          measureAngleRadius * Math.cos(Math.PI / 3),
          measureAngleRadius * Math.sin(Math.PI / 3),
        ],
      ],
      width: 0.02,
      color: colors.sides,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: 0.02,
        },
        label: {
          text: null,
          radius: 0.3,
        },
      },
    },
  };

  const measureAngleDegrees = {
    name: 'degrees',
    method: 'radialLines',
    options: {
      innerRadius: measureAngleRadius + 0.25,
      outerRadius: measureAngleRadius + 0.3,
      width: 0.01,
      color: colors.measure,
      dAngle: Math.PI / 180,
      angle: Math.PI / 3,
    },
  };

  const measureAngle10Degrees = {
    name: 'degrees10',
    method: 'radialLines',
    options: {
      innerRadius: measureAngleRadius + 0.2,
      outerRadius: measureAngleRadius + 0.3,
      width: 0.01,
      color: colors.measure,
      dAngle: Math.PI / 18,
      angle: Math.PI / 3,
    },
  };

  const measureAngle = {
    name: 'angle',
    method: 'collection',
    addElements: [
      measureAngleAngle,
      measureAngleDegrees,
      measureAngle10Degrees,
    ],
    options: {
      position: [-1.25, -1.7],
    },
  };

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
      color: colors.grid,
    },
  };

  const measureArea = {
    name: 'area',
    method: 'collection',
    addElements: [
      measureAreaGrid,
    ],
  };
  const measure = {
    name: 'measure',
    method: 'collection',
    addElements: [
      measureLength,
      measureAngle,
      measureArea,
    ],
    options: {
      position: [0, 0.2],
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const unitShapeCircle = {
    name: 'circle',
    method: 'polygon',
    options: {
      width: 0.01,
      color: colors.gridLight,
      sides: 100,
      radius: 0.125,
      trianglePrimitives: true,
    },
  };

  layout.genericGrid = {
    position: new Point(0, 0.2),
    smallPosition: new Point(-2, 0),
    sideLength: 0.25,
    waveMag: 0.0125,
    width: 0.01,
    segments: 20,
  };

  const dimension = (name, p1, p2, text) => ({
    method: 'line',
    name,
    options: {
      p1,
      p2,
      width: 0.01,
      color: colors.gridLight,
      arrows: {
        width: 0.05,
        height: 0.05,
      },
      label: {
        text,
        offset: 0.05,
        location: 'top',
        subLocation: 'left',
        orientation: 'horizontal',
      },
    },
  });

  const space = 0.15;
  const unitSquare = (name, d, label) => ({
    method: 'collection',
    name,
    addElements: [
      {
        name: 'mmSquare',
        method: 'polyLine',
        options: {
          points: [[-d, -d], [-d, d], [d, d], [d, -d]],
          close: true,
          color: colors.gridLight,
        },
      },
      dimension('hDimension', [-d, d + space], [d, d + space], label),
      dimension('vDimension', [-d - space, -d], [-d - space, d], label),
    ],
    options: {
      position: [0, -0.5],
    },
  });

  const squareSize = 0.4;
  const squareLength = {
    name: 'squareLength',
    method: 'collection',
    addElements: [
      {
        name: 'squares',
        method: 'grid',
        options: {
          xStep: squareSize,
          yStep: squareSize,
          bounds: new Rect(-squareSize * 2, -squareSize / 2, squareSize * 4, squareSize),
          width: 0.01,
          color: colors.gridLight,
        },
      },
      dimension(
        'unitDimension',
        [-squareSize * 2, squareSize / 2 + space],
        [-squareSize * 2 + squareSize, squareSize / 2 + space],
        '1mm',
      ),
      dimension(
        'dimension',
        [-squareSize * 2, squareSize / 2 + space * 3.5],
        [-squareSize * 2 + squareSize * 4, squareSize / 2 + space * 3.5],
        '4mm',
      ),
    ],
    options: {
      position: [0, -0.3],
    },
  };

  const unitShape = {
    name: 'unitShape',
    method: 'collection',
    addElements: [
      unitShapeCircle,
      measureAreaGrid,
      unitSquare('mmSquare', 0.2, '1mm'),
      unitSquare('mSquare', 1, '1m'),
      squareLength,
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
      color: colors.sides,
      width: 0.03,
      close: true,
    },
  };
  const rectangleGrid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight),
      xStep: rectGrid,
      yStep: rectGrid,
      color: colors.grid,
    },
  };
  const row = {
    name: 'row',
    method: 'grid',
    options: {
      bounds: new Rect(-rectWidth / 2, 0, rectWidth, rectGrid),
      xStep: rectGrid,
      yStep: rectGrid,
      color: colors.row,
      numLinesThick: 6,
    },
    mods: {
      scenarios: {
        '0': { position: [0, rectHeight / 2 - 1 * rectGrid] },
        '1': { position: [0, rectHeight / 2 - 2 * rectGrid] },
        '2': { position: [0, rectHeight / 2 - 3 * rectGrid] },
        '3': { position: [0, rectHeight / 2 - 4 * rectGrid] },
        '4': { position: [0, rectHeight / 2 - 5 * rectGrid] },
        '5': { position: [0, rectHeight / 2 - 6 * rectGrid] },
      },
    },
  };

  const label = (name, text, position) => ({
    name,
    method: 'text',
    options: {
      text,
      position,
      color: colors.sides,
      size: 0.15,
    },
  });

  const rectangle = {
    name: 'rectangle',
    method: 'collection',
    addElements: [
      rectangleGrid,
      rect,
      row,
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
      color: colors.sides,
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
      color: colors.grid,
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
  const comment = (content, commentText, symbol) => ({
    bottomComment: {
      content,
      commentText,
      symbol,
      // contentSpace: 0.1,
      // commentSpace: 0.2,
    },
  });
  const brace = numLines => ({
    symbol: 'brace', side: 'bottom', color: colors.gridLight, numLines,
  });
  const eqn = {
    name: 'eqn',
    method: 'addNavigator',
    options: {
      navType: 'description',
      color: colors.diagram.text.base,
      scale: 0.9,
      alignH: 'left',
      elements: {
        Area: { color: colors.highlight },
        _Area: { text: 'Area', color: colors.sides },
        equals: '  =  ',
        _equals: '  =  ',
        _6: '6',
        _2: { text: '2', color: colors.highlight },
        __2: { text: '2', color: colors.sides },
        x: ' \u00D7 ',
        _x: ' \u00D7 ',
        __x: ' \u00D7 ',
        _10: '10',
        squares: { color: colors.highlight },
        numSquares: ' num squares ',
        _numSquares: ' num squares ',
        A: { text: ' A ', color: colors.sides },
        B: { text: ' B ', color: colors.sides },
        _B: { text: ' B ', color: colors.sides },
        __B: { text: ' B ', color: colors.sides },
        width: { text: ' width ', color: colors.sides },
        height: { text: ' height ',color: colors.sides },
        _length: ' length ',
        length: ' length ',
        brace: brace(4),
        _brace: brace(4),
        sBrace: brace(1),
        mBrace: brace(2),
        _sBrace: brace(1),
        _60: '60',
        _1: '1',
        __1: '1',
        // m: { color: colors.highlight, mods: mods('up', 0.6) },
        m: { color: colors.highlight },
        _m: { text: 'm', color: colors.highlight },
        __m: { text: 'm', color: colors.highlight },
        s: { symbol: 'strike', color: colors.gridLight },
        _s: { symbol: 'strike', color: colors.gridLight },
      },
      forms: {
        '0': ['Area', 'equals', '_6', 'x', '_10', '_equals', '_60', '  ', 'squares'],
        '1': ['Area', 'equals', 'numSquares', 'A', 'x', '_numSquares', 'B'],
        '2': [
          'Area', 'equals',
          comment('numSquares', 'length', 'brace'), 'A',
          'x',
          comment('_numSquares', '_length', '_brace'), 'B',
        ],
        '3': ['Area', 'equals', 'length', 'A', 'x', '_length', 'B'],
        '4': ['Area', 'equals', 'A', 'x', 'B'],
        '5': [
          'Area', 'equals',
          comment('A', 'width', 'sBrace'),
          'x',
          comment('B', 'height', '_sBrace'),
        ],
        '6': ['Area', 'equals', 'width', 'x', 'height'],
        // //////////////////////////////////////////
        // Units Forms
        // //////////////////////////////////////////
        '10': ['Area', 'equals', '_10', 'm', 'x', '_6', '_m'],
        '11': ['Area', 'equals', '_10', '_x', '_1', 'm', 'x', '_6', '__x', '__1', '_m'],
        '12': {
          content: ['Area', 'equals', '_10', 'x', '_6', '__x', '__1', '_m', '_x', '_1', 'm'],
          translation: {
            m: ['curved', 'up', 0.5],
            _1: ['curved', 'up', 0.5],
            _x: ['curved', 'up', 0.5],
          },
        },
        '13': [
          'Area', 'equals',
          comment(['_10', 'x', '_6'], '_60', 'mBrace'),
          '__x',
          { strike: ['__1', 's'] },
          '_m', '_x',
          { strike: ['_1', '_s'] },
          'm'],
        '14': {
          content: ['Area', 'equals', '_60', '__x', '_m', '_x', 'm'],
          translation: {
            m: ['linear'],
            _x: ['linear'],
          },
        },
        '15': [
          'Area', 'equals', '_60', '__x',
          comment(['_m', '_x', 'm'], { sup: ['__m', '_2'] }, 'mBrace'),
        ],
        '16': ['Area', 'equals', '_60', { sup: ['__m', '_2'] }],
        // //////////////////////////////////////////
        // Square
        // //////////////////////////////////////////
        square: [
          'Area', 'equals', 'B', 'x', '_B', '_equals',
          { sup: ['__B', '__2'] },
        ],
        // //////////////////////////////////////////
        // Summary
        // //////////////////////////////////////////
        summaryRect: [
          '_Area', 'equals', 'width', 'x', 'height',
        ],
        summarySquare: [
          '_Area', 'equals', { sup: ['__B', '__2'] },
        ],
      },
      defaultFormAlignment: {
        alignH: 'center',
      },
    },
    mods: {
      scenarios: {
        top: { position: [0, 0.9] },
        square: { position: [0, 0.8] },
        nav: { position: [-2.74, 1.6] },
        summary: { position: [0, 0] },
        qr: { position: [0, -1.5] },
      },
      isTouchable: false,
    },
  };

  layout.addElements = [
    examples,
    unitShape,
    measure,
    shapes,
    rectangle,
    eqn,
    square,
  ];
  return layout;
}
