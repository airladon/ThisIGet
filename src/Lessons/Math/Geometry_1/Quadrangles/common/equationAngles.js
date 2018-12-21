// @flow
import Fig from 'figureone';

const {
  Diagram, DiagramElementCollection, DiagramElementPrimative, EquationLegacy,
} = Fig;

export type TypeABEquationCollection = {
  _a: DiagramElementPrimative;
  _b: DiagramElementPrimative;
  __90: DiagramElementPrimative;
  __180: DiagramElementPrimative;
  _plus1: DiagramElementPrimative;
  _plus2: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _m90l: DiagramElementPrimative;
  _m90r: DiagramElementPrimative;
  _ml: DiagramElementPrimative;
  _al: DiagramElementPrimative;
  _mr: DiagramElementPrimative;
  _ar: DiagramElementPrimative;
  _strike1: DiagramElementPrimative;
  _strike2: DiagramElementPrimative;
  _strike3: DiagramElementPrimative;
  _strike4: DiagramElementPrimative;
  _calc0: DiagramElementPrimative;
  _calc90: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeABEquation = {
  collection: TypeABEquationCollection;
} & EquationLegacy;

export function makeABEquation(diagram: Diagram, layout: Object) {
  const eqn = diagram.equation.makeEqn();
  const strikeColor = layout.colors.diagram.disabledDark;

  const colAngle = layout.colors.angles;
  const colText = layout.colors.diagram.text.base;
  const colDis = layout.colors.diagram.disabled;
  eqn.createElements(
    {
      a: ['a', colAngle],
      b: ['b', colAngle],
      _90: ['90º', colAngle],
      _180: '180º',
      plus1: '  + ',
      plus2: '  + ',
      equals: ' = ',

      m90l: ['- 90º', colText],
      m90r: ['- 90º', colText],
      ml: ['- ', colText],
      al: ['a', colAngle],
      mr: [' - ', colText],
      ar: ['a', colAngle],

      strike1: diagram.equation.xStrike(strikeColor),
      strike2: diagram.equation.xStrike(strikeColor),
      strike3: diagram.equation.xStrike(strikeColor),
      strike4: diagram.equation.xStrike(strikeColor),

      calc0: ['0º', colDis],
      calc90: '90º',
    },
    layout.colors.diagram.text.base,
    // eqnDescription,
    // new Point(0.9, -0.052).add(layout.rectEqnPosition),
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'middle';
  eqn.formAlignment.scale = 1.0;
  eqn.addForm('0', [
    'a', 'plus1', 'b', 'plus2', '_90',
    'equals',
    '_180',
  ]);

  eqn.addForm('1', [
    eqn.annotation(
      ['a', 'plus1', 'b', 'plus2', '_90'],
      [eqn.ann('m90l', 'center', -0.4, 'center', 'top')],
    ),
    'equals',
    eqn.annotation(
      '_180',
      [eqn.ann('m90r', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('2a', [
    eqn.annotation(
      ['a', 'plus1', 'b', 'plus2', eqn.strike('_90', 'strike1')],
      [
        eqn.ann(
          eqn.strike('m90l', 'strike3'),
          'center', -0.4, 'center', 'top',
        ),
        eqn.ann(
          'calc0',
          'right', 1.4, 'left', 'bottom',
        ),
      ],
    ),
    'equals',
    eqn.annotation(
      '_180',
      [eqn.ann('m90r', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('2b', [
    'a', 'plus1', 'b', 'equals',
    eqn.annotation(
      '_180',
      [eqn.ann('m90r', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('2c', [
    'a', 'plus1', 'b', 'equals',
    eqn.annotation(
      eqn.strike('_180', 'strike2'),
      [
        eqn.ann(
          eqn.strike('m90r', 'strike4'),
          'center', -0.4, 'center', 'top',
        ),
        eqn.ann(
          'calc90',
          'right', 1.4, 'left', 'bottom',
        ),
      ],
    ),
  ]);

  eqn.addForm('3', [
    'a', 'plus1', 'b',
    'equals',
    'calc90',
  ]);

  eqn.addForm('4', [
    eqn.annotation(
      ['a', 'plus1', 'b'],
      [eqn.ann(['ml', 'al'], 'center', -0.4, 'center', 'top')],
    ),
    'equals',
    eqn.annotation(
      'calc90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('5', [
    eqn.annotation(
      [eqn.strike('a', 'strike1'), 'plus1', 'b'],
      [eqn.ann(
        eqn.strike(['ml', 'al'], 'strike2'),
        'center', -0.4, 'center', 'top',
      )],
    ),
    'equals',
    eqn.annotation(
      'calc90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('5a', [
    'b',
    'equals',
    eqn.annotation(
      'calc90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('6', [
    'b',
    'equals',
    'calc90',
    'mr', 'ar',
  ]);

  // const nextForm = () => {
  //   eqn.nextForm(2);
  //   diagram.animateNextFrame();
  // };

  // eqn.collection.onClick = nextForm.bind(this);
  // eqn.collection.isTouchable = true;
  // eqn.collection.touchInBoundingRect = true;
  // eqn.collection.setPosition(layout.rectEqnPosition);
  eqn.setCurrentForm('0');
  return eqn;
}


export type TypeADEquationCollection = {
  _a: DiagramElementPrimative;
  _d: DiagramElementPrimative;
  __90: DiagramElementPrimative;
  _plus1: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _ml: DiagramElementPrimative;
  _al: DiagramElementPrimative;
  _mr: DiagramElementPrimative;
  _ar: DiagramElementPrimative;
  _strike1: DiagramElementPrimative;
  _strike2: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeADEquation = {
  collection: TypeABEquationCollection;
} & EquationLegacy;

export function makeADEquation(diagram: Diagram, layout: Object) {
  const eqn = diagram.equation.makeEqn();
  const strikeColor = layout.colors.diagram.disabledDark;

  const colAngle = layout.colors.angles;
  const colText = layout.colors.diagram.text.base;
  eqn.createElements(
    {
      a: ['a', colAngle],
      d: ['d', colAngle],
      _90: '90º',
      plus1: '  + ',
      equals: ' = ',

      ml: ['- ', colText],
      al: ['a', colAngle],
      mr: [' - ', colText],
      ar: ['a', colAngle],

      strike1: diagram.equation.xStrike(strikeColor),
      strike2: diagram.equation.xStrike(strikeColor),
    },
    layout.colors.diagram.text.base,
    // eqnDescription,
    // new Point(0.9, -0.052).add(layout.rectEqnPosition),
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'middle';
  eqn.formAlignment.scale = 1.0;

  eqn.addForm('0', [
    'a', 'plus1', 'd',
    'equals',
    '_90',
  ]);

  eqn.addForm('1', [
    eqn.annotation(
      ['a', 'plus1', 'd'],
      [eqn.ann(['ml', 'al'], 'center', -0.4, 'center', 'top')],
    ),
    'equals',
    eqn.annotation(
      '_90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('2', [
    eqn.annotation(
      [eqn.strike('a', 'strike1'), 'plus1', 'd'],
      [eqn.ann(
        eqn.strike(['ml', 'al'], 'strike2'),
        'center', -0.4, 'center', 'top',
      )],
    ),
    'equals',
    eqn.annotation(
      '_90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('3', [
    'd',
    'equals',
    eqn.annotation(
      '_90',
      [eqn.ann(['mr', 'ar'], 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('4', [
    'd',
    'equals',
    '_90', 'mr', 'ar',
  ]);

  // const nextForm = () => {
  //   eqn.nextForm(2);
  //   diagram.animateNextFrame();
  // };

  // eqn.collection.onClick = nextForm.bind(this);
  // eqn.collection.isTouchable = true;
  // eqn.collection.touchInBoundingRect = true;
  // eqn.collection.setPosition(layout.rectEqnPosition);
  eqn.setCurrentForm('0');
  return eqn;
}

export type TypeBCEquationCollection = {
  _a: DiagramElementPrimative;
  _c: DiagramElementPrimative;
  _l90: DiagramElementPrimative;
  _r90: DiagramElementPrimative;
  _minus: DiagramElementPrimative;
  _plus: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _lm90: DiagramElementPrimative;
  _rm90: DiagramElementPrimative;
  _lcalc0: DiagramElementPrimative;
  _rcalc0: DiagramElementPrimative;
  _lplus: DiagramElementPrimative;
  _la: DiagramElementPrimative;
  _rplus: DiagramElementPrimative;
  _ra: DiagramElementPrimative;
  _strike1: DiagramElementPrimative;
  _strike2: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeBCEquation = {
  collection: TypeABEquationCollection;
} & EquationLegacy;

export function makeBCEquation(diagram: Diagram, layout: Object) {
  const eqn = diagram.equation.makeEqn();
  const strikeColor = layout.colors.diagram.disabledDark;

  const colAngle = layout.colors.angles;
  const colText = layout.colors.diagram.text.base;
  eqn.createElements(
    {
      a: ['a', colAngle],
      c: ['c', colAngle],
      l90: ['90º', colAngle],
      r90: '90º',
      minus: [' - ', colAngle],
      plus: ' + ',
      equals: ' = ',

      lm90: '- 90º',
      rm90: '- 90º',

      lcalc0: '0º',
      rcalc0: '0º',

      lplus: ['+ ', colText],
      la: ['a', colAngle],
      rplus: [' + ', colText],
      ra: ['a', colAngle],

      strike1: diagram.equation.xStrike(strikeColor),
      strike2: diagram.equation.xStrike(strikeColor),
    },
    layout.colors.diagram.text.base,
    // eqnDescription,
    // new Point(0.9, -0.052).add(layout.rectEqnPosition),
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'middle';
  eqn.formAlignment.scale = 1.0;

  eqn.addForm('0', [
    'l90', 'minus', 'a', 'plus', 'c',
    'equals',
    'r90',
  ]);

  eqn.addForm('1', [
    eqn.annotation(
      ['l90', 'minus', 'a', 'plus', 'c'],
      [eqn.ann('lm90', 'center', -0.4, 'center', 'top')],
    ),
    'equals',
    eqn.annotation(
      'r90',
      [eqn.ann('rm90', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('2', [
    eqn.annotation(
      [eqn.annotation(
        eqn.strike('l90', 'strike1'),
        [eqn.ann(
          'lcalc0',
          'right', 1.4, 'left', 'bottom',
        )],
      ), 'minus', 'a', 'plus', 'c'],
      [eqn.ann(
        eqn.strike('lm90', 'strike2'),
        'center', -0.4, 'center', 'top',
      )],
    ),
    'equals',
    eqn.annotation(
      'r90',
      [eqn.ann('rm90', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('3', [
    'minus', 'a', 'plus', 'c',
    'equals',
    eqn.annotation(
      'r90',
      [eqn.ann('rm90', 'center', -0.4, 'center', 'top')],
    ),
  ]);

  eqn.addForm('4', [
    'minus', 'a', 'plus', 'c',
    'equals',
    eqn.annotation(
      eqn.annotation(
        eqn.strike('r90', 'strike1'),
        [eqn.ann(
          'rcalc0',
          'right', 1.4, 'left', 'bottom',
        )],
      ),
      [eqn.ann(
        eqn.strike('rm90', 'strike2'),
        'center', -0.4, 'center', 'top',
      )],
    ),
  ]);

  eqn.addForm('5', [
    'minus', 'a', 'plus', 'c',
    'equals',
    'rcalc0',
  ]);

  eqn.addForm('6', [
    eqn.annotation(
      ['minus', 'a', 'plus', 'c'],
      [
        eqn.ann(
          ['lplus', 'la'],
          'center', -0.4, 'center', 'top',
        ),
      ],
    ),
    'equals',
    eqn.annotation(
      'rcalc0',
      [
        eqn.ann(
          ['rplus', 'ra'],
          'center', -0.4, 'center', 'top',
        ),
      ],
    ),
  ]);

  eqn.addForm('7', [
    eqn.annotation(
      [eqn.strike(['minus', 'a'], 'strike1'), 'plus', 'c'],
      [
        eqn.ann(
          eqn.strike(['lplus', 'la'], 'strike2'),
          'center', -0.4, 'center', 'top',
        ),
      ],
    ),
    'equals',
    eqn.annotation(
      'rcalc0',
      [
        eqn.ann(
          ['rplus', 'ra'],
          'center', -0.4, 'center', 'top',
        ),
      ],
    ),
  ]);

  eqn.addForm('8', [
    'c',
    'equals',
    eqn.annotation(
      'rcalc0',
      [
        eqn.ann(
          ['rplus', 'ra'],
          'center', -0.4, 'center', 'top',
        ),
      ],
    ),
  ]);

  eqn.addForm('9', [
    'c',
    'equals',
    'rcalc0', 'rplus', 'ra',
  ]);

  eqn.addForm('10', [
    'c',
    'equals',
    'ra',
  ]);

  eqn.addForm('11', [
    'c',
    'equals',
    'ra',
  ]);

  // const nextForm = () => {
  //   eqn.nextForm(2);
  //   diagram.animateNextFrame();
  // };

  // eqn.collection.onClick = nextForm.bind(this);
  // eqn.collection.isTouchable = true;
  // eqn.collection.touchInBoundingRect = true;
  // eqn.collection.setPosition(layout.rectEqnPosition);
  eqn.setCurrentForm('0');
  return eqn;
}
