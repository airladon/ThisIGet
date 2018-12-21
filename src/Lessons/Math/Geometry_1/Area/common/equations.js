// @flow
import Fig from 'figureone';

const {
  Point, Diagram, DiagramElementPrimative, DiagramElementCollection,
  EquationLegacy, EqnNavigator,
} = Fig;

export type TypeRectEquationCollection = {
  _Area: DiagramElementPrimative,
  __6: DiagramElementPrimative,
  __10: DiagramElementPrimative,
  __60: DiagramElementPrimative,
  __1: DiagramElementPrimative,
  __1_: DiagramElementPrimative,
  __2: DiagramElementPrimative,
  _m: DiagramElementPrimative,
  _m_: DiagramElementPrimative,
  _mul: DiagramElementPrimative,
  _mul_: DiagramElementPrimative,
  _mul__: DiagramElementPrimative,
  _squares: DiagramElementPrimative,
  _squares_: DiagramElementPrimative,
  _x: {
    _s1: DiagramElementPrimative;
    _s2: DiagramElementPrimative;
  } & DiagramElementCollection,
  _x_: {
    _s1: DiagramElementPrimative;
    _s2: DiagramElementPrimative;
  } & DiagramElementCollection,
  _equals: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeRectEquation = {
  collection: TypeRectEquationCollection;
} & EquationLegacy;

export type TypeRectEquationNav = {
  eqn: TypeRectEquation;
} & EqnNavigator;

export function addRectEqn(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const eqnDescription = diagram.equation
  //   .makeDescription('id__rectangles_equation_desctription');
  const strikeColor = layout.colors.diagram.disabledDark;

  const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  eqn.createElements(
    {
      Area: ['Area', colUnit],
      _6: '6',
      _10: '10',
      _60: '60',
      _1: '1',
      _1_: '1',
      _2: '2',
      m: ['m', colUnit],
      m_: ['m', colUnit],
      mul: ' \u00D7 ',
      mul_: ' \u00D7 ',
      mul__: ' \u00D7 ',
      x: diagram.equation.xStrike(strikeColor),
      x_: diagram.equation.xStrike(strikeColor),
      equals: ' = ',
      // squares: [' squares ', colUnit],
      // rows: [' rows ', colUnit],
    },
    colText,
    // eqnDescription,
    // null,
    // new Point(0.9, -0.052).add(layout.rectEqnPosition),
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;

  eqn.addForm('0', [
    'Area',
    'equals',
    '_6', 'm', 'mul_', '_10', 'm_',
  ]);

  eqn.addForm('1', [
    'Area',
    'equals',
    '_6', 'mul', '_1', 'm', 'mul_', '_10', 'mul__', '_1_', 'm_',
  ], {
    elementMods: {
      m: [null, 'linear'],
      _1: [null, 'linear'],
      mul: [null, 'linear'],
    },
  });

  eqn.addForm('2', [
    'Area',
    'equals',
    '_6', 'mul_', '_10', 'mul__', '_1_', 'm_', 'mul', '_1', 'm',
  ], {
    elementMods: {
      m: [colUnit, 'curved', 'up', 0.7],
      _1: { style: 'curved', direction: 'up', mag: 0.7 },
      mul: { style: 'curved', direction: 'up', mag: 0.7 },
    },
  });

  eqn.addForm('3', [
    'Area',
    'equals',
    eqn.annotation(
      eqn.strike(['_6', 'mul_', '_10'], 'x'),
      [eqn.ann('_60', 'center', 'top', 'center', 'bottom')],
    ),
    'mul__', '_1_', 'm_', 'mul', '_1', 'm',
  ], {
    elementMods: {
      m: [colUnit, 'curved', 'up', 0.7],
      _1: [null, 'curved', 'up', 0.7],
      mul: [null, 'curved', 'up', 0.7],
    },
  });

  // Area = 60 x 1m x 1m
  eqn.addForm('4', [
    'Area',
    'equals',
    '_60', 'mul__', '_1_', 'm_', 'mul', '_1', 'm',
  ], {
    elementMods: {
      m: [null, 'linear'],
      _1: [null, 'linear'],
      mul: [null, 'linear'],
    },
  });

  // Area = 60 x X1m x X1m
  eqn.addForm('5', [
    'Area',
    'equals',
    '_60',
    'mul__',
    eqn.strike('_1_', 'x'),
    'm_',
    'mul',
    eqn.strike('_1', 'x_'),
    'm',
  ]);

  // Area = 60 x m x m
  eqn.addForm('6', [
    'Area',
    'equals',
    '_60', 'mul__',
    'm_', 'mul', 'm',
  ]);

  // Area = 60 x Xm x m^2
  eqn.addForm('7', [
    'Area',
    'equals',
    '_60', 'mul__',
    eqn.strike('m_', 'x_'), 'mul', eqn.sup('m', '_2'),
  ]);

  // Area = 60m^2
  eqn.addForm('8', [
    'Area',
    'equals',
    '_60',
    eqn.sup('m', '_2'),
  ]);

  eqn.collection.setPosition(layout.rectEqnPosition);
  eqn.setCurrentForm('0');
  // addToCollection.add(name, eqn.collection);
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  const nav = diagram.objects.equationNavigator(
    eqn, layout.rectEqnNavPosition,
    'twoLine', 'arrows', 'center',
  );
  // const nav = makeEquationNavigator(
  //   diagram, eqn, layout.rectEqnNavPosition,
  //   'twoLine', 'arrows', 'center',
  // );
  addToCollection.add(name, nav);
  return eqn;
}

export type TypeSimpleRectEquationCollection = {
  _Area: DiagramElementPrimative,
  __6: DiagramElementPrimative,
  __10: DiagramElementPrimative,
  __60: DiagramElementPrimative,
  _mul: DiagramElementPrimative,
  _equals: DiagramElementPrimative,
  _equals_: DiagramElementPrimative,
  _Squares: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeSimpleRectEquation = {
  collection: TypeSimpleRectEquationCollection;
} & EquationLegacy;


export function addSimpleRectEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const strikeColor = layout.colors.diagram.disabledDark;
  const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  eqn.createElements(
    {
      Area: ['Area', colUnit],
      _6: '6',
      _10: '10',
      _60: '60',
      squares: [' squares', colUnit],
      mul: ' \u00D7 ',
      equals: ' = ',
      equals_: ' = ',
    },
    colText,
    null,
    new Point(0, 0).add(layout.rectSimpleEqnPosition),
  );
  // eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'Area',
    'equals',
    '_6', 'mul', '_10',
    'equals_',
    '_60', 'squares',
  ]);

  eqn.collection.setPosition(layout.rectSimpleEqnPosition);
  eqn.setCurrentForm('0');

  addToCollection.add(name, eqn.collection);
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
}


