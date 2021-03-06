// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  Line,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.lines = colors.get('blue').rgb;
  colors.angle1 = colors.get('red').rgb;
  colors.angle2 = colors.get('green').rgb;
  colors.angle3 = colors.get('yellow').rgb;
  colors.angle4 = colors.get('cyan').rgb;
  colors.disabled = colors.get('grey', 'darker').rgb;
  colors.intersectingLine = colors.get('blue', 'lighter').rgb;
  layout.length = 2.5;
  layout.width = 0.03;
  layout.angleRadius = 0.4;

  layout.line = {
    method: 'line',
    options: {
      length: layout.length,
      width: layout.width,
      color: colors.lines,
      vertexSpaceStart: 'center',
      move: {
        type: 'rotation',
      },
    },
    mods: {
      // isInteractive: true,
      interactiveLocation: new Point(layout.length / 2 * 0.9, 0),
    },
  };

  layout.angle = {
    method: 'angle',
    options: {
      curve: {
        width: layout.width / 3 * 2,
        sides: 400,
        radius: layout.angleRadius,
      },
      label: {
        text: '',
        radius: layout.angleRadius * 1.05,
        autoHide: 0.2,
        scale: 0.9,
      },
    },
  };

  // ////////////////////////////////////////////////////////////
  // Opposite
  // ////////////////////////////////////////////////////////////
  layout.oppositeLine1 = joinObjects({}, layout.line, {
    name: 'line1',
    mods: {
      scenarios: {
        summary: { rotation: 0 },
        qr: { rotation: 0 },
      },
    },
  });
  layout.oppositeLine2 = joinObjects({}, layout.line, {
    name: 'line2',
    options: {
      angle: 1,
    },
    mods: {
      scenarios: {
        center: { rotation: 1 },
        summary: { rotation: 1 },
        qr: { rotation: 1 },
      },
    },
  });
  layout.oppositeAngle1 = joinObjects({}, layout.angle, {
    name: 'angle1',
    options: { color: colors.angle1 },
  });
  layout.oppositeAngle2 = joinObjects({}, layout.angle, {
    name: 'angle2',
    options: { color: colors.angle2 },
  });
  layout.oppositeAngle3 = joinObjects({}, layout.angle, {
    name: 'angle3',
    options: { color: colors.angle3 },
  });
  layout.oppositeAngle4 = joinObjects({}, layout.angle, {
    name: 'angle4',
    options: { color: colors.angle4 },
  });

  layout.oppositeEqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      elements: {
        a: { color: colors.angle1 },
        b: { color: colors.angle2 },
        c: { color: colors.angle3 },
        d: { color: colors.angle4 },
        equals: { text: ' = ' },
        plus: { text: ' + ' },
        minus: { text: ' – ' },
        _180: { text: '180º' },
      },
      defaultFormAlignment: {
        yAlign: 'baseline',
        xAlign: 'center',
        fixTo: 'equals',
      },
      scale: 1.1,
      forms: {
        'b': ['b', 'equals', '_180', 'minus', 'a'],
        'd': ['d', 'equals', '_180', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        top: { position: [-0.3, 1.2], scale: 1 },
      },
    },
  };

  layout.oppositeFig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout.oppositeAngle1,
      layout.oppositeAngle2,
      layout.oppositeAngle3,
      layout.oppositeAngle4,
      layout.oppositeLine1,
      layout.oppositeLine2,
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2], scale: 1 },
        summary: { position: [1.3, 0], scale: 0.9 },
        qr: { position: [0, 0], scale: 0.9 },
      },
    },
  };


  // ////////////////////////////////////////////////////////////
  // 3 Lines
  // ////////////////////////////////////////////////////////////
  layout._3LinesLine1 = joinObjects({}, layout.line, {
    name: 'line1',
    options: {
      position: [0, 0.6],
    },
    mods: {
      interactiveLocation: new Point(layout.length / 2 * 0.9, 0),
      scenarios: {
        center: { position: [0, 0.6] },
        translate: { position: [0, 0], rotation: 0 },
        summary: { position: [0, 0.6], rotation: 0 },
        qr: { position: [0, 0.6], rotation: 0 },
      },
    },
  });
  layout._3LinesLine2 = joinObjects({}, layout.line, {
    name: 'line2',
    options: {
      position: [0, -0.6],
    },
    mods: {
      interactiveLocation: new Point(layout.length / 2 * 0.9, 0),
      scenarios: {
        center: { position: [0, -0.6] },
        translate: { position: [0, -0.6], rotation: 0 },
        summary: { position: [0, -0.6], rotation: 0 },
        qr: { position: [0, -0.6], rotation: 0 },
      },
    },
  });
  layout._3LinesLine3 = joinObjects({}, layout.line, {
    name: 'line3',
    options: {
      length: layout.length * 1.1,
      color: colors.intersectingLine,
      angle: 1,
    },
    mods: {
      interactiveLocation: new Point(layout.length / 2 * 0.9, 0),
      scenarios: {
        translate: { rotation: 1 },
        summary: { position: [0, 0], rotation: 1 },
        qr: { position: [0, 0], rotation: 1 },
      },
    },
  });
  layout.moveLine = new Line(new Point(0, -0.7), 1.4, Math.PI / 2);
  // layout._3LinesLine4 = joinObjects({}, layout.line, {
  //   name: 'line4',
  //   options: {
  //     color: colors.intersectingLine,
  //   },
  // });

  layout._3LinesAngleA1 = joinObjects({}, layout.angle, {
    name: 'angleA1',
    mods: { angleIndex: 0 },
  });
  layout._3LinesAngleA2 = joinObjects({}, layout.angle, {
    name: 'angleA2',
    mods: { angleIndex: 0 },
  });
  layout._3LinesAngleB1 = joinObjects({}, layout.angle, {
    name: 'angleB1',
    mods: { angleIndex: 1 },
  });
  layout._3LinesAngleB2 = joinObjects({}, layout.angle, {
    name: 'angleB2',
    mods: { angleIndex: 1 },
  });
  layout._3LinesAngleC1 = joinObjects({}, layout.angle, {
    name: 'angleC1',
    mods: { angleIndex: 2 },
  });
  layout._3LinesAngleC2 = joinObjects({}, layout.angle, {
    name: 'angleC2',
    mods: { angleIndex: 2 },
  });
  layout._3LinesAngleD1 = joinObjects({}, layout.angle, {
    name: 'angleD1',
    mods: { angleIndex: 3 },
  });
  layout._3LinesAngleD2 = joinObjects({}, layout.angle, {
    name: 'angleD2',
    mods: { angleIndex: 3 },
  });


  layout._3LinesFig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout._3LinesAngleA2,
      layout._3LinesAngleA1,
      layout._3LinesAngleB2,
      layout._3LinesAngleB1,
      layout._3LinesAngleC2,
      layout._3LinesAngleC1,
      layout._3LinesAngleD2,
      layout._3LinesAngleD1,
      layout._3LinesLine2,
      layout._3LinesLine1,
      layout._3LinesLine3,
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.4], scale: 1 },
        translate: { position: [0, -0.4], rotation: 0, scale: 1 },
        summary: { position: [1.3, 0], scale: 0.9, rotation: 0 },
        qr: { position: [0, 0], scale: 0.9, rotation: 0 },
        quiz: { position: [0, 0.3], scale: 0.95 },
      },
    },
  };

  // ////////////////////////////////////////////////////////////
  // Collection
  // ////////////////////////////////////////////////////////////
  layout.addElements = [
    layout.oppositeFig,
    layout.oppositeEqn,
  ];
  layout.addElementsThreeLines = [
    layout._3LinesFig,
  ];
  return layout;
}
