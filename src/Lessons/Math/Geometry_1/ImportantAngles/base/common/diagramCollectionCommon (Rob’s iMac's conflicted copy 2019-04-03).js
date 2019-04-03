// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { round, rand } = Fig.tools.math;

type TypeAngles = 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'full';
export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _acute: DiagramElementPrimative;
    _obtuse: DiagramElementPrimative;
    _reflex: DiagramElementPrimative;
    _angle: DiagramObjectAngle;
    _angleText: {
      _label: DiagramElementPrimative;
      _value: DiagramElementPrimative;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  currentAngle: TypeAngles;
  lastAngle: TypeAngles;
  threshold: number;
  realTimeUpdates: boolean;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);

    this._fig._line1.setTransformCallback = this.updateAngle.bind(this);
    this._fig._line1.makeTouchable();
    this.threshold = 0.01;
    this.currentAngle = 'acute';
    this.lastAngle = 'acute';
    this.realTimeUpdates = true;
    this.updateAngle();
  }

  updateAngle() {
    const r = this._fig._line1.getRotation('0to360');
    if (this._fig._angle.isShown) {
      this._fig._angle.setAngle({ angle: r });
    }
    if (this._fig._angleText.isShown) {
      const text = `${round(r * 180 / Math.PI, 0)}º`;
      this._fig._angleText._value.drawingObject.setText(text);
    }
    if (this.realTimeUpdates) {
      this.lastAngle = this.currentAngle;
      this.currentAngle = this.getCurrentAngle();
      this.updateTable();
      this.updateFills();
    }
  }

  getCurrentAngle() {
    let angle = 'full';
    const r = this._fig._line1.getRotation('0to360');
    if (r < Math.PI / 2 - this.threshold) {
      angle = 'acute';
    } else if (r <= Math.PI / 2 + this.threshold) {
      angle = 'right';
    } else if (r < Math.PI - this.threshold) {
      angle = 'obtuse';
    } else if (r <= Math.PI + this.threshold) {
      angle = 'straight';
    } else if (r < Math.PI * 2 - this.threshold) {
      angle = 'reflex';
    } else {
      angle = 'full';
    }
    return angle;
  }

  getClass(angle: string) {
    if (this.currentAngle === angle) {
      return 'lesson__important_angles_table__not_selected lesson__important_angles_table__selected';
    }
    return 'lesson__important_angles_table__not_selected';
  }

  updateTable(force: boolean = false) {
    const angleIds = {
      acute: 'id_acute',
      right: 'id_right',
      obtuse: 'id_obtuse',
      straight: 'id_straight',
      reflex: 'id_reflex',
      full: 'id_full',
    };
    if (force || this.currentAngle !== this.lastAngle) {
      Object.entries(angleIds).forEach(([angle, id]) => {
        const element = document.getElementById(id);
        const text = document.getElementById(`${id}_text`);
        const def = document.getElementById(`${id}_def`);
        if (element != null && text != null) {
          if (angle === this.currentAngle) {
            element.classList.add('lesson__important_angles_table__selected');
            text.classList.remove('lesson__important_angles__text_hide');
            def.classList.remove('lesson__important_angles__text_hide');
          } else {
            element.classList.remove('lesson__important_angles_table__selected');
            text.classList.add('lesson__important_angles__text_hide');
            def.classList.add('lesson__important_angles__text_hide');
          }
        }
      });
    }
  }

  updateFills() {
    this._fig._acute.hide();
    this._fig._obtuse.hide();
    this._fig._reflex.hide();
    if (this.currentAngle === 'acute') {
      this._fig._acute.show();
    } else if (this.currentAngle === 'obtuse') {
      this._fig._obtuse.show();
    } else if (this.currentAngle === 'reflex') {
      this._fig._reflex.show();
    }
  }

  goToAngle(angle: number, whenFinished: ?() => void) {
    this._fig._line1.stop(true, false);
    const r = this._fig._line1.getRotation('0to360');
    if (round(angle, 4) === round(r, 4)) {
      this._fig._angle.pulseScaleNow(1, 1.2);
    } else {
      let velocity = 1;
      if (Math.abs(angle - r) > Math.PI * 0.8) {
        velocity = 2;
      }
      this._fig._line1.animations.new()
        .rotation({ target: angle, velocity, direction: 2 })
        .whenFinished(whenFinished)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  goToRandom(min: number, max: number, whenFinished: ?() => void) {
    const r = this._fig._line1.getRotation('0to360');
    const halfAngle = (max - min) / 2;
    const mid = min + halfAngle;
    const randomAngle = rand(halfAngle);
    let target = mid + randomAngle;
    if (r > mid) {
      target = mid - randomAngle;
    }
    this.goToAngle(target, whenFinished);
  }

  updateOff(angle: TypeAngles) {
    this._fig._line1.stop(true, false);
    this.lastAngle = this.currentAngle;
    this.currentAngle = angle;
    this.updateFills();
    this.updateTable();
    this.realTimeUpdates = false;
  }

  updateOn() {
    this.realTimeUpdates = true;
    this.updateTable(true);
    this.updateAngle();
  }

  goToAcute() {
    this.updateOff('acute');
    this.goToRandom(0.1, Math.PI / 2 - 0.1, () => { this.updateOn(); });
  }

  goToObtuse() {
    this.updateOff('obtuse');
    this.goToRandom(Math.PI / 2 + 0.1, Math.PI - 0.1, () => { this.updateOn(); });
  }

  goToReflex() {
    this.updateOff('reflex');
    this.goToRandom(Math.PI + 0.1, Math.PI * 2 - 0.1, () => { this.updateOn(); });
  }

  goToRight() {
    this.updateOff('right');
    this.goToAngle(Math.PI / 2, () => { this.updateOn(); });
  }

  goToStraight() {
    this.updateOff('straight');
    this.goToAngle(Math.PI, () => { this.updateOn(); });
  }

  goToFull() {
    this.updateOff('full');
    this.goToAngle(Math.PI * 1.999, () => { this.updateOn(); });
  }

  pulseAngle() {
    this._fig._angle.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }
}