export type TypeNumSquaresEquationCollection = {
  _Area: DiagramElementPrimative,
  __6: DiagramElementPrimative,
  __10: DiagramElementPrimative,
  __60: DiagramElementPrimative,
  _mul: DiagramElementPrimative,
  _equals: DiagramElementPrimative,
  _equals_: DiagramElementPrimative,
  _Squares: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeNumSquaresEquation = {
  collection: TypeNumSquaresEquationCollection;
} & EquationLegacy;

// export type TypeNumSquaresEquationNav = {
//   eqn: TypeRectEquation;
// } & TypeEquationNavigator;

export function addNumSquaresRectEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const strikeColor = layout.colors.diagram.disabledDark;
  const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  const colLine = layout.colors.line;
  eqn.createElements(
    {
      Area: ['Area', colUnit],
      equals: ' = ',
      numSquares: 'num squares',
      numSquares_: 'num squares',
      side: ' ',
      side_: ' ',
      length: 'length ',
      length_: 'length ',
      Width: ['Width', colLine],
      Height: ['Height', colLine],
      A: ['A', colLine],
      B: ['B', colLine],
      mul: '  \u00D7  ',
    },
    colText,
  );
  // eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'Area',
    'equals',
    'numSquares', 'side', 'A',
    'mul',
    'numSquares_', 'side_', 'B',
  ]);

  eqn.addForm('1', [
    'Area',
    'equals',
    'length', 'A',
    'mul',
    'length_', 'B',
  ]);

  eqn.addForm('2', [
    'Area',
    'equals',
    'A',
    'mul',
    'B',
  ]);

  eqn.addForm('3', [
    'Area',
    'equals',
    'Width',
    'mul',
    'Height',
  ]);

  eqn.collection.setPosition(layout.rectNumSquaresEqnPosition);
  eqn.setCurrentForm('0');

  // const nav = makeEquationNavigator(
  //   diagram, eqn, layout.rectEqnNavPosition,
  //   'equationOnly', '', 'center',
  // );
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}

