// @flow
import Fig from 'figureone';
import AngleCircle from '../../../../LessonsCommon/AngleCircle/AngleCircle';
import type { circleType, varStateType } from '../../../../LessonsCommon/AngleCircle/AngleCircle';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, Point, DiagramElementPrimative, DiagramElementCollection,
} = Fig;
type rightAngleType = {
  _horizontal: DiagramElementPrimative;
  _vertical: DiagramElementPrimative;
} & DiagramElementCollection;

export type extendedCircleType = {
  _rightAngle: rightAngleType;
  _acuteRange: DiagramElementPrimative;
  _obtuseRange: DiagramElementPrimative;
  _reflexRange: DiagramElementPrimative;
} & circleType;

type angleTypes = 'acute' | 'obtuse' | 'right' | 'reflex' | 'straight' | 'full';

type varStateExtendedType = {
    angleSelected: angleTypes;
  } & varStateType;

export type ImportantAnglesCollectionType = {
  _circle: extendedCircleType;
  varState: varStateExtendedType;
  enableAutoChange: boolean;
  angleTypes: Array<string>;
};

class ImportantAnglesCollection extends AngleCircle {
  _circle: extendedCircleType;
  // numSections: Array<number>;
  varState: varStateExtendedType;
  enableAutoChange: boolean;
  angleTypes: Array<string>;

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

  makeAcuteRange() {
    return this.shapes.polygon({
      fill: true,
      sides: this.layout.anglePoints,
      radius: this.layout.axes.length,
      sidesToDraw: this.layout.anglePoints / 4,
      color: this.colors.angleArea,
      transform: new Transform()
        .translate(0, 0),
    });
  }

  makeObtuseRange() {
    return this.shapes.polygon({
      fill: true,
      sides: this.layout.anglePoints,
      radius: this.layout.axes.length,
      sidesToDraw: this.layout.anglePoints / 4,
      color: this.colors.angleArea,
      transform: new Transform()
        .rotate(Math.PI / 2)
        .translate(0, 0),
    });
  }

  makeReflexRange() {
    return this.shapes.polygon({
      fill: true,
      sides: this.layout.anglePoints,
      radius: this.layout.axes.length,
      sidesToDraw: this.layout.anglePoints / 2,
      color: this.colors.angleArea,
      transform: new Transform()
        .rotate(Math.PI)
        .translate(0, 0),
    });
  }

  addToCircle() {
    this._circle.add('rightAngle', this.makeRightAngle());
    this._circle.add('acuteRange', this.makeAcuteRange());
    this._circle.add('obtuseRange', this.makeObtuseRange());
    this._circle.add('reflexRange', this.makeReflexRange());
    // this._circle.add('axes', this.makeAxes());
    this._circle.drawOrder = [
      ...this._circle.drawOrder.slice(-4),
      ...this._circle.drawOrder.slice(0, 2),
      // ...this._circle.drawOrder.slice(-1),
      ...this._circle.drawOrder.slice(2, -4),
    ];
  }

  constructor(diagram: CommonLessonDiagram, transform: Transform = new Transform()) {
    super(lessonLayout(), diagram, transform);
    this.diagram = diagram;
    this.varState = {
      radialLines: 4,
      rotation: 0,
      angleSelected: 'acute',
    };
    this.enableAutoChange = true;
    this.addToCircle();
    this.angleTypes = ['acute', 'obtuse', 'right', 'reflex', 'straight', 'full'];
  }

  // eslint-disable-next-line class-methods-use-this
  calcAngleType(angle: number, thresholds: Object): angleTypes {
    if (angle >= thresholds.acute.min && angle <= thresholds.acute.max) {
      return 'acute';
    }
    if (angle >= thresholds.right.min && angle <= thresholds.right.max) {
      return 'right';
    }
    if (angle >= thresholds.obtuse.min && angle <= thresholds.obtuse.max) {
      return 'obtuse';
    }
    if (angle >= thresholds.straight.min && angle <= thresholds.straight.max) {
      return 'straight';
    }
    if (angle >= thresholds.reflex.min && angle <= thresholds.reflex.max) {
      return 'reflex';
    }
    return 'full';
  }

  calcAngleTypeDegrees(angle: number): angleTypes {
    const thresholds = {
      acute: {
        min: 0,
        max: 89,
      },
      right: {
        min: 90,
        max: 90,
      },
      obtuse: {
        min: 91,
        max: 179,
      },
      straight: {
        min: 180,
        max: 180,
      },
      reflex: {
        min: 181,
        max: 359,
      },
      full: {
        min: 360,
        max: 360,
      },
    };
    return this.calcAngleType(angle, thresholds);
  }

