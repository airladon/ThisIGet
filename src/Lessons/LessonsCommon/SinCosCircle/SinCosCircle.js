// @flow
import Fig from 'figureone';
import AngleCircle from '../AngleCircle/AngleCircle';
import type { circleType, varStateType, angleAnnotationType } from '../AngleCircle/AngleCircle';
import CommonLessonDiagram from '../CommonLessonDiagram';

const {
  DiagramElementPrimative, DiagramElementCollection,
  Transform, Point, DiagramFont, EquationForm,
} = Fig;
const { polarToRect } = Fig.tools.g2;

type rightAngleType = {
  _horizontal: DiagramElementPrimative;
  _vertical: DiagramElementPrimative;
} & DiagramElementCollection;

type quadAngle = {
  _arc: DiagramElementPrimative;
  _text: DiagramElementPrimative;
  textOffset: number;
  updateRotation: (number, number, boolean) => void;
  setAngleText: (string) => void;
} & DiagramElementCollection;

export type SinCosCircleAngleAnnotationType = angleAnnotationType;
// export type sineLineType = {
//     _line: DiagramElementPrimative;
//     _label: DiagramElementPrimative;
//     setText: (string) => void;
//     textXOffset: number;
//     textYOffset: number;
//     updateRotation: (number, number, boolean) => void;
//   } & DiagramElementCollection;

type sineTextType = {
   _text: DiagramElementPrimative;
   _equals: DiagramElementPrimative;
   _value: DiagramElementPrimative;
  setText: (string) => void;
  updateRotation: (number) => void;
} & DiagramElementCollection;

export type equationType = {
  eqn: EquationForm;
} & DiagramElementCollection;

export type sineCosineLineType = {
  _label: equationType;
  _line: DiagramElementPrimative;
  updateRotation: (number, number) => void;
  textXOffset: number;
  textYOffset: number;
  textXMultiplier: number;
  textXLimit: number;
  textYLimit: number;
} & DiagramElementCollection;

export type SinCosCircleType = {
  _rightAngle: rightAngleType;
  _quad0: DiagramElementPrimative;
  _quad1: DiagramElementPrimative;
  _quad2: DiagramElementPrimative;
  _quad3: DiagramElementPrimative;
  _quad0Angle: quadAngle;
  _quad1Angle: quadAngle;
  _quad2Angle: quadAngle;
  _quad3Angle: quadAngle;
  _mainAngle: {
    _arc: DiagramElementPrimative;
    _text: DiagramElementPrimative;
    updateRotation: (number, boolean) => void;
  } & DiagramElementCollection;
  _symmetry: {
    _line: DiagramElementPrimative;
    _sine: sineCosineLineType;
    setSineText: (string) => void;
    updateRotation: (number, number, boolean) => void;
  } & DiagramElementCollection;
  _sineLine: sineCosineLineType;
  _cosineLine: sineCosineLineType;
  _axes: {
    _x: DiagramElementPrimative;
    _y: DiagramElementPrimative;
  } & DiagramElementCollection;
} & circleType;

type quadrantType = 0 | 1 | 2 | 3;

export type SinCosVarStateType = {
    quadrant: quadrantType;
  } & varStateType;

export type SineCollectionType = {
  _circle: SinCosCircleType;
  varState: SinCosVarStateType;
  enableAutoChange: boolean;
  quadrants: Array<number>;
  _quad1Eqn: DiagramElementPrimative;
  _quad2Eqn: DiagramElementPrimative;
  _quad3Eqn: DiagramElementPrimative;
  _unitsSelector: DiagramElementPrimative;
  _sineText: sineTextType;
  interactiveSinePage: boolean;
};

export type textEquationType = {
  _text: DiagramElementPrimative;
  layout: () => void;
} & equationType;

export const labelFont = new DiagramFont(
  'Times New Roman, serif',
  'italic',
  0.18,
  '400',
  'left',
  'alphabetic',
  [1, 1, 1, 1],
);

const quadrantAngles = ['θ', 'π - θ', 'θ - π', '2π - θ'];
const quadrantOffsets = [0.07, 0.12, 0.12, 0.15];
const sineOffsets = [0.03, 0.22, 0.22, 0.25];

export class SinCosCircle extends AngleCircle {
  +_circle: SinCosCircleType;
  +varState: SinCosVarStateType;
  enableAutoChange: boolean;
  quadrants: Array<number>;
  _quad1Eqn: DiagramElementPrimative;
  _quad2Eqn: DiagramElementPrimative;
  _quad3Eqn: DiagramElementPrimative;
  _unitsSelector: DiagramElementPrimative;
  _sineText: sineTextType;
  interactiveSinePage: boolean;