export type TypeSquareRectEquationCollection = {
  _Area: DiagramElementPrimative,
  _equals: DiagramElementPrimative,
  _length: DiagramElementPrimative,
  _Width: DiagramElementPrimative,
  _Height: DiagramElementPrimative,
  _mul: DiagramElementPrimative,
  _A: DiagramElementPrimative,
  _2: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeSquareRectEquation = {
  collection: TypeSquareRectEquationCollection;
} & EquationLegacy;

export function addSquareRectEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  // const strikeColor = layout.colors.diagram.disabledDark;
  // const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  // const colLine = layout.colors.line;
  eqn.createElements(
    {
      Area: 'Area',
      equals: ' = ',
      length: 'length ',
      Width: 'Width',
      Height: 'Height',
      mul: '  \u00D7  ',
      A: 'B',
      _2: '2',
    },
    colText,
  );
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'Area',
    'equals',
    'Width',
    'mul',
    'Height',
  ]);

  eqn.addForm('1', [
    'Area',
    'equals',
    eqn.sup('A', '_2'),
  ]);

  eqn.collection.setPosition(layout.rectNumSquaresEqnPosition);
  eqn.setCurrentForm('0');

  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}


export type TypeSimpleUnitsEquationCollection = {
  _Area: DiagramElementPrimative,
  __60: DiagramElementPrimative,
  _equals: DiagramElementPrimative,
  _m: DiagramElementPrimative,
  __2: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeSimpleUnitsEquation = {
  collection: TypeSimpleUnitsEquationCollection;
} & EquationLegacy;


export function addSimpleUnitsRectEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  const colUnit = layout.colors.unit;
  const colText = layout.colors.diagram.text.base;
  eqn.createElements(
    {
      Area: ['Area', colUnit],
      equals: ' = ',
      _60: '60',
      _1: '1',
      _1_: '1',
      _2: '2',
      m: ['m', colUnit],
    },
    colText,
  );
  // eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'Area',
    'equals',
    '_60', eqn.sup('m', '_2'),
  ]);

  eqn.collection.setPosition(layout.rectNumSquaresEqnPosition);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}

export type TypeSquareEquationCollection = {
  _Area: DiagramElementPrimative,
  __60: DiagramElementPrimative,
  _equals: DiagramElementPrimative,
  _A: DiagramElementPrimative,
  _A_: DiagramElementPrimative,
  _A__: DiagramElementPrimative,
  __2: DiagramElementPrimative,
  _mul: DiagramElementPrimative,
} & DiagramElementCollection;

export type TypeSquareEquation = {
  collection: TypeSquareEquationCollection;
} & EquationLegacy;

export function addSquareEquation(
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
      equals: ' = ',
      A: ['B', colLine],
      A_: ['B', colLine],
      A__: ['B', colLine],
      _2: '2',
      mul: ' \u00D7 ',
      equals_: ' = ',
    },
    colText,
  );
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'Area',
    'equals',
    'A', 'mul', 'A_',
    'equals_',
    eqn.sup('A__', '_2'),
  ]);

  eqn.collection.setPosition(layout.rectSquareEqnPosition);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}

