// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  Transform,
} = Fig.tools.g2;

// const cssColorNames = [
//   'qrCircle_circle',
//   'qrCircle_radius',
//   'qrCircle_diameter',
//   'qrCircle_center',
//   'qrCircle_grid',
//   'qrCircle_circleFill',
//   'qrCircle_property',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  // const layout: Object = baseLayout();
  const layout: Object = baseLayout();
  const { colors } = layout;
  // const colors = Fig.tools.color.getCSSColors(cssColorNames);
  // layout.colors = colors;
  colors.qrCircle_circle = colors.get('red').rgb;
  colors.qrCircle_radius = colors.get('blue').rgb;
  colors.qrCircle_diameter = colors.get('green').rgb;
  colors.qrCircle_center = colors.get('yellow').rgb;
  colors.qrCircle_grid = colors.get('grey', 'dark').rgb;
  colors.qrCircle_circleFill = colors.get('black', 'dark').rgb;
  colors.qrCircle_property = colors.get('red').rgb;

  layout.position = new Point(0, 0);

  let radius = 1;

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
      color: colors.qrCircle_circle,
      transform: new Transform('Circle').scale(1, 1).translate(0, 0),
    },
  };

  // layout.arc = joinObjects({}, layout.circleLine, { name: 'arc' });

  layout.radius = {
    name: 'radius',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.qrCircle_radius,
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
      color: colors.qrCircle_diameter,
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
      color: colors.qrCircle_center,
    },
  };

  layout.circleScenarios = {
    'center': { position: new Point(0, -0.4) },
  };

  layout.circ = {
    name: 'circle',
    method: 'collection',
    options: {
      transform: new Transform().scale(1, 1).translate(0, 0),
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1 },
        centerHigh: { position: new Point(0, 0.2), scale: 1 },
        summary: { position: new Point(0, 0.3), scale: 1 },
        summaryHigher: { position: new Point(0, 0.5), scale: 1 },
        right: { position: new Point(1.5, 0.2), scale: 1 },
      },
      hasTouchableElements: true,
    },
    addElements: [
      layout.circleLine,
      layout.radius,
      layout.diameter,
      layout.center,
    ],
  };

  const elements = {
    diameter: { text: 'diameter', color: colors.qrCircle_diameter },
    radius: { text: 'radius', color: colors.qrCircle_radius },
    circumference: { text: 'circumference', color: colors.qrCircle_circle },
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
      centerTop: { position: new Point(-0.1, 1.6), scale: 0.9 },
      centerMid: { position: new Point(-0.25, 1.1), scale: 0.9 },
      left: { position: new Point(-1, 0.8), scale: 0.8 },
      qr: { position: new Point(0, -1.2), scale: 0.7 },
    },
  );

  layout.diameterCircumferenceEquation = eqn(
    'eqnDiameterCircumference',
    // ['diameter', 'equals', { frac: ['circumference', 'pi', 'v'] }],
    ['diameter', 'x', 'pi', 'equals', 'circumference'],
    {
      qr: { position: new Point(0, -1.5), scale: 0.7 },
    },
  );

  layout.circumferenceDiameterEquation = eqn(
    'eqnCircumferenceDiameter',
    ['circumference', 'equals', 'pi', 'x', 'diameter'],
    {
      centerTop: { position: new Point(0.2, 1.5), scale: 1 },
      centerMid: { position: new Point(0.2, 0.7), scale: 0.9 },
      left: { position: new Point(-1, 0.3), scale: 0.8 },
      qr: { position: new Point(0.1, -1.2), scale: 0.7 },
    },
  );

  layout.circumferenceRadiusEquation = eqn(
    'eqnCircumferenceRadius',
    ['circumference', 'equals', '_2', ' ', 'pi', 'x', 'radius'],
    {
      centerTop: { position: new Point(0.2, 1.4) },
      centerMid: { position: new Point(0.2, 1) },
      left: { position: new Point(-1, -0.2), scale: 0.8 },
      qr: { position: new Point(0.1, -1.5), scale: 0.7 },
    },
  );

  layout.radiusDiameterEquation = eqn(
    'eqnRadiusDiameter',
    ['radius', 'equals', { frac: ['diameter', '_2', 'v'] }],
    {
      qr: { position: new Point(-0.1, -1.2), scale: 0.7 },
    },
  );

  layout.radiusCircumferenceEquation = eqn(
    'eqnRadiusCircumference',
    ['radius', 'equals', { frac: ['circumference', ['_2', 'pi'], 'v'] }],
    {
      qr: { position: new Point(-0.3, -1.6), scale: 0.7 },
    },
  );

  layout.radiusEquation = {
    name: 'rEquation',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1.3,
      elements: {
        diameter: { text: 'diameter', color: colors.qrCircle_diameter },
        radius: { text: 'radius', color: colors.qrCircle_radius },
        circumference: { text: 'circumference', color: colors.qrCircle_circle },
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
        centerTop: { position: new Point(0.2, 1.4), scale: 1 },
        centerMid: { position: new Point(0.2, 1), scale: 1 },
        left: { position: new Point(-1, -0.5), scale: 0.8 },
      },
    },
  };


  layout.addCircleElements = [
    layout.circ,
    layout.diameterRadiusEquation,
    layout.circumferenceDiameterEquation,
    layout.diameterCircumferenceEquation,
    layout.circumferenceRadiusEquation,
    layout.radiusDiameterEquation,
    layout.radiusCircumferenceEquation,
  ];

  return layout;
}
