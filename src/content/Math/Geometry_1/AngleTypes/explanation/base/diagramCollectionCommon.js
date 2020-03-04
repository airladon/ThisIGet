// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  Transform,
} = Fig;

const { round, rand } = Fig.tools.math;

type TypeAngles = 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'full';
export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _acute: DiagramElementPrimitive;
    _obtuse: DiagramElementPrimitive;
    _reflex: DiagramElementPrimitive;
    _angle: DiagramObjectAngle;
    _angleText: {
      _label: DiagramElementPrimitive;
      _value: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  currentAngle: TypeAngles;
  lastAngle: TypeAngles;
  threshold: number;
  realTimeUpdates: boolean;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElements, this);

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
      return 'topic__important_angles_table__not_selected topic__important_angles_table__selected';
    }
    return 'topic__important_angles_table__not_selected';
  }

  updateTable(force: boolean = false) {
    const angleIds: { [string]: {id: string, interactiveItems: Array<string> }} = {
      acute: { id: 'id_acute', interactiveItems: ['id_acute_p'] },
      right: { id: 'id_right', interactiveItems: ['id_right_p', 'id_square_p'] },
      obtuse: { id: 'id_obtuse', interactiveItems: ['id_obtuse_p'] },
      straight: { id: 'id_straight', interactiveItems: ['id_straight_p'] },
      reflex: { id: 'id_reflex', interactiveItems: ['id_reflex_p'] },
      full: { id: 'id_full', interactiveItems: ['id_full_p'] },
    };
    if (force || this.currentAngle !== this.lastAngle) {
      Object.entries(angleIds).forEach(([angle, ids]) => {
        // $FlowFixMe
        const { id, interactiveItems } = ids;
        const element = document.getElementById(id);
        const text = document.getElementById(`${id}_text`);
        const def = document.getElementById(`${id}_def`);
        if (angle === this.currentAngle) {
          if (element != null) {
            element.classList.add('topic__important_angles_table__selected');
          }
          if (text != null) {
            text.classList.remove('topic__important_angles__text_hide');
          }
          if (def != null) {
            def.classList.remove('topic__important_angles__text_hide');
          }
          interactiveItems.forEach((interactiveItem) => {
            const item = document.getElementById(interactiveItem);
            if (item != null) {
              item.classList.remove('not_interactive_word');
            }
          });
        } else {
          if (element != null) {
            element.classList.remove('topic__important_angles_table__selected');
          }
          if (text != null) {
            text.classList.add('topic__important_angles__text_hide');
          }
          if (def != null) {
            def.classList.add('topic__important_angles__text_hide');
          }
          interactiveItems.forEach((interactiveItem) => {
            const item = document.getElementById(interactiveItem);
            if (item != null) {
              item.classList.add('not_interactive_word');
            }
          });
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