  // makeSineEqualsEquation() {
  //   const equationElements = this.diagram.equation.elements({
  //     sin1: 'sin',
  //     sin2: 'sin',
  //     theta1: 'θ',
  //     theta2: 'θ',
  //     plus: ' + ',
  //     minus: ' - ',
  //     pi: 'π',
  //     two: '2',
  //     equals: '=',
  //   });
  //   equationElements.showQuad2 = () => {
  //     equationElements.showOnly([
  //       'sin1', 'theta1', 'equals',
  //       'sin2', 'pi', 'mins', 'theta',
  //     ]);
  //   }
  //   return equationElements;
  // }
  // makeEquationText(
  //   text: string,
  //   color: Array<number> = [1, 1, 1, 1],
  // ): textEquationType {
  //   labelFont.setColor(color);
  //   const collection = this.diagram.equation.elements(
  //     { text },
  //     labelFont,
  //   );
  //   collection.transform.index = 0;
  //   collection.transform = collection.transform.rotate(0);

  //   const eqn = this.diagram.equation.make(collection);
  //   eqn.createEq(['text']);
  //   collection.setFirstTransform(this.diagram.diagramToGLSpaceTransform);
  //   collection.layout = () => {
  //     eqn.arrange(0.6, 'center', 'middle', new Point(0, 0));
  //   };
  //   collection.layout();
  //   // eqn.arrange(0.6, 'center', 'middle', new Point(0, 0));
  //   collection.eqn = eqn;
  //   return collection;
  // }

  makeQuad1Equation() {
    return this.shapes.htmlText(
      'sin θ  =  sin (π - θ)', 'id__sine_eqn_quad2', 'lesson__sine_eqn',
      this.layout.quadEqn.position, 'middle', 'center',
    );
  }

  makeQuad2Equation() {
    return this.shapes.htmlText(
      'sin θ  =  sin (θ - π)', 'id__sine_eqn_quad3', 'lesson__sine_eqn',
      this.layout.quadEqn.position, 'middle', 'center',
    );
  }

  makeQuad3Equation() {
    return this.shapes.htmlText(
      'sin θ  =  sin (2π - θ)', 'id__sine_eqn_quad4', 'lesson__sine_eqn',
      this.layout.quadEqn.position, 'middle', 'center',
    );
  }

  makeDegreesRadiansSelector() {
    const radSpan = document.createElement('span');
    const degSpan = document.createElement('span');
    radSpan.setAttribute('id', 'id_diagram_units_selector_radians');
    degSpan.setAttribute('id', 'id_diagram_units_selector_degrees');
    radSpan.appendChild(document.createTextNode('radians'));
    degSpan.appendChild(document.createTextNode('degrees'));
    const slash = document.createTextNode(' / ');
    const elements = [radSpan, slash, degSpan];
    const selector = this.shapes.htmlElement(
      elements, 'id_diagram_units_selector', '',
      this.layout.unitsSelector.position,
      'middle', 'center',
    );

    const element = document.getElementById('id_diagram_units_selector');
    if (element != null) {
      element.onclick = this.toggleUnits.bind(this, null);
    }
    return selector;
  }

  makeSymmetry() {
    const symmetry = this.shapes.collection();
    const line = this.makeLine(
      new Point(0, 0), this.layout.radius, this.layout.quadAngles.lineWidth,
      this.colors.quadAngles, new Transform()
        .rotate(0),
    );
    symmetry.add('line', line);
    const sine = this.makeSineLine();
    symmetry.add('sine', sine);
    symmetry.updateRotation = (r: number, quad: number, override: boolean = false) => {
      if (symmetry.isShown || override) {
        let angleToDraw = r;
        if (quad === 1) {
          angleToDraw = Math.PI - r;
        }
        if (quad === 2) {
          angleToDraw = r - Math.PI;
        }
        if (quad === 3) {
          angleToDraw = Math.PI * 2 - r;
        }
        line.transform.updateRotation(angleToDraw);
        sine.updateRotation(this.layout.radius, angleToDraw);
      }
    };

    // eslint-disable-next-line
    symmetry.setSineText = (newText: string) => {
      // sine._label._sine.drawingObject.element.innerHTML = newText;
    };
    return symmetry;
  }

