// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';
import { activator } from '../../../../../../js/tools/misc';

const {
  Point,
  Rect,
  Transform,
  Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'circle',
  'radius',
  'diameter',
  'center',
  'grid',
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
  radius = 0.9
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
  };

  layout.anchor = {
    name: 'anchor',
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
      location: new Point(-2.2, -1.4),
      decimalPlaces: 0,
      lineWidth: 0.01,
    },
  };

  layout.locationText = {
    name: 'locationText',
    method: 'text',
    options: {
      text: 'Location: ',
      color: colors.center,
      size: 0.12,
      family: 'helvetica',
      hAlign: 'left',
    },
    mods: {
      scenarios: {
        center: { position: new Point(1.05, 1.5) },
      },
    },
    scenario: 'center',
  };

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
      options: { rotation: -Math.PI / 2, clockwise: false }
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

  layout.circ = {
    name: 'circle',
    method: 'collection',
    options: {
      transform: new Transform().scale(1, 1).translate(0, 0),
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0) },
      },
      hasTouchableElements: true,
    },
    addElements: [
      layout.circleLine,
      layout.circumference,
      layout.arc,
      layout.radius,
      layout.diameter,
      layout.anchor,
    ],
  };

  layout.addCircleElements = [
    activator({
      width: 6,
      height: radius * 3,
      position: new Point(0, 0),
      color: [0, 1, 0, 1]
    }),
    layout.grid,
    layout.circ,
    layout.locationText,
  ];

  return layout;
}
