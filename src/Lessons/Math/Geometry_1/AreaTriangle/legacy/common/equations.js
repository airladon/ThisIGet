// @flow
import Fig from 'figureone';

const {
  Diagram, DiagramElementCollection, DiagramElementPrimative, EquationLegacy,
} = Fig;

export type TypeTriRectEquationCollection = {
  _Area: DiagramElementPrimative;
  _rectangle: DiagramElementPrimative;
  _triangle: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _A: DiagramElementPrimative;
  _B: DiagramElementPrimative;
  _mul: DiagramElementPrimative;
  __1: DiagramElementPrimative;
  __2: DiagramElementPrimative;
  _v: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeTriRectEquation = {
  collection: TypeTriRectEquationCollection;
} & EquationLegacy;

export function addTriRectEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  const colLine = layout.colors.line;
  eqn.createElements(
    {
      Area: ['Area', colUnit],
      rectangle: 'rectangle',
      triangle: 'triangle',
      equals: ' = ',
      A: ['A', colLine],
      B: ['B', colLine],
      mul: ' \u00D7 ',
      _1: '1',
      _2: '2',
      v: diagram.equation.vinculum(colText),
    },
    colText,
  );
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    eqn.sub('Area', 'rectangle'),
    'equals',
    'A', 'mul', 'B',
  ]);

  eqn.addForm('1', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space', 'A', 'mul', 'B',
  ]);

  eqn.collection.setPosition(layout.triRectEqnPosition);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}

export type TypeTri2AreaEquationCollection = {
  _Area: DiagramElementPrimative;
  _triangle: DiagramElementPrimative;
  _Area_: DiagramElementPrimative;
  _Area__: DiagramElementPrimative;
  _AB: DiagramElementPrimative;
  __1: DiagramElementPrimative;
  __1_: DiagramElementPrimative;
  __1__: DiagramElementPrimative;
  _AD: DiagramElementPrimative;
  __2: DiagramElementPrimative;
  __2_: DiagramElementPrimative;
  __2__: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _mul: DiagramElementPrimative;
  _plus: DiagramElementPrimative;
  _A: DiagramElementPrimative;
  _A_: DiagramElementPrimative;
  _A__: DiagramElementPrimative;
  _B: DiagramElementPrimative;
  _D: DiagramElementPrimative;
  _x: DiagramElementPrimative;
  _x_: DiagramElementPrimative;
  _v: DiagramElementPrimative;
  _v_: DiagramElementPrimative;
  _v__: DiagramElementPrimative;
  _bl: DiagramElementPrimative;
  _br: DiagramElementPrimative;
  _bt: DiagramElementPrimative;
  _bt_: DiagramElementPrimative;
  _bt__: DiagramElementPrimative;
  _base: DiagramElementPrimative;
  _height: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeTri2AreaEquation = {
  collection: TypeTri2AreaEquationCollection;
} & EquationLegacy;

export function addTri2AreaEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  const colLine = layout.colors.line;
  const colCon = layout.colors.construction;
  const colCon1 = layout.colors.construction1;
  const strikeColor = layout.colors.diagram.disabledDark;
  eqn.createElements(
    {
      Area: ['Area', colLine],
      triangle: ['triangle', colLine],
      Area_: ['Area', colCon, null, null, null, null, 'italic'],
      Area__: ['Area', colCon1],
      AB: ['triangle hB', colCon],
      _1: ['1', colCon],
      _1_: ['1', colCon1],
      _1__: '1',
      AD: ['triangle hD', colCon1],
      _2: ['2', colCon],
      _2_: ['2', colCon1],
      _2__: '2',
      equals: ' = ',
      mul: ' \u00D7 ',
      plus: '  \u002B  ',
      A: [' h', colCon],
      A_: [' h', colCon1],
      A__: [' h', colText],
      B: ['B', colCon],
      D: ['D', colCon1],
      x: diagram.equation.xStrike(strikeColor),
      x_: diagram.equation.xStrike(strikeColor),
      v: diagram.equation.vinculum(colCon),
      v_: diagram.equation.vinculum(colCon1),
      v__: diagram.equation.vinculum(colText),
      bl: diagram.equation.bracket('left', 1, colText),
      br: diagram.equation.bracket('right', 1, colText),
      bt: diagram.equation.brace('top', 3, strikeColor),
      bt_: diagram.equation.brace('top', 3, strikeColor),
      bt__: diagram.equation.brace('top', 1, strikeColor),
      base: ['base', colLine],
      height: [' height', colLine],
    },
    colText,
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  const fracSize = 0.5;

  const half = eqn.sfrac('_1', '_2', 'v', fracSize);
  const half1 = eqn.sfrac('_1_', '_2_', 'v_', fracSize);
  const half2 = eqn.sfrac('_1__', '_2__', 'v__', fracSize);
  const largeHalf = eqn.sfrac('_1', '_2', 'v', fracSize * 1.7);
  const largeHalf1 = eqn.sfrac('_1_', '_2_', 'v_', fracSize * 1.7);
  const areaAB = eqn.phrase([half, 'A', 'space', 'B']);
  const areaAD = eqn.phrase([half1, 'A_', 'space', 'D']);
  const smallAreaAB = eqn.phrase([largeHalf, 'A', 'space', 'B']);
  const smallAreaAD = eqn.phrase([largeHalf1, 'A_', 'space', 'D']);

  eqn.addForm('0', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.sub('Area_', 'AB'),
    'plus',
    eqn.sub('Area__', 'AD'),
  ]);

  eqn.addForm('1', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.topComment(
      eqn.sub('Area_', 'AB'),
      smallAreaAB,
      'bt',
    ),
    'plus',
    eqn.topComment(
      eqn.sub('Area__', 'AD'),
      smallAreaAD,
      'bt_',
    ),
  ]);

  eqn.addForm('2', [
    eqn.sub('Area', 'triangle'),
    'equals', 'space_0.102',
    areaAB,
    'plus',
    areaAD,
  ], {
    animationTime: { fromPrev: null, fromNext: null },
  });

  eqn.addForm('3', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.brac([
      areaAB,
      'plus',
      half1, 'A_', 'space', 'D',
    ], 'bl', 'br'),
  ], {
    animationTime: { fromPrev: 0, fromNext: null },
  });

  eqn.addForm('4', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.brac([
      eqn.strike([half, 'A'], 'x'), 'space', 'B',
      'plus',
      eqn.strike([half1, 'A_'], 'x_'), 'space', 'D',
    ], 'bl', 'br'),
  ]);

  eqn.addForm('5', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.brac([
      'B',
      'plus',
      'D',
    ], 'bl', 'br'),
  ]);

  eqn.addForm('6', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.topComment(
      eqn.brac([
        'B',
        'plus',
        'D',
      ], 'bl', 'br'),
      'base', 'bt',
    ),
  ]);

  eqn.addForm('7', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    'base',
  ]);

  eqn.addForm('8', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2,
    'space_0.06',
    eqn.topComment(['A__', 'space_0.09'], 'height', 'bt__'),
    'mul',
    'base',
  ]);

  eqn.addForm('9', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2,
    'height',
    'mul',
    'base',
  ]);

  eqn.addForm('10', [
    'Area',
    'equals',
    half2,
    'height',
    'mul',
    'base',
  ]);

  eqn.collection.setPosition(layout.tri2AreaEqnPosition);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  // addToCollection.add(name, eqn.collection);
  // const nav = makeEquationNavigator(
  //   diagram, eqn, layout.tri2AreaEqnNavPosition,
  //   'equationOnly', 'arrows', 'center',
  // );
  addToCollection.add(name, eqn.collection);
}