  calcAngleTypeRadians(angle: number): angleTypes {
    const thresholds = {
      acute: {
        min: 0,
        max: 1.56,
      },
      right: {
        min: 1.57,
        max: 1.57,
      },
      obtuse: {
        min: 1.58,
        max: 3.13,
      },
      straight: {
        min: 3.14,
        max: 3.14,
      },
      reflex: {
        min: 3.15,
        max: 6.27,
      },
      full: {
        min: 6.28,
        max: 6.28,
      },
    };
    return this.calcAngleType(angle, thresholds);
  }

  toggleUnits(toUnit: 'rad' | 'deg' | null) {
    const elemDeg = document.getElementById('id_degrees');
    const elemRad = document.getElementById('id_radians');
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
        elemDeg.classList.remove('lesson__important_angles_unit_selected');
        elemRad.classList.add('lesson__important_angles_unit_selected');
        this.setParagraphUnits('rad');
      } else if (unit === 'deg') {
        this.hideRadians();
        this.showDegrees();
        elemRad.classList.remove('lesson__important_angles_unit_selected');
        elemDeg.classList.add('lesson__important_angles_unit_selected');
        this.setParagraphUnits('deg');
      }
    }
  }


  setParagraphUnits(onUnit: 'rad' | 'deg') {
    // const angleType = this.varState.angleSelected;
    this.angleTypes.forEach((angleType) => {
      const offUnit = onUnit === 'rad' ? 'deg' : 'rad';
      const elemOn1 = document.getElementById(`id_${angleType}_${onUnit}1`);
      const elemOn2 = document.getElementById(`id_${angleType}_${onUnit}2`);
      const elemOff1 = document.getElementById(`id_${angleType}_${offUnit}1`);
      const elemOff2 = document.getElementById(`id_${angleType}_${offUnit}2`);
      if (elemOn1 != null) {
        elemOn1.classList.remove('lesson__important_angles_text_hide');
      }
      if (elemOn2 != null) {
        elemOn2.classList.remove('lesson__important_angles_text_hide');
      }
      if (elemOff1 != null) {
        elemOff1.classList.add('lesson__important_angles_text_hide');
      }
      if (elemOff2 != null) {
        elemOff2.classList.add('lesson__important_angles_text_hide');
      }
    });
  }

  updateNumSectionsText() {
    super.updateNumSectionsText();
    const r = this.varState.rotation;
    if (this.enableAutoChange) {
      if (this.varState.radialLines === 360) {
        const angleType = this.calcAngleTypeDegrees(Math.round(r * 180 / Math.PI));
        // this.selectAngle(angleType);
        // this.showText(angleType);
        this.showAngleType(angleType);
      } else if (this.varState.radialLines === Math.PI * 2) {
        const angleType = this.calcAngleTypeRadians(Math.round(r * 100) / 100);
        // this.selectAngle(angleType);
        // this.showText(angleType);
        this.showAngleType(angleType);
      }
    }
  }

  selectAngle(angleType: angleTypes) {
    let elem;
    if (angleType !== this.varState.angleSelected) {
      elem = document.getElementById(`id_${this.varState.angleSelected}`);
      if (elem != null) {
        elem.classList.remove('lesson__important_angles_table_selected');
      }
    }
    elem = document.getElementById(`id_${angleType}`);
    if (elem != null) {
      elem.classList.add('lesson__important_angles_table_selected');
    }
    if (this.varState.angleSelected === 'right' && angleType !== 'right') {
      this.toggleRightAngleLine(false);
    }
    this.varState.angleSelected = angleType;
  }

  showAngleType(angleType: angleTypes) {
    this.selectAngle(angleType);
    this.showText(angleType);
    if (angleType !== 'acute') {
      this._circle._acuteRange.hide();
    }
    if (angleType !== 'obtuse') {
      this._circle._obtuseRange.hide();
    }
    if (angleType !== 'reflex') {
      this._circle._reflexRange.hide();
    }
    if (angleType === 'acute') {
      this._circle._acuteRange.show();
    }
    if (angleType === 'obtuse') {
      this._circle._obtuseRange.show();
    }
    if (angleType === 'reflex') {
      this._circle._reflexRange.show();
    }
  }

  goToAcute() {
    const angle45 = Math.random() * Math.PI / 4 * 0.95;
    let angle = angle45;
    const r = this._circle._radius.transform.r();
    if (r != null) {
      if (this.varState.angleSelected !== 'acute') {
        angle = Math.PI / 4;
      } else if (r < Math.PI / 4) {
        angle += Math.PI / 4;
      }
      this.rotateToAngleDisablingAutoChange(angle);
    }
    // this.selectAngle('acute');
    // this.showText('acute');
    // this._circle._acuteRange.show();
    this.showAngleType('acute');
  }

  // eslint-disable-next-line class-methods-use-this
  showText(angleType: angleTypes) {
    const ids = [
      'id_acute_text',
      'id_obtuse_text',
      'id_right_text',
      'id_straight_text',
      'id_reflex_text',
      'id_full_text',
    ];
    ids.forEach((id) => {
      if (id !== angleType) {
        const elem = document.getElementById(id);
        if (elem != null) {
          elem.classList.add('lesson__important_angles_text_hide');
        }
      }
    });
    const elem = document.getElementById(`id_${angleType}_text`);
    if (elem != null) {
      elem.classList.remove('lesson__important_angles_text_hide');
    }
  }

  rotateToAngleDisablingAutoChange(angle: number) {
    this.enableAutoChange = false;
    this.rotateTo(angle, 2, 1, ((result) => {
      if (result) {
        this.enableAutoChange = true;
      }
    }));
  }

  goToRight() {
    this.enableAutoChange = false;
    const angle = Math.PI / 2;
    this.rotateToAngleDisablingAutoChange(angle);
    // this.selectAngle('right');
    // this.showText('right');
    this.showAngleType('right');
  }

  goToObtuse() {
    const angle45 = Math.random() * Math.PI / 4 * 0.95;
    let angle = angle45;
    const r = this._circle._radius.transform.r();
    if (r != null) {
      if (this.varState.angleSelected !== 'obtuse') {
        angle = 3 * Math.PI / 4;
      } else if (r < 3 * Math.PI / 4) {
        angle += 3 * Math.PI / 4;
      } else {
        angle += Math.PI / 2;
      }
      this.rotateToAngleDisablingAutoChange(angle);
    }
    // this.selectAngle('obtuse');
    // this.showText('obtuse');
    this.showAngleType('obtuse');
  }

  goToStraight() {
    const angle = Math.PI;
    this.rotateToAngleDisablingAutoChange(angle);
    // this.selectAngle('straight');
    // this.showText('straight');
    this.showAngleType('straight');
  }

  goToReflex() {
    const angle90 = Math.random() * Math.PI / 2 * 0.95;
    let angle = angle90;
    const r = this._circle._radius.transform.r();
    if (r != null) {
      if (r < 3 * Math.PI / 2) {
        angle += 3 * Math.PI / 2;
      } else {
        angle += Math.PI;
      }
      this.rotateToAngleDisablingAutoChange(angle);
    }
    // this.selectAngle('reflex');
    // this.showText('reflex');
    this.showAngleType('reflex');
  }

  goToFull() {
    const angle = 2 * Math.PI * 0.999;
    this.rotateToAngleDisablingAutoChange(angle);
    this.showAngleType('full');
  }

  pulseAngle() {
    if (this._circle._rightAngle.isShown) {
      this._circle._rightAngle._horizontal.pulseScaleNow(1, 2);
      this._circle._rightAngle._vertical.pulseScaleNow(1, 2);
    } else {
      this._circle._angle._arc.pulseThickNow(1, 1.04, 7);
      this._circle._angle._arrow.pulseScaleNow(1, 1.5);
    }
    this.diagram.animateNextFrame();
  }

  toggleRightAngleLine(show: boolean | null) {
    let toShow = show;
    if (show === null) {
      if (this._circle._rightAngle.isShown) {
        toShow = false;
      } else {
        toShow = true;
      }
    }
    if (toShow) {
      this._circle._rightAngle.showAll();
      this._circle._angle.hideAll();
      this._circle._rightAngle._horizontal.pulseScaleNow(1, 2);
      this._circle._rightAngle._vertical.pulseScaleNow(1, 2);
    } else {
      this._circle._rightAngle.hideAll();
      this._circle._angle.showAll();
    }
    this.diagram.animateNextFrame();
  }
}

export default ImportantAnglesCollection;
