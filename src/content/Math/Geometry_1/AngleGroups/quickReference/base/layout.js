// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrAngleGroups_lines = colors.get('blue').rgb;
  colors.qrAngleGroups_angleA = colors.get('red').rgb;
  colors.qrAngleGroups_angleB = colors.get('green').rgb;
  colors.qrAngleGroups_angleC = colors.get('yellow').rgb;

  const radius = 1.3;
  const width = 0.03;

  const line = {
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.qrAngleGroups_lines,
      move: {
        type: 'rotation',
        middleLengthPercent: 0,
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.7, 0),
    },
  };

  const angle = {
    method: 'angle',
    options: {
      curve: {
        width,
        sides: 400,
        radius: radius / 4,
      },
      label: {
        radius: radius / 4,
        autoHide: 0.2,
        scale: 1,
      },
    },
  };

  layout.line1 = joinObjects({}, line, { name: 'line1' });
  layout.line2 = joinObjects({}, line, { name: 'line2', options: { length: radius * 1 } });
  layout.line3 = joinObjects({}, line, { name: 'line3' });
  layout.angleA = joinObjects({}, angle, {
    name: 'angleA',
    options: { label: { text: 'a' }, color: colors.qrAngleGroups_angleA },
  });
  layout.angleB = joinObjects({}, angle, {
    name: 'angleB',
    options: { label: { text: 'b' }, color: colors.qrAngleGroups_angleB },
  });
  layout.angleC = joinObjects({}, angle, {
    name: 'angleC',
    options: {
      curve: {
        radius: radius * 0.8,
        width: width / 2,
      },
      label: {
        text: 'c',
        radius: radius * 0.7,
        autoHide: 0.1,
      },
      color: colors.qrAngleGroups_angleC,
    },
  });

  layout.fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout.angleA,
      layout.angleB,
      layout.line1,
      layout.line2,
      layout.angleC,
      layout.line3,
    ],
    mods: {
      scenarios: {
        center: { position: new Point(0, -0.5), scale: 1 },
        summary: { position: new Point(1.3, 0), scale: 1 },
        qr: { position: new Point(0, 0), scale: 1 },
      },
    },
  };

  const mods = (direction, mag) => ({
    animations: {
      options: {
        translation: {
          style: 'curved',
          magnitude: mag,
          direction,
        },
      },
    },
  });

  const eqn = {
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        a: { text: 'a', color: colors.qrAngleGroups_angleA, mods: mods('down', 0.4) },
        b: { text: 'b', color: colors.qrAngleGroups_angleB, mods: mods('down', 0.8) },
        c: { text: 'c', color: colors.qrAngleGroups_angleC, mods: mods('up', 0.7) },
        _180: { text: '180º', color: colors.qrAngleGroups_angleC, mods: mods('up', 0.5 ) },
        _90: { text: '90º', color: colors.qrAngleGroups_angleC, mods: mods('up', 0.5 ) },
        _360: { text: '360º', color: colors.qrAngleGroups_angleC, mods: mods('up', 0.5 ) },
        equals: '  =  ',
        plus: '  +  ',
        minus: '  -  ',
      },
      defaultFormAlignment: { fixTo: 'equals', xAlign: 'right', yAlign: 'top' },
      formSeries: {
        '1': ['c', 'a', 'b'],
      },
    },
    mods: {
      scenarios: {
        centerTop: { position: new Point(0, 1.3), scale: 1 },
        summary: { position: new Point(-1.6, -0.4), scale: 1.2 },
        qr: { position: new Point(0, -1.3) },
      },
    },
  };

  layout.adjacentAnglesEqn = joinObjects({}, eqn, {
    name: 'adjacent',
    options: {
      forms: {
        c: ['c', 'equals', 'a', 'plus', 'b'],
        a: ['a', 'equals', 'c', 'minus', 'b'],
        b: ['b', 'equals', 'c', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        centerTop: { position: new Point(0, 1.1), scale: 1 },
        // summary: { position: new Point(-1.8, -0.4), scale: 1.2}
      },
    },
  });

  layout.complementaryAnglesEqn = joinObjects({}, eqn, {
    name: 'complementary',
    options: {
      forms: {
        c: ['_90', 'equals', 'a', 'plus', 'b'],
        a: ['a', 'equals', '_90', 'minus', 'b'],
        b: ['b', 'equals', '_90', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        qr: { position: new Point(0.5, -0.4), scale: 1 },
      },
    },
  });

  layout.supplementaryAnglesEqn = joinObjects({}, eqn, {
    name: 'supplementary',
    options: {
      forms: {
        c: ['_180', 'equals', 'a', 'plus', 'b'],
        a: ['a', 'equals', '_180', 'minus', 'b'],
        b: ['b', 'equals', '_180', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        qr: { position: new Point(0.1, -0.4), scale: 1.3 },
      },
    },
  });

  layout.explementaryAnglesEqn = joinObjects({}, eqn, {
    name: 'explementary',
    options: {
      forms: {
        c: ['_360', 'equals', 'a', 'plus', 'b'],
        a: ['a', 'equals', '_360', 'minus', 'b'],
        b: ['b', 'equals', '_360', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        qr: { position: new Point(2.4, -0.7), scale: 1.3 },
      },
    },
  });

  layout.eqns = {
    name: 'eqns',
    method: 'collection',
    addElements: [
      layout.adjacentAnglesEqn,
      layout.complementaryAnglesEqn,
      layout.supplementaryAnglesEqn,
      layout.explementaryAnglesEqn,
    ],
  };

  layout.addElements = [
    layout.fig,
    layout.eqns,
  ];
  return layout;
}