export type TypeTri3AreaEquationCollection = {
  _Area: DiagramElementPrimative;
  _triangle: DiagramElementPrimative;
  _Area_: DiagramElementPrimative;
  _Area__: DiagramElementPrimative;
  _AB: DiagramElementPrimative;
  __1: DiagramElementPrimative;
  __1_: DiagramElementPrimative;
  __1__: DiagramElementPrimative;
  _AC: DiagramElementPrimative;
  __2: DiagramElementPrimative;
  __2_: DiagramElementPrimative;
  __2__: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _mul: DiagramElementPrimative;
  _minus: DiagramElementPrimative;
  _A: DiagramElementPrimative;
  _A_: DiagramElementPrimative;
  _A__: DiagramElementPrimative;
  _B: DiagramElementPrimative;
  _C: DiagramElementPrimative;
  _x: DiagramElementPrimative;
  _x_: DiagramElementPrimative;
  _v: DiagramElementPrimative;
  _v_: DiagramElementPrimative;
  _v__: DiagramElementPrimative;
  _bl: DiagramElementPrimative;
  _br: DiagramElementPrimative;
  _bt: DiagramElementPrimative;
  _bt_: DiagramElementPrimative;
  _bt__: DiagramElementPrimative;
  _base: DiagramElementPrimative;
  _height: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeTri3AreaEquation = {
  collection: TypeTri3AreaEquationCollection;
} & EquationLegacy;

export function addTri3AreaEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  const colLine = layout.colors.line;
  const colCon = layout.colors.construction;
  const colCon1 = layout.colors.construction1;
  const strikeColor = layout.colors.diagram.disabledDark;
  eqn.createElements(
    {
      Area: ['Area', colLine],
      triangle: ['triangle', colLine],
      Area_: ['Area', colCon, null, null, null, null, 'italic'],
      Area__: ['Area', colCon1],
      AB: ['triangle hB', colCon],
      _1: ['1', colCon],
      _1_: ['1', colCon1],
      _1__: '1',
      AC: ['triangle hC', colCon1],
      _2: ['2', colCon],
      _2_: ['2', colCon1],
      _2__: '2',
      equals: ' = ',
      mul: ' \u00D7 ',
      minus: '  \u2212  ',
      A: [' h', colCon],
      A_: [' h', colCon1],
      A__: [' h', colText],
      B: ['B', colCon],
      C: ['C', colCon1],
      x: diagram.equation.xStrike(strikeColor),
      x_: diagram.equation.xStrike(strikeColor),
      v: diagram.equation.vinculum(colCon),
      v_: diagram.equation.vinculum(colCon1),
      v__: diagram.equation.vinculum(colText),
      bl: diagram.equation.bracket('left', 1, colText),
      br: diagram.equation.bracket('right', 1, colText),
      bt: diagram.equation.brace('top', 3, strikeColor),
      bt_: diagram.equation.brace('top', 3, strikeColor),
      bt__: diagram.equation.brace('top', 1, strikeColor),
      base: ['base', colLine],
      height: [' height', colLine],
    },
    colText,
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  const fracSize = 0.5;

  const half = eqn.sfrac('_1', '_2', 'v', fracSize);
  const half1 = eqn.sfrac('_1_', '_2_', 'v_', fracSize);
  const half2 = eqn.sfrac('_1__', '_2__', 'v__', fracSize);
  const largeHalf = eqn.sfrac('_1', '_2', 'v', fracSize * 1.7);
  const largeHalf1 = eqn.sfrac('_1_', '_2_', 'v_', fracSize * 1.7);
  const areaAB = eqn.phrase([half, 'A', 'space', 'B']);
  const areaAC = eqn.phrase([half1, 'A_', 'space', 'C']);
  const smallAreaAB = eqn.phrase([largeHalf, 'A', 'space', 'B']);
  const smallAreaAC = eqn.phrase([largeHalf1, 'A_', 'space', 'C']);

  eqn.addForm('0', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.sub('Area__', 'AC'),
    'minus',
    eqn.sub('Area_', 'AB'),
  ]);

  eqn.addForm('1', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.topComment(
      eqn.sub('Area__', 'AC'),
      smallAreaAC,
      'bt',
    ),
    'minus',
    eqn.topComment(
      eqn.sub('Area_', 'AB'),
      smallAreaAB,
      'bt_',
    ),
  ]);

  eqn.addForm('2', [
    eqn.sub('Area', 'triangle'),
    'equals', 'space_0.102',
    areaAC,
    'minus',
    areaAB,
  ], {
    animationTime: { fromPrev: null, fromNext: null },
  });

  eqn.addForm('3', [
    eqn.sub('Area', 'triangle'),
    'equals',
    eqn.brac([
      areaAC,
      'minus',
      areaAB,
    ], 'bl', 'br'),
  ], {
    animationTime: { fromPrev: 0, fromNext: null },
  });

  eqn.addForm('4', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.brac([
      eqn.strike([half1, 'A_'], 'x'), 'space', 'C',
      'minus',
      eqn.strike([half, 'A'], 'x_'), 'space', 'B',
    ], 'bl', 'br'),
  ]);

  eqn.addForm('5', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.brac([
      'C',
      'minus',
      'B',
    ], 'bl', 'br'),
  ]);

  eqn.addForm('6', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    eqn.topComment(
      eqn.brac([
        'C',
        'minus',
        'B',
      ], 'bl', 'br'),
      'base', 'bt',
    ),
  ]);

  eqn.addForm('7', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2, 'A__', 'mul',
    'base',
  ]);

  eqn.addForm('8', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2,
    'space_0.06',
    eqn.topComment(['A__', 'space_0.09'], 'height', 'bt__'),
    'mul',
    'base',
  ]);

  eqn.addForm('9', [
    eqn.sub('Area', 'triangle'),
    'equals',
    half2,
    'height',
    'mul',
    'base',
  ]);

  eqn.addForm('10', [
    'Area',
    'equals',
    half2,
    'height',
    'mul',
    'base',
  ]);

  eqn.collection.setPosition(layout.tri3AreaEqnPosition);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  // addToCollection.add(name, eqn.collection);
  // const nav = makeEquationNavigator(
  //   diagram, eqn, layout.tri2AreaEqnNavPosition,
  //   'equationOnly', 'arrows', 'center',
  // );
  addToCollection.add(name, eqn.collection);
  // addToCollection.add(name, nav);
}
