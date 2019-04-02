// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';
import { activator } from '../../../../../../js/tools/misc';

const {
  Point,
  Rect,
  Transform,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'circle',
  'radius',
  'diameter',
  'center',
  'grid',
  'circleFill',
  'property',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors = colors;
  layout.position = new Point(0, 0);

  // ///////////////////////////////////////////////////////////////
  // Shapes
  // ///////////////////////////////////////////////////////////////
  let radius = 1;
  const sides = 50;
  const textureFile = `/static/dist/${textureMap}`;
  const lineWidth = 0.08;
  const scenarios = {
    moreLeft: { position: new Point(-2, -0.4), scale: 0.7 },
    left: { position: new Point(-0.7, -0.4), scale: 0.5 },
    center: { position: new Point(0.3, -0.4), scale: 0.4 },
    right: { position: new Point(1.1, -0.4), scale: 0.3 },
    moreRight: { position: new Point(2.2, -0.4), scale: 0.5 },
  };
  const mods = { scenarios };

  const filledCircle = {
    fill: true,
    sides,
    radius,
    color: [1, 1, 0, 1],
    transform: new Transform('filledCircle').scale(1, 1).translate(0, 0),
    textureLocation: textureFile,
  };

  const moonTex = { textureCoords: new Rect(0, 0, 0.3333, 0.3333) };
  const wheelTex = { textureCoords: new Rect(0.3333, 0, 0.2222, 0.2222) };
  const ballTex = { textureCoords: new Rect(0.5555, 0, 0.1667, 0.1667) };
  const ringTex = { textureCoords: new Rect(0.7222, 0.1481, 0.1481, 0.1481) };
  layout.moon = ['', 'moon', 'polygon', [filledCircle, moonTex], mods, [], 'moreLeft'];
  layout.wheel = ['', 'wheel', 'polygon', [filledCircle, wheelTex], mods, [], 'left'];
  layout.ball = ['', 'ball', 'polygon', [filledCircle, ballTex], mods, [], 'center'];
  layout.ring = ['', 'ring', 'polygon', [filledCircle, ringTex], mods, [], 'right'];

  layout.circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      fill: false,
      radius,
      width: lineWidth,
      sides,
      color: colors.circle,
      transform: new Transform('Circle').scale(1, 1).translate(0, 0),
    },
    mods: { scenarios },
    scenario: 'moreRight',
  };

  const makeCircle = (name, scenario) => joinObjects(
    {},
    layout.circle,
    { scenario, name },
  );
  layout.circleMoon = makeCircle('circleMoon', 'moreLeft');
  layout.circleWheel = makeCircle('circleWheel', 'left');
  layout.circleBall = makeCircle('circleBall', 'center');
  layout.circleRing = makeCircle('circleRing', 'right');

  layout.addObjectsElements = [
    activator({ width: 6, height: 2, position: new Point(0, -0.4) }),
    layout.moon,
    layout.wheel,
    layout.ball,
    layout.ring,
    layout.circle,
    layout.circleWheel,
    layout.circleBall,
    layout.circleMoon,
    layout.circleRing,
  ];

  // ///////////////////////////////////////////////////////////////
  // Interactive Circle
  // ///////////////////////////////////////////////////////////////
  const width = 0.05;
  radius = 0.9;
  layout.circleLine = {
    name: 'line',
    method: 'polygon',
    options: {
      sides: 400,
      radius,
      width,
      color: colors.circle,
      transform: new Transform('Circle').scale(1, 1).translate(0, 0),
    },
  };

  layout.arc = joinObjects({}, layout.circleLine, { name: 'arc' });

  layout.radius = {
    name: 'radius',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.radius,
      vertexSpaceStart: 'left',
      move: {
        type: 'rotation',
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
    },
  };

  layout.diameter = {
    name: 'diameter',
    method: 'line',
    options: {
      length: radius * 2,
      width,
      color: colors.diameter,
      vertexSpaceStart: 'center',
      move: {
        type: 'rotation',
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
      scenarios: {
        diameterLines: {
          position: new Point(-Math.PI * radius + radius, -radius * 1.1),
          scale: new Point(0.98, 1),
          rotation: 0,
        },
        center: {
          position: new Point(0, 0),
          scale: new Point(1, 1),
          rotation: 0,
        },
      },
    },
  };

  layout.center = {
    name: 'center',
    method: 'polygon',
    options: {
      sides: 20,
      radius: 0.05,
      fill: true,
      color: colors.center,
    },
  };

  layout.circleScenarios = {
    'center': { position: new Point(0, -0.4) },
  };

  layout.grid = {
    name: 'grid',
    method: 'axes',
    options: {
      width: 4.5,
      height: 2.7,
      limits: new Rect(0, 0, 10, 6),
      yAxisLocation: 0,
      xAxisLocation: 0,
      stepX: 1,
      stepY: 1,
      fontSize: 0.1,
      showGrid: true,
      color: colors.grid,
      gridColor: colors.grid,
      location: new Point(-2.2, -1.2),
      decimalPlaces: 0,
      lineWidth: 0.01,
    },
  };

  layout.text = {
    method: 'text',
    options: {
      size: 0.12,
      family: 'helvetica',
      hAlign: 'left',
      style: 'normal',
      weight: 500,
    },
    mods: {
      isTouchable: true,
    },
    scenario: 'summary',
  };

  layout.locationText = joinObjects({}, layout.text, {
    name: 'locationText',
    options: {
      color: colors.center,
    },
    mods: {
      scenarios: {
        topRight: { position: new Point(1.05, 1.6) },
        summary: { position: new Point(-2.15, 1.35) },
      },
    },
  });

  layout.circumferenceText = joinObjects({}, layout.text, {
    name: 'circumferenceText',
    options: {
      color: colors.circle,
    },
    mods: {
      scenarios: {
        summary: { position: new Point(-2.15, 1.15) },
      },
    },
  });

  layout.radiusText = joinObjects({}, layout.text, {
    name: 'radiusText',
    options: {
      color: colors.radius,
    },
    mods: {
      scenarios: {
        summary: { position: new Point(-2.15, 0.95) },
      },
    },
  });
  layout.diameterText = joinObjects({}, layout.text, {
    name: 'diameterText',
    options: {
      color: colors.diameter,
    },
    mods: {
      scenarios: {
        summary: { position: new Point(-2.15, 0.75) },
      },
    },
  });


  layout.circumferenceLeftLine = {
    name: 'leftLine',
    method: 'line',
    options: {
      length: radius * Math.PI,
      width,
      color: colors.circle,
      vertexSpaceStart: 'end',
      position: new Point(0, -radius + width / 2),
    },
  };
  layout.circumferenceRightLine = joinObjects(
    {}, layout.circumferenceLeftLine,
    { name: 'rightLine', options: { vertexSpaceStart: 'start' } },
  );

  layout.circumferenceLeftArc = {
    name: 'leftArc',
    method: 'polygon',
    options: {
      radius,
      width,
      sides: 400,
      sidesToDraw: 200,
      clockwise: true,
      color: colors.circle,
      rotation: Math.PI / 2,
      transform: new Transform().translate(0, 0),
    },
  };
  layout.circumferenceRightArc = joinObjects(
    {}, layout.circumferenceLeftArc,
    {
      name: 'rightArc',
      options: { rotation: -Math.PI / 2, clockwise: false },
    },
  );

  layout.circumference = {
    name: 'circumference',
    method: 'collection',
    options: {
      transform: new Transform().scale(1, 1).translate(0, 0),
    },
    addElements: [
      layout.circumferenceLeftLine,
      layout.circumferenceRightLine,
      layout.circumferenceLeftArc,
      layout.circumferenceRightArc,
    ],
  };

  const diameterLine = index => ({
    name: `line${index}`,
    method: 'line',
    options: {
      length: radius * 1.98,
      width,
      color: colors.diameter,
      // vertexSpaceStart: 'start',
      position: new Point(index * radius * 2, 0),
    },
  });
  layout.diameterLines = {
    name: 'diameterLines',
    method: 'collection',
    options: {
      position: [-radius * Math.PI, -radius * 1.1],
    },
    addElements: [
      diameterLine(0),
      diameterLine(1),
      diameterLine(2),
    ],
  };

  layout.scalingCircle = joinObjects({}, layout.circleLine, {
    name: 'scale',
    options: {
      fill: true,
      color: [0, 0, 1, 0],
      radius: radius * 1.2,
    },
    mods: {
      isTouchable: true,
      isMovable: true,
      move: {
        type: 'scale',
      },
      interactiveLocation: new Point(radius, 0),
    },
  });

  layout.translatingCircle = joinObjects({}, layout.circleLine, {
    name: 'translate',
    options: {
      fill: true,
      color: [0, 1, 0, 0],
      radius: radius * 0.4,
    },
    mods: {
      isTouchable: true,
      isMovable: true,
    },
  });

  layout.circ = {
    name: 'circle',
    method: 'collection',
    options: {
      transform: new Transform().scale(1, 1).translate(0, 0),
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0) },
        centerHigh: { position: new Point(0, 0.3) },
        centerHigher: { position: new Point(0, 0.5) },
        right: { position: new Point(1.5, 0.1) },
      },
      hasTouchableElements: true,
    },
    addElements: [
      layout.scalingCircle,
      layout.circleLine,
      layout.circumference,
      layout.arc,
      layout.radius,
      layout.diameter,
      layout.center,
      layout.translatingCircle,
    ],
  };

  const elements = {
    diameter: { text: 'diameter', color: colors.diameter },
    radius: { text: 'radius', color: colors.radius },
    circumference: { text: 'circumference', color: colors.circle },
    x: `  ${String.fromCharCode(215)}  `,
    pi: 'π',
    _2: '2',
    equals: '  =  ',
    v: { symbol: 'vinculum' },
  };
  const defaultFormAlignment = {
    fixTo: 'equals',
    alignH: 'right',
    alignV: 'top',
  };

  const eqn = (name, form, scenariosObject) => ({
    name,
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1.2,
      elements,
      defaultFormAlignment,
      forms: {
        base: form,
      },
    },
    mods: {
      scenarios: scenariosObject,
    },
  });

  layout.diameterRadiusEquation = eqn(
    'eqnDiameterRadius',
    ['diameter', 'equals', '_2', 'x', 'radius'],
    {
      centerTop: { position: new Point(0.2, 1.5) },
      left: { position: new Point(-1, 0.5), scale: 0.8 },
      qr: { position: new Point(-0.2, -1.2), scale: 0.5 },
    },
  );

  layout.diameterCircumferenceEquation = eqn(
    'eqnDiameterCircumference',
    ['diameter', 'equals', { frac: ['circumference', 'pi', 'v'] }],
    {
      qr: { position: new Point(-0.2, -1.5), scale: 0.5 },
    },
  );

  layout.circumferenceDiameterEquation = eqn(
    'eqnCircumferenceDiameter',
    ['circumference', 'equals', 'pi', 'x', 'diameter'],
    {
      centerTop: { position: new Point(0.2, 1.4) },
      centerMid: { position: new Point(0.2, 1) },
      left: { position: new Point(-1, 0), scale: 0.8 },
      qr: { position: new Point(0.1, -1.2), scale: 0.5 },
    },
  );

  layout.circumferenceRadiusEquation = eqn(
    'eqnCircumferenceRadius',
    ['circumference', 'equals', '_2', ' ', 'pi', 'x', 'radius'],
    {
      centerTop: { position: new Point(0.2, 1.4) },
      centerMid: { position: new Point(0.2, 1) },
      left: { position: new Point(-1, -0.5), scale: 0.8 },
      qr: { position: new Point(0.1, -1.5), scale: 0.5 },
    },
  );

  layout.radiusDiameterEquation = eqn(
    'eqnRadiusDiameter',
    ['radius', 'equals', { frac: ['diameter', '_2', 'v'] }],
    {
      qr: { position: new Point(-0.1, -1.2), scale: 0.5 },
    },
  );

  layout.radiusCircumferenceEquation = eqn(
    'eqnRadiusCircumference',
    ['radius', 'equals', { frac: ['circumference', ['_2', 'pi'], 'v'] }],
    {
      qr: { position: new Point(-0.1, -1.5), scale: 0.5 },
    },
  );

  // layout.diameterRadiusEquation = {
  //   name: 'eqnDiameterRadius',
  //   method: 'addEquation',
  //   options: {
  //     color: colors.diagram.text.base,
  //     scale: 1.3,
  //     elements,
  //     defaultFormAlignment,
  //     forms: {
  //       diameter: ['diameter', 'equals', '_2', 'x', 'radius'],
  //     },
  //   },
  //   mods: {
  //     scenarios: {
  //       centerTop: { position: new Point(0.2, 1.5) },
  //       left: { position: new Point(-1, 0.5), scale: 0.8 },
  //     },
  //   },
  // };

  // layout.circumferenceEquation = {
  //   name: 'cEquation',
  //   method: 'addEquation',
  //   options: {
  //     color: colors.diagram.text.base,
  //     scale: 1.3,
  //     elements: {
  //       diameter: { text: 'diameter', color: colors.diameter },
  //       radius: { text: 'radius', color: colors.radius },
  //       circumference: { text: 'circumference', color: colors.circle },
  //       x: `  ${String.fromCharCode(215)}  `,
  //       pi: 'π ',
  //       _2: '2 ',
  //       equals: '  =  ',
  //     },
  //     defaultFormAlignment: { fixTo: 'equals', alignH: 'right', alignV: 'top' },
  //     forms: {
  //       diameter: ['circumference', 'equals', 'pi', 'x', 'diameter'],
  //       short: ['circumference', 'equals', 'pi', 'diameter'],
  //     },
  //   },
  //   mods: {
  //     scenarios: {
  //       centerTop: { position: new Point(0.2, 1.4) },
  //       centerMid: { position: new Point(0.2, 1) },
  //       left: { position: new Point(-1, 0), scale: 0.8 },
  //     },
  //   },
  // };

  layout.radiusEquation = {
    name: 'rEquation',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1.3,
      elements: {
        diameter: { text: 'diameter', color: colors.diameter },
        radius: { text: 'radius', color: colors.radius },
        circumference: { text: 'circumference', color: colors.circle },
        x: `  ${String.fromCharCode(215)}  `,
        pi: 'π ',
        _2: '2 ',
        equals: '  =  ',
      },
      defaultFormAlignment: { fixTo: 'equals', alignH: 'right', alignV: 'top' },
      forms: {
        radius: ['circumference', 'equals', '_2', 'pi', 'x', 'radius'],
        short: ['circumference', 'equals', 'pi', 'diameter'],
      },
    },
    mods: {
      scenarios: {
        centerTop: { position: new Point(0.2, 1.4) },
        centerMid: { position: new Point(0.2, 1) },
        left: { position: new Point(-1, -0.5), scale: 0.8 },
      },
    },
  };

  layout.allEquation = {
    name: 'allEquation',
    method: 'addNavigator',
    options: {
      color: colors.diagram.text.base,
      scale: 1.3,
      elements: {
        diameter: { text: 'diameter', color: colors.diameter },
        radius: { text: 'radius', color: colors.radius },
        circumference: { text: 'circumference', color: colors.circle },
        x: `  ${String.fromCharCode(215)}  `,
        _x: `  ${String.fromCharCode(215)}  `,
        pi: 'π ',
        _2: '2 ',
        equals: '  =  ',
        v: { symbol: 'vinculum' },
        brace: { symbol: 'brace', side: 'top', numLines: 3 },
      },
      defaultFormAlignment: { fixTo: 'equals', alignH: 'right', alignV: 'top' },
      forms: {
        '0': ['circumference', 'equals', 'pi', 'x', 'diameter'],
        '1': ['circumference', 'equals', 'pi', 'diameter'],
        '2': ['circumference', 'equals', 'pi', {
          topComment: ['diameter', ['_2', 'radius'], 'brace'],
        }],
        '3': {
          content: ['circumference', 'equals', 'pi', '_2', 'radius'],
          elementMods: {
            '_2': {
              mods: {
                animations: {
                  options: {
                    translation: {
                      style: 'linear',
                    },
                  },
                },
              },
            },
          },
        },
        '4': {
          content: ['circumference', 'equals', '_2', 'pi', 'radius'],
          elementMods: {
            '_2': {
              mods: {
                animations: {
                  options: {
                    translation: {
                      style: 'curved',
                      magnitude: 1,
                      direction: 'up',
                    },
                  },
                },
              },
            },
            'pi': {
              mods: {
                animations: {
                  options: {
                    translation: {
                      style: 'curved',
                      magnitude: 1,
                      direction: 'down',
                    },
                  },
                },
              },
            },
          },
        },
      },
      formSeries: ['0', '1', '2', '3', '4'],
    },
    mods: {
      scenarios: {
        bottom: { position: new Point(0.2, -2) },
      },
    },
  };

  layout.addCircleElements = [
    activator({
      width: 6,
      height: radius * 3,
      position: new Point(0, 0),
      color: [0, 1, 0, 0],
    }),
    layout.grid,
    layout.circ,
    layout.diameterRadiusEquation,
    layout.circumferenceDiameterEquation,
    layout.diameterCircumferenceEquation,
    layout.circumferenceRadiusEquation,
    layout.radiusDiameterEquation,
    layout.radiusCircumferenceEquation,
    layout.allEquation,
    layout.locationText,
    layout.circumferenceText,
    layout.radiusText,
    layout.diameterText,
    layout.diameterLines,
  ];

  return layout;
}
