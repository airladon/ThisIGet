// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine,
  Transform,
} = Fig;

const { minAngleDiff } = Fig.tools.g2;

export default class CommonCollectionOpposite extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _angle4: DiagramObjectAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Opposite').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line1.setTransformCallback = (t: Transform) => {
      this._fig._line1.updateMoveTransform(t);
      this.updateAngles();
    };
    this._fig._line2.setTransformCallback = (t: Transform) => {
      this._fig._line2.updateMoveTransform(t);
      this.updateAngles();
    };
  }

  newPageRotation(done: ?() => void = null) {
    const line1 = this._fig._line1;
    const line2 = this._fig._line2;
    const r1 = line1.getRotation();
    const r2 = line2.getRotation();
    const minAngle = minAngleDiff(r2, r1);
    this._fig.stop(true, 'noComplete');
    if (Math.abs(minAngle) < 0.3) {
      line2.animations.new()
        .rotation({ target: 1, duration: 0.5 })
        .whenFinished(done)
        .start();
      line1.animations.new()
        .rotation({ target: 0, duration: 0.5 })
        .start();
    } else if (done != null) {
      done();
    }
    this.diagram.animateNextFrame();
  }

  setAngle(angleId: number, color: Array<number>, text: 'string') {
    const angle = this._fig[`_angle${angleId}`];
    angle.setColor(color);
    angle.label.setText(text);
  }

  showAngles(angles: Array<DiagramObjectAngle> | DiagramObjectAngle) {
    let anglesArray = [];
    if (!Array.isArray(angles)) {
      anglesArray = [angles];
    } else {
      anglesArray = angles;
    }
    const fig = this._fig;
    const possible = [fig._angle1, fig._angle2, fig._angle3, fig._angle4];
    possible.forEach((angle) => {
      if (anglesArray.indexOf(angle) > -1) {
        angle.showAll();
      } else {
        angle.hide();
      }
    });
  }

  toggleAngles() {
    if (this._fig._angle1.isShown) {
      this.showAngles(this._fig._angle2);
    } else if (this._fig._angle2.isShown) {
      this.showAngles(this._fig._angle3);
    } else if (this._fig._angle3.isShown) {
      this.showAngles(this._fig._angle4);
    } else if (this._fig._angle4.isShown) {
      this.showAngles(this._fig._angle1);
    }
    this.updateAngles();
    this.diagram.animateNextFrame();
  }

  toggleOpposite() {
    if (this._fig._angle1.isShown) {
      this.showAngles([this._fig._angle2, this._fig._angle4]);
    } else if (this._fig._angle2.isShown) {
      this.showAngles([this._fig._angle1, this._fig._angle3]);
    }
    this.updateAngles();
    this.diagram.animateNextFrame();
  }

  updateAngles() {
    const line1 = this._fig._line1;
    const line2 = this._fig._line2;
    const angle1 = this._fig._angle1;
    const angle2 = this._fig._angle2;
    const angle3 = this._fig._angle3;
    const angle4 = this._fig._angle4;

    const r1 = line1.getRotation();
    const r2 = line2.getRotation();
    const minAngle = minAngleDiff(r2, r1);
    if (angle1.isShown) {
      if (minAngle > 0) {
        angle1.setAngle({ rotation: r1, angle: minAngle });
      } else {
        angle1.setAngle({ rotation: r1, angle: Math.PI - Math.abs(minAngle) });
      }
    }
    if (angle2.isShown) {
      if (minAngle > 0) {
        angle2.setAngle({
          rotation: r1 + Math.PI - (Math.PI - minAngle),
          angle: Math.PI - minAngle,
        });
      } else {
        angle2.setAngle({
          rotation: r1 + Math.PI - Math.abs(minAngle),
          angle: Math.abs(minAngle),
        });
      }
    }
    if (angle3.isShown) {
      if (minAngle > 0) {
        angle3.setAngle({ rotation: r1 + Math.PI, angle: minAngle });
      } else {
        angle3.setAngle({
          rotation: r1 + Math.PI,
          angle: Math.PI - Math.abs(minAngle),
        });
      }
    }
    if (angle4.isShown) {
      if (minAngle > 0) {
        angle4.setAngle({
          rotation: r1 + 2 * Math.PI - (Math.PI - minAngle),
          angle: Math.PI - minAngle,
        });
      } else {
        angle4.setAngle({
          rotation: r1 + 2 * Math.PI - Math.abs(minAngle),
          angle: Math.abs(minAngle),
        });
      }
    }
  }
}