  makeAngle(
    radius: number,
    name: string,
    label: string,
    startAngle: number = 0,
    direction: -1 | 1 = 1,
    textOffset: number = 0.15,
  ) {
    let clockwise = false;
    if (direction === -1) {
      clockwise = true;
    }
    const angle = this.shapes.collection(new Transform().translate(0, 0));
    const arc = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius,
      width: this.layout.quadAngles.lineWidth,
      rotation: startAngle,
      clockwise,
      color: this.layout.colors.quadAngles,
      transform: new Transform()
        .rotate(0)
        .translate(0, 0),
    });
    //   this.layout.anglePoints,
    //   radius, this.layout.quadAngles.lineWidth,
    //   startAngle, direction, this.layout.anglePoints,
    //   this.layout.colors.quadAngles, new Transform()
    //     .rotate(0)
    //     .translate(0, 0),
    // );

    const text = this.shapes.htmlText(
      label, `id_diagram_quadAngles_${name}`, 'diagram__quad_angles',
      new Point(0, 0), 'middle', 'center',
    );

    angle.add('arc', arc);
    angle.add('text', text);
    angle.textOffset = textOffset;
    angle.updateRotation = (r: number, quad: number, override: boolean = false) => {
      if (angle.isShown || override) {
        let angleToDraw = r;
        if (quad === 1) {
          angleToDraw = Math.PI - r;
        }
        if (quad === 2) {
          angleToDraw = r - Math.PI;
        }
        if (quad === 3) {
          angleToDraw = Math.PI * 2 - r;
        }
        arc.angleToDraw = angleToDraw;
        const position = polarToRect(
          radius + angle.textOffset,
          startAngle + direction * angleToDraw / 2,
        );
        const ySign = position.y / Math.abs(position.y);
        if (Math.abs(position.y) < this.layout.textYLimit) {
          position.y = this.layout.textYLimit * ySign;
        }
        text.setPosition(position);
        if (!override) {
          if (angleToDraw < 0.14) {
            text.hide();
          } else {
            text.show();
          }
        }
      }
    };
    angle.setAngleText = (newText: string) => {
      angle._text.drawingObject.element.innerHTML = newText;
    };
    return angle;
  }

  makeSineText() {
    const sineText = this.shapes.collection(this.layout.angleEqualsText.left);

    sineText.add('text', this.shapes.htmlText(
      'Vertical', 'id__sine_angle_sine__sine_text', '',
      new Point(-0.07, -0.2), 'middle', 'right',
    ));
    sineText.add('equals', this.shapes.htmlText(
      '=', 'id__sine_angle_sine__sine_equals', '',
      new Point(0, -0.2), 'middle', 'left',
    ));
    sineText.add('value', this.shapes.htmlText(
      '0', 'id__sine_angle_sine_angle__sine_value', '',
      new Point(0.42, -0.2), 'middle', 'right',
    ));

    sineText.setText = (newText: string) => {
      sineText._text.drawingObject.element.innerHTML = newText;
    };
    sineText.updateRotation = (r: number) => {
      const value = Math.sin(r);
      sineText._value.drawingObject.element.innerHTML = value.toFixed(2);
    };
    return sineText;
  }

  makeMainAngle() {
    const angle = this.shapes.collection(new Transform().translate(0, 0));
    const arc = this.shapes.polygon({
      sides: this.layout.anglePoints,
      radius: this.layout.mainAngle.radius,
      width: this.layout.mainAngle.lineWidth,
      color: this.layout.colors.angle,
      transform: new Transform()
        .rotate(0)
        .translate(0, 0),
    });

    const text = this.shapes.htmlText(
      'θ', 'id_diagram_main_angle_theta', '',
      new Point(0, 0), 'middle', 'center',
    );

    angle.add('arc', arc);
    angle.add('text', text);

    angle.updateRotation = (r: number, override: boolean = false) => {
      if (angle.isShown || override === true) {
        arc.angleToDraw = r;
        const position = polarToRect(
          this.layout.mainAngle.radius + this.layout.mainAngle.textOffset,
          Math.min(r / 2, Math.PI),
        );
        const ySign = position.y / Math.abs(position.y);
        if (Math.abs(position.y) < this.layout.textYLimit) {
          position.y = this.layout.textYLimit * ySign;
        }
        if (r < 0.52) {
          text.hide();
        } else {
          text.show();
        }
        text.setPosition(position);
      }
    };

    angle.setText = (newText: string) => {
      angle._text.drawingObject.element.innerHTML = newText;
    };
    return angle;
  }

  makeRightAngle() {
    const rad = this.layout.angleRadius * 0.9;
    const rightAngle = this.shapes.collection();
    rightAngle.add('vertical', this.makeLine(
      new Point(0, 0), rad, this.layout.linewidth,
      this.colors.angle, new Transform()
        .rotate(Math.PI / 2)
        .translate(rad, this.layout.linewidth / 2),
    ));
    rightAngle.add('horizontal', this.makeLine(
      new Point(0, 0), rad, this.layout.linewidth,
      this.colors.angle, new Transform()
        .translate(this.layout.linewidth / 2, rad),
    ));
    return rightAngle;
  }

  makeQuad(num: number = 0) {
    let xSign = 1;
    let ySign = 1;
    if (num === 1 || num === 2) {
      xSign = -1;
    }
    if (num === 2 || num === 3) {
      ySign = -1;
    }
    const color = this.colors.quadrant.slice();
    color[3] = 0.6;
    return this.shapes.polygon({
      fill: true,
      sides: 4,
      radius: this.layout.radius / 2 * Math.sqrt(2),
      color,
      transform: new Transform()
        .rotate(Math.PI / 4)
        .translate(
          xSign * this.layout.radius / 2,
          ySign * this.layout.radius / 2,
        ),
    });
  }

  makeAxesAndGrid() {
    const grid = this.shapes.axes(
      this.layout.grid.width, this.layout.grid.height, this.layout.grid.range,
      0, 0, this.layout.grid.step, this.layout.grid.step,
      0.08, true, this.colors.axes, this.colors.grid, this.layout.grid.position,
    );
    grid._x.props.majorTicks.fontColor = this.colors.grid;
    grid._x.props.majorTicks.color = this.colors.grid;
    grid._x.props.majorTicks.labelOffset = new Point(-0.07, 0);
    grid._x.props.majorTicks.labels[5] = '0';
    grid._x.props.majorTicks.width = 0.005;
    grid._x.rebuild();
    grid._y.props.majorTicks.fontColor = this.colors.grid;
    grid._y.props.majorTicks.color = this.colors.grid;
    grid._y.props.majorTicks.labelOffset = new Point(-0.02, -0.05);
    grid._y.props.majorTicks.labels[5] = '';
    grid._y.props.majorTicks.width = 0.005;
    grid._y.rebuild();
    // console.log(grid._grid)
    return grid;
  }

  makeSineLine(text: string = 'sin θ', color: Array<number> = this.colors.sine) {
    return this.makeSineCosineLine(
      this.makeEquationText(text, color),
      true, color,
    );
  }

  makeCosineLine(text: string = 'cos θ', color: Array<number> = this.colors.sine) {
    return this.makeSineCosineLine(
      this.makeEquationText(text, color),
      false, color,
    );
  }

  // makeSineLine(id: string) {
  //   const line = this.makeLine(
  //     new Point(0, 0),
  //     this.layout.radius,
  //     this.layout.sine.lineWidth,
  //     this.colors.sine,
  //     new Transform().scale(1, 1).rotate(Math.PI / 2).translate(0, 0),
  //   );
  //   const text = this.shapes.htmlText(
  //     'sin θ', `id_diagram_sine_line_${id}`, 'diagram__sine_line',
  //     new Point(0, 0), 'middle', 'center',
  //   );
  //   const sine = this.shapes.collection();
  //   sine.add('line', line);
  //   sine.add('text', text);
  //   sine.textXOffset = 0.15;
  //   sine.textYOffset = 0;
  //   sine.textYLimit = this.layout.textYLimit;
  //   sine.textYMultiplier = 1 / 2;
  //   sine.updateRotation = (radius: number, angle: number, override: boolean = false) => {
  //     if (sine.isShown || override) {
  //       const endX = radius * Math.cos(angle);
  //       const endY = radius * Math.sin(angle);
  //       const endYSign = endY / Math.abs(endY);
  //       sine._line.setPosition(endX, 0);
  //       sine._line.transform.updateScale(endY / radius, 1);
  //       let textY = endY * sine.textYMultiplier + sine.textYOffset;
  //       if (Math.abs(textY) < sine.textYLimit) {
  //         textY = sine.textYLimit * endYSign;
  //       }
  //       sine._text.setPosition(endX + endX / Math.abs(endX) * sine.textXOffset, textY);
  //     }
  //   };
  //   sine.setText = (newText: string) => {
  //     sine._text.drawingObject.element.innerHTML = newText;
  //   };
  //   return sine;
  // }

  // makeCosineLine(id: string) {
  //   const line = this.makeLine(
  //     new Point(0, 0),
  //     this.layout.radius,
  //     this.layout.cosine.lineWidth,
  //     this.colors.cosine,
  //     new Transform().scale(1, 1).rotate(0).translate(0, 0),
  //   );
  //   const text = this.shapes.htmlText(
  //     'cos θ', `id_diagram_cosine_line_${id}`, 'diagram__cosine_line',
  //     new Point(0, 0), 'middle', 'center',
  //   );
  //   const cosine = this.shapes.collection();
  //   cosine.add('line', line);
  //   cosine.add('text', text);
  //   cosine.textYOffset = 0.08;
  //   cosine.textXOffset = 0;
  //   cosine.textXLimit = this.layout.textXLimit;
  //   cosine.updateRotation = (radius: number, angle: number, override: boolean = false) => {
  //     if (cosine.isShown || override) {
  //       const endX = radius * Math.cos(angle);
  //       const endY = radius * Math.sin(angle);
  //       const endYSign = endY / Math.abs(endY);
  //       cosine._line.setPosition(0, endY);
  //       cosine._line.transform.updateScale(endX / radius, 1);
  //       let textX = endX / 2;
  //       if (Math.abs(textX) < cosine.textXLimit) {
  //         textX = cosine.textYLimit * endYSign;
  //       }
  //       cosine._text.setPosition(textX, endY + endY / Math.abs(endY) * cosine.textYOffset);
  //     }
  //   };
  //   cosine.setText = (newText: string) => {
  //     cosine._text.drawingObject.element.innerHTML = newText;
  //   };
  //   return cosine;
  // }

  makeSineCosineLine(
    label: equationType,
    sine: boolean = true,
    color: Array<number> = [1, 1, 1, 1],
  ): sineCosineLineType {
    const rot = sine ? Math.PI / 2 : 0;
    const line = this.makeLine(
      new Point(0, 0),
      this.layout.radius,
      this.layout.sine.lineWidth,
      color,
      new Transform().scale(1, 1).rotate(rot).translate(0, 0),
    );

    const sineCosine = this.shapes.collection();
    sineCosine.add('line', line);
    sineCosine.add('label', label);

    sineCosine.textYLimit = sine ? this.layout.textYLimit : 0;
    sineCosine.textXLimit = sine ? 0 : this.layout.textXLimit;
    sineCosine.textXOffset = sine ? label.eqn.width / 2 * 1.1 : 0;
    sineCosine.textYOffset = sine ? 0 : label.eqn.height / 2 * 1.1;
    sineCosine.textYMultiplier = sine ? 0.5 : 0;

    sineCosine.updateRotation = (radius: number, angle: number) => {
      const endX = radius * Math.cos(angle);
      const endY = radius * Math.sin(angle);
      const endYSign = endY / Math.abs(endY);
      let textX = 0;
      let textY = 0;
      if (sine) {
        sineCosine._line.setPosition(endX, 0);
        sineCosine._line.transform.updateScale(endY / radius, 1);
        textY = endY * sineCosine.textYMultiplier + sineCosine.textYOffset;
        if (Math.abs(textY) < sineCosine.textYLimit) {
          textY = sineCosine.textYLimit * endYSign;
        }
        sineCosine._label.setPosition(endX + endX / Math.abs(endX) * sineCosine.textXOffset, textY);
      } else {
        sineCosine._line.setPosition(0, endY);
        sineCosine._line.transform.updateScale(endX / radius, 1);
        textX = endX / 2;
        if (Math.abs(textX) < sineCosine.textXLimit) {
          textX = sineCosine.textYLimit * endYSign;
        }
        sineCosine._label.setPosition(textX, endY + endY / Math.abs(endY) * sineCosine.textYOffset);
      }
    };
    sineCosine.setText = (newText: string) => {
      sineCosine._label._text.drawingObject.text[0].text = newText;
      sineCosine._label.layout();
    };
    return sineCosine;
  }

  addToSinCosCircle() {
    this.add('unitsSelector', this.makeDegreesRadiansSelector());
    this.add('quad1Eqn', this.makeQuad1Equation());
    this.add('quad2Eqn', this.makeQuad2Equation());
    this.add('quad3Eqn', this.makeQuad3Equation());
    this.add('sineText', this.makeSineText());

    this._circle.add('rightAngle', this.makeRightAngle());
    const rad = this.layout.quadAngles.radius;
    this._circle.add('quad0Angle', this.makeAngle(rad, '0', 'θ', 0, 1, quadrantOffsets[0]));
    this._circle.add('quad1Angle', this.makeAngle(rad, '1', 'π - θ', Math.PI, -1, quadrantOffsets[1]));
    this._circle.add('quad2Angle', this.makeAngle(rad, '2', 'θ - π', Math.PI, 1, quadrantOffsets[2]));
    this._circle.add('quad3Angle', this.makeAngle(rad, '3', '2π - θ', 0, -1, quadrantOffsets[3]));
    this._circle.add('symmetry', this.makeSymmetry());

    this._circle.add('sineLine', this.makeSineLine('vertical'));
    this._circle.add('cosineLine', this.makeCosineLine('horizontal'));
    // this._circle.add('sineLine', this.makeSineLine('sine'));
    // this._circle.add('cosineLine', this.makeCosineLine('cosine'));
    this._circle.add('mainAngle', this.makeMainAngle());
    this._circle.add('quad0', this.makeQuad(0));
    this._circle.add('quad1', this.makeQuad(1));
    this._circle.add('quad2', this.makeQuad(2));
    this._circle.add('quad3', this.makeQuad(3));
    this._circle.add('grid', this.makeAxesAndGrid());

    this._circle.drawOrder = [
      ...this._circle.drawOrder.slice(-5),
      ...this._circle.drawOrder.slice(0, -5),
    ];
    // console.log(this._circle.order)
  }

  showDegrees() {
    this.varState.radialLines = 360;
    this._angleText.setUnits('&deg;');
    this.updateNumSectionsText();
    this._angleText.showAll();
    this.diagram.animateNextFrame();
  }

  showRadians() {
    this.varState.radialLines = Math.PI * 2;
    this._angleText.setUnits('radians');
    this.updateNumSectionsText();
    this._angleText.showAll();
    this.diagram.animateNextFrame();
  }

  constructor(
    layout: Object,
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
    this.diagram = diagram;
    this.varState = {
      radialLines: 4,
      rotation: 0,
      quadrant: 0,
    };
    this.enableAutoChange = true;
    this.addToSinCosCircle();
    this._circle.setPosition(this.layout.circle.bottomRight);
    this.quadrants = [0, 1, 2, 3];
    this.interactiveSinePage = false;
  }

  updateRotation(override: boolean = false) {
    super.updateRotation();
    const r = this.varState.rotation;
    const q = this.varState.quadrant;
    this._circle._sineLine.updateRotation(this.layout.radius, r);
    this._circle._cosineLine.updateRotation(this.layout.radius, r);
    this._circle._mainAngle.updateRotation(r, override);
    this._sineText.updateRotation(r);
    if (this.interactiveSinePage) {
      this._circle._quad0Angle.updateRotation(r, q, override);
      this._circle._quad1Angle.updateRotation(r, q, override);
      this._circle._quad2Angle.updateRotation(r, q, override);
      this._circle._quad3Angle.updateRotation(r, q, override);
      this._circle._symmetry.updateRotation(r, q, override);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  calcQuadrant(angle: number, thresholds: Object): quadrantType {
    if (angle >= thresholds.quad0.min && angle <= thresholds.quad0.max) {
      return 0;
    }
    if (angle >= thresholds.quad1.min && angle <= thresholds.quad1.max) {
      return 1;
    }
    if (angle >= thresholds.quad2.min && angle <= thresholds.quad2.max) {
      return 2;
    }
    return 3;
  }

  calcQuadrantDegrees(angle: number): quadrantType {
    const thresholds = {
      quad0: {
        min: 0,
        max: 89,
      },
      quad1: {
        min: 90,
        max: 179,
      },
      quad2: {
        min: 180,
        max: 269,
      },
      quad3: {
        min: 270,
        max: 359,
      },
    };
    return this.calcQuadrant(angle, thresholds);
  }

  calcQuadrantRadians(angle: number): quadrantType {
    const thresholds = {
      quad0: {
        min: 0,
        max: 1.56,
      },
      quad1: {
        min: 1.57,
        max: 3.13,
      },
      quad2: {
        min: 3.14,
        max: 4.70,
      },
      quad3: {
        min: 4.71,
        max: 6.27,
      },
    };
    return this.calcQuadrant(angle, thresholds);
  }

  toggleUnits(toUnit: 'rad' | 'deg' | null) {
    const elemDeg = document.getElementById('id_diagram_units_selector_degrees');
    const elemRad = document.getElementById('id_diagram_units_selector_radians');
    let unit = toUnit;
    if (toUnit === null) {
      if (this.varState.radialLines === 360) {
        unit = 'rad';
      } else {
        unit = 'deg';
      }
    }
    if (elemDeg != null && elemRad != null) {
      if (unit === 'rad') {
        this.hideDegrees();
        this.showRadians();
        elemDeg.classList.remove('lesson__sine_cos_diagram_units_selected');
        elemRad.classList.add('lesson__sine_cos_diagram_units_selected');
        // this.setParagraphUnits('rad');
      } else if (unit === 'deg') {
        this.hideRadians();
        this.showDegrees();
        elemRad.classList.remove('lesson__sine_cos_diagram_units_selected');
        elemDeg.classList.add('lesson__sine_cos_diagram_units_selected');
        // this.setParagraphUnits('deg');
      }
    }
  }

  goToStepOld(step: number) {
    const elem1 = document.getElementById('id_lesson_quadrant_steps_1');
    const elem2 = document.getElementById('id_lesson_quadrant_steps_2');
    const elem3 = document.getElementById('id_lesson_quadrant_steps_3');
    const elem4 = document.getElementById('id_lesson_quadrant_steps_4');
    if (elem1 && elem2 && elem3 && elem4) {
      const elems = [elem1, elem2, elem3, elem4];
      elems.forEach((e, index) => {
        if (index === step) {
          e.classList.add('lesson__sine_cos_diagram_step_selected');
        } else {
          e.classList.remove('lesson__sine_cos_diagram_step_selected');
        }
      });
      const quad = this.varState.quadrant;

      // if (step === 3) {
      const eqn2 = document.getElementById('id__sine_eqn_quad2');
      const eqn3 = document.getElementById('id__sine_eqn_quad3');
      const eqn4 = document.getElementById('id__sine_eqn_quad4');
      if (eqn2 && eqn3 && eqn4) {
        [eqn2, eqn3, eqn4].forEach((eqn, index) => {
          // console.log(quad, index + 1)
          if (quad === index + 1 && step === 3) {
            eqn.classList.add('lesson__sine_eqn_selected');
          } else {
            eqn.classList.remove('lesson__sine_eqn_selected');
          }
        });
      }

      if (step === -1) {
        this._circle._symmetry.hideAll();
        this._circle._quad0Angle.hideAll();
        this._circle[`_quad${quad}Angle`].hideAll();
      }
      if (step === 0) {
        this.updateRotation(true);
        this._circle._symmetry.hideAll();
        this._circle._quad0Angle.hideAll();
        this._circle[`_quad${quad}Angle`].showAll();
        this._circle[`_quad${quad}Angle`].pulseScaleNow(1, 1.3);
      }
      if (step === 1) {
        this.updateRotation(true);
        this._circle._symmetry.showAll();
        this._circle._symmetry._sine.hideAll();
        this._circle._symmetry.show();
        this._circle._quad0Angle.showAll();
        this._circle[`_quad${quad}Angle`].showAll();
        this._circle._quad0Angle.pulseScaleNow(1, 1.3);
      }
      if (step === 2) {
        this.updateRotation(true);
        this._circle._symmetry.showAll();
        this._circle._quad0Angle.showAll();
        this._circle[`_quad${quad}Angle`].showAll();
        this._circle._symmetry._sine._line.pulseThickNow(1, 5, 7);
      }
      if (step === 3) {
        this.updateRotation(true);
        this._circle._symmetry.showAll();
        this._circle._quad0Angle.showAll();
        this._circle[`_quad${quad}Angle`].showAll();
      }
    }
    this.diagram.animateNextFrame();
  }

  // setParagraphUnits(onUnit: 'rad' | 'deg') {
  //   // const angleType = this.varState.angleSelected;
  //   this.quadrants.forEach((angleType) => {
  //     const offUnit = onUnit === 'rad' ? 'deg' : 'rad';
  //     const elemOn1 = document.getElementById(`id_${angleType}_${onUnit}1`);
  //     const elemOn2 = document.getElementById(`id_${angleType}_${onUnit}2`);
  //     const elemOff1 = document.getElementById(`id_${angleType}_${offUnit}1`);
  //     const elemOff2 = document.getElementById(`id_${angleType}_${offUnit}2`);
  //     if (elemOn1 != null) {
  //       elemOn1.classList.remove('lesson__important_angles_text_hide');
  //     }
  //     if (elemOn2 != null) {
  //       elemOn2.classList.remove('lesson__important_angles_text_hide');
  //     }
  //     if (elemOff1 != null) {
  //       elemOff1.classList.add('lesson__important_angles_text_hide');
  //     }
  //     if (elemOff2 != null) {
  //       elemOff2.classList.add('lesson__important_angles_text_hide');
  //     }
  //   });
  // }

  updateNumSectionsText() {
    super.updateNumSectionsText();
    const r = this.varState.rotation;
    if (this.enableAutoChange) {
      if (this.varState.radialLines === 360) {
        const quad = this.calcQuadrantDegrees(Math.round(r * 180 / Math.PI));
        this.updateQuadrant(quad);
      } else if (this.varState.radialLines === Math.PI * 2) {
        const quad = this.calcQuadrantRadians(Math.round(r * 100) / 100);
        this.updateQuadrant(quad);
      }
    }
  }

  setQuadrantNumberInTable(quadrant: quadrantType) {
    let elem;
    if (quadrant !== this.varState.quadrant) {
      elem = document.getElementById(`id_lesson__quadrant_selector_${this.varState.quadrant + 1}`);
      if (elem != null) {
        elem.classList.remove('lesson__sine_cos_diagram_units_selected');
      }
    }
    elem = document.getElementById(`id_lesson__quadrant_selector_${quadrant + 1}`);
    if (elem != null) {
      elem.classList.add('lesson__sine_cos_diagram_units_selected');
    }
  }

  // checkForQuadrantChange(quadrant: quadrantType) {
  //   if (quadrant !== this.varState.quadrant) {
  //     this.varState.quadrant = quadrant;
  //     this.resetSteps();
  //   }
  // }

  // eslint-disable-next-line class-methods-use-this
  toggleParagraphs(quad: number) {
    const paragraph0 = document.getElementById('id__sine_paragraph_quad0');
    const paragraph1 = document.getElementById('id__sine_paragraph_quad123');
    if (paragraph0 && paragraph1) {
      if (quad === 0) {
        paragraph0.classList.remove('lesson__sine_text_hide');
        paragraph1.classList.add('lesson__sine_text_hide');
      } else {
        paragraph0.classList.add('lesson__sine_text_hide');
        paragraph1.classList.remove('lesson__sine_text_hide');
      }
    }
  }

  changeQuadrant(oldQuad: quadrantType, newQuad: quadrantType) {
    const circle = this._circle;
    const quadShading = [
      circle._quad0, circle._quad1,
      circle._quad2, circle._quad3,
    ];
    const eqn = [this._quad1Eqn, this._quad2Eqn, this._quad3Eqn];
    if (oldQuad > 0) {
      eqn[oldQuad - 1].hide();
    }
    if (newQuad > 0) {
      eqn[newQuad - 1].show();
    }
    this.setQuadrantNumberInTable(newQuad);
    quadShading[oldQuad].hide();
    quadShading[newQuad].show();

    this._circle._quad0Angle.setAngleText(quadrantAngles[newQuad]);
    this._circle._quad0Angle.textOffset = quadrantOffsets[newQuad];
    this._circle._symmetry._sine.textXOffset = sineOffsets[newQuad];
    this._circle._symmetry.setSineText(`sin ${quadrantAngles[newQuad]}`);

    this.varState.quadrant = newQuad;

    this.toggleParagraphs(newQuad);
    // const paragraph0 = document.getElementById('id__sine_paragraph_quad0');
    // const paragraph1 = document.getElementById('id__sine_paragraph_quad123');
    // if (paragraph0 && paragraph1) {
    //   console.log("got here");
    //   if (newQuad === 0) {
    //     paragraph0.classList.remove('lesson__sine_text_hide');
    //     paragraph1.classList.add('lesson__sine_text_hide');
    //   }
    //   if (oldQuad === 0 && newQuad > 0) {
    //     paragraph0.classList.add('lesson__sine_text_hide');
    //     paragraph1.classList.remove('lesson__sine_text_hide');
    //   }
    // }
    this.resetSteps();
  }

  updateQuadrant(quadrant: quadrantType) {
    if (quadrant !== this.varState.quadrant && this.interactiveSinePage) {
      this.changeQuadrant(this.varState.quadrant, quadrant);
    }
  }

  resetSteps() {
    this._circle._quad0Angle.hideAll();
    this._circle._quad1Angle.hideAll();
    this._circle._quad2Angle.hideAll();
    this._circle._quad3Angle.hideAll();
    this._circle._symmetry.hideAll();
    this.goToStepOld(-1);
  }

  goToQuadrant(quad: quadrantType) {
    const randAngle45 = Math.random() * Math.PI / 4 * 0.95;
    let angle = quad * Math.PI / 2 + Math.PI / 4;
    const r = this.varState.rotation;
    if (this.varState.quadrant === quad) {
      if (r <= angle) {
        angle = r + randAngle45;
      } else {
        angle = r - randAngle45;
      }
    }
    // if (this.varState.quadrant !== quad) {
    //   this.resetSteps();
    // }
    this.updateQuadrant(quad);
    this.rotateToAngleDisablingAutoChange(angle);
  }

  // eslint-disable-next-line class-methods-use-this
  // showText(quadrant: quadrantType) {
  //   const ids = [
  //     'id_acute_text',
  //     'id_obtuse_text',
  //     'id_right_text',
  //     'id_straight_text',
  //     'id_reflex_text',
  //   ];
  //   ids.forEach((id) => {
  //     if (id !== angleType) {
  //       const elem = document.getElementById(id);
  //       if (elem != null) {
  //         elem.classList.add('lesson__important_angles_text_hide');
  //       }
  //     }
  //   });
  //   const elem = document.getElementById(`id_${angleType}_text`);
  //   if (elem != null) {
  //     elem.classList.remove('lesson__important_angles_text_hide');
  //   }
  // }

  pulseMainAngle() {
    this._circle._mainAngle.pulseScaleNow(1, 1.4);
    this.diagram.animateNextFrame();
  }

  pulseSineLine() {
    this._circle._sineLine._line.pulseThickNow(1, 5, 7);
    this.diagram.animateNextFrame();
  }

  pulseCosineLine() {
    this._circle._cosineLine._line.pulseThickNow(1, 5, 7);
    this.diagram.animateNextFrame();
  }

  rotateToAngleDisablingAutoChange(angle: number) {
    this.enableAutoChange = false;
    this.rotateTo(angle, 2, 1, ((result) => {
      if (result) {
        this.enableAutoChange = true;
      }
    }));
  }
}

// export SinCosCircle;
