// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine,
  Transform, Point,
} = Fig;

const { LineBounds } = Fig.tools.g2;

const { rand } = Fig.tools.math;

export type TypeIndexAngle = {
  lineIndex: number;
  angleIndex: number;
} & DiagramObjectAngle;

export default class CommonCollectionThreeLines extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _angleA1: TypeIndexAngle;
    _angleA2: TypeIndexAngle;
    _angleB1: TypeIndexAngle;
    _angleB2: TypeIndexAngle;
    _angleC1: TypeIndexAngle;
    _angleC2: TypeIndexAngle;
    _angleD1: TypeIndexAngle;
    _angleD2: TypeIndexAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Opposite').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this.layout.addElementsThreeLines, this);
    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line3.makeTouchable();
    this._fig._line1.move.element = this._fig;
    this._fig._line2.move.element = this._fig;
    // this._fig._line3.move.maxTransform.updateRotation(Math.PI - Math.PI / 3.7);
    // this._fig._line3.move.minTransform.updateRotation(Math.PI / 3.7);
    this._fig._line3.move.bounds.updateRotation({
      min: Math.PI / 3.7,
      max: Math.PI - Math.PI / 3.7,
    });
    this._fig._line3.setTransformCallback = (t: Transform) => {
      if (!(this._fig._line1.move.bounds.getTranslation() instanceof LineBounds)) {
        this._fig._line1.updateMoveTransform(t);
      }
      this.updateIntersectingLineAngle();
    };
    this._fig.setTransformCallback = () => {
      this.updateIntersectingLineAngle();
    };
    // this._fig._line2.setTransformCallback = (t: Transform) => {
    //   this._fig._line2.updateMoveTransform(t);
    //   this.updateAngles();
    // };
  }

  updateAngle(angle: TypeIndexAngle, intersect: Point, r: number) {
    if (angle.isShown === false) {
      return;
    }
    const figRot = this._fig.getRotation();
    // angle.setPosition(intersect);
    if (angle.angleIndex === 0) {
      angle.setAngle({
        position: intersect, rotation: 0, angle: r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 1) {
      angle.setAngle({
        position: intersect, rotation: r, angle: Math.PI - r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 2) {
      angle.setAngle({
        position: intersect, rotation: Math.PI, angle: r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 3) {
      angle.setAngle({
        position: intersect, rotation: r + Math.PI, angle: Math.PI - r, rotationOffset: figRot,
      });
    }
  }

  pulseIntersecting() {
    this._fig._line3.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseParallel() {
    this._fig._line1.pulseWidth();
    this._fig._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseShaddow() {
    this._fig._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  newPageRotation(angle: ?number, line3Angle: ?number, done: ?() => void = null) {
    if (angle != null || line3Angle != null) {
      this._fig.stop('freeze');
      this._fig.animations.new()
        .inParallel([
          this._fig.anim.rotation({ target: angle, velocity: 1.5 }),
          this._fig._line3.anim.rotation({ target: line3Angle, velocity: 1 }),
          this._fig._line1.anim.scenario({ target: 'center', velocity: 1 }),
          this._fig._line2.anim.scenario({ target: 'center', velocity: 1 }),
        ])
        .whenFinished(done)
        .start();
    } else if (done != null) {
      done();
    }
    this.diagram.animateNextFrame();
  }

  updateIntersectingLineAngle() {
    const r = this._fig._line3.getRotation();
    const t1 = this._fig._line1.getPosition();
    const t2 = this._fig._line2.getPosition();
    const t3 = this._fig._line3.getPosition();
    const intersectT1 = new Point(
      (t1.y - t3.y) / Math.tan(r) + t3.x,
      (t1.y - t3.y),
    );
    const intersectT2 = new Point(
      (t2.y - t3.y) / Math.tan(r) + t3.x,
      (t2.y - t3.y),
    );
    this.updateAngle(this._fig._angleA1, intersectT1, r);
    this.updateAngle(this._fig._angleA2, intersectT2, r);
    this.updateAngle(this._fig._angleB1, intersectT1, r);
    this.updateAngle(this._fig._angleB2, intersectT2, r);
    this.updateAngle(this._fig._angleC1, intersectT1, r);
    this.updateAngle(this._fig._angleC2, intersectT2, r);
    this.updateAngle(this._fig._angleD1, intersectT1, r);
    this.updateAngle(this._fig._angleD2, intersectT2, r);

    const angleA1 = this._fig._angleA1;
    const angleB1 = this._fig._angleB1;
    const angleC1 = this._fig._angleC1;
    const angleD1 = this._fig._angleD1;
    const angleA2 = this._fig._angleA2;
    const angleB2 = this._fig._angleB2;
    const angleC2 = this._fig._angleC2;
    const angleD2 = this._fig._angleD2;

    if (angleA1.label != null && angleA1.label.showRealAngle) {
      const a1 = parseInt(angleA1.label.getText(), 10);
      const b1 = 180 - a1;
      angleB1.setLabel(`${b1}º`);
      angleC1.setLabel(`${a1}º`);
      angleD1.setLabel(`${b1}º`);
      angleA2.setLabel(`${a1}º`);
      angleB2.setLabel(`${b1}º`);
      angleC2.setLabel(`${a1}º`);
      angleD2.setLabel(`${b1}º`);
    }
  }

  setAngle(angleId: string, color: Array<number>, text: string) {
    const angle = this._fig[`_angle${angleId}`];
    const { isShown } = angle;
    angle.setColor(color);
    // angle.label.setText(text);
    if (text == null) {
      angle.setLabelToRealAngle();
    } else {
      angle.setLabel(text);
    }
    if (!isShown) {
      angle.hide();
    }
  }

  showAngles(angles: Array<DiagramObjectAngle> | DiagramObjectAngle) {
    let anglesArray = [];
    if (!Array.isArray(angles)) {
      anglesArray = [angles];
    } else {
      anglesArray = angles;
    }
    const fig = this._fig;
    const possible = [
      fig._angleA1, fig._angleA2,
      fig._angleB1, fig._angleB2,
      fig._angleC1, fig._angleC2,
      fig._angleD1, fig._angleD2,
    ];
    possible.forEach((angle) => {
      if (anglesArray.indexOf(angle) > -1) {
        angle.showAll();
        angle.pulseScaleNow(1, 1.2);
      } else {
        angle.hide();
      }
    });
  }

  toggleAngles() {
    if (this._fig._angleA1.isShown) {
      this.showAngles(this._fig._angleB1);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles(this._fig._angleC1);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles(this._fig._angleD1);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles(this._fig._angleA2);
    } else if (this._fig._angleA2.isShown) {
      this.showAngles(this._fig._angleB2);
    } else if (this._fig._angleB2.isShown) {
      this.showAngles(this._fig._angleC2);
    } else if (this._fig._angleC2.isShown) {
      this.showAngles(this._fig._angleD2);
    } else if (this._fig._angleD2.isShown) {
      this.showAngles(this._fig._angleA1);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleAnglesOnOff() {
    if (this._fig._angleA1.isShown) {
      this.showAngles([]);
    } else {
      this.showAngles([
        this._fig._angleA1,
        this._fig._angleB1,
        this._fig._angleC1,
        this._fig._angleD1,
        this._fig._angleA2,
        this._fig._angleB2,
        this._fig._angleC2,
        this._fig._angleD2,
      ]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggle4Angles() {
    if (this._fig._angleA1.isShown) {
      this.showAngles(this._fig._angleB1);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles(this._fig._angleC1);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles(this._fig._angleD1);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles(this._fig._angleA1);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleCorresponding() {
    if (this._fig._angleA1.isShown && this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleA1, this._fig._angleA2]);
    } else if (this._fig._angleA1.isShown) {
      this.showAngles([this._fig._angleB1, this._fig._angleB2]);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleC2]);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleD2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([
        this._fig._angleA1, this._fig._angleA2,
        this._fig._angleB1, this._fig._angleB2,
        this._fig._angleC1, this._fig._angleC2,
        this._fig._angleD1, this._fig._angleD2,
      ]);
    }

    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleAlternate() {
    if (this._fig._angleA1.isShown && this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleA1, this._fig._angleC2]);
    } else if (this._fig._angleA1.isShown) {
      this.showAngles([this._fig._angleB1, this._fig._angleD2]);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleA2]);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleB2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([
        this._fig._angleA1, this._fig._angleA2,
        this._fig._angleB1, this._fig._angleB2,
        this._fig._angleC1, this._fig._angleC2,
        this._fig._angleD1, this._fig._angleD2,
      ]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleInsideAlternate() {
    if (this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleA2]);
    } else {
      this.showAngles([this._fig._angleD1, this._fig._angleB2]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleOutsideAlternate() {
    if (this._fig._angleA1.isShown) {
      this.showAngles([this._fig._angleB1, this._fig._angleD2]);
    } else {
      this.showAngles([this._fig._angleA1, this._fig._angleC2]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }


  toggleInterior() {
    if (this._fig._angleC1.isShown && this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleA2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleB2]);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles([
        this._fig._angleC1, this._fig._angleB2,
        this._fig._angleD1, this._fig._angleA2,
      ]);
    }

    // if (this._fig._angleC1.isShown && this._fig._angleD1.isShown) {
    //   this.showAngles([this._fig._angleC1, this._fig._angleB2]);
    // } else if (this._fig._angleC1.isShown) {
    //   this.showAngles([this._fig._angleD1, this._fig._angleA2]);
    // } else if (this._fig._angleD1.isShown) {
    //   this.showAngles([
    //     this._fig._angleC1, this._fig._angleB2,
    //     this._fig._angleD1, this._fig._angleA2,
    //   ]);
    // }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  pulseAngles(done: ?() => void = null) {
    const angles = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    let callback = done;
    angles.forEach((angle) => {
      const element = this._fig[`_angle${angle}`];
      if (element.isShown) {
        element.pulseScaleNow(1, 1.2, 0, callback);
        if (callback != null) {
          callback = null;
        }
      }
    });
    this.diagram.animateNextFrame();
  }

  adjacentPulseOpposite(done: ?() => void = null) {
    this._fig._angleA2.pulseScaleNow(1, 1.2);
    this._fig._angleC2.pulseScaleNow(1, 1.2, 0, done);
    this.diagram.animateNextFrame();
  }

  adjacentPulseAlternate(done: ?() => void = null) {
    this._fig._angleA1.pulseScaleNow(1, 1.2);
    this._fig._angleC2.pulseScaleNow(1, 1.2, 0, done);
    this.diagram.animateNextFrame();
  }

  interiorPulseSupplementary(done: ?() => void = null) {
    this._fig._angleA2.pulseScaleNow(1, 1.2);
    this._fig._angleD2.pulseScaleNow(1, 1.2, 0, done);
    this.diagram.animateNextFrame();
  }

  interiorPulseinterior(done: ?() => void = null) {
    this._fig._angleD1.pulseScaleNow(1, 1.2);
    this._fig._angleA2.pulseScaleNow(1, 1.2, 0, done);
    this.diagram.animateNextFrame();
  }


  randomTranslateLine(done: ?() => void = null) {
    const newY = rand(
      this.layout.moveLine.distance / 4,
      this.layout.moveLine.distance / 2,
    );
    this.shaddowLine1();
    const p1 = this._fig._line1.getPosition();
    let target = p1.add(0, newY);
    if (p1.y > 0) {
      target = p1.sub(0, newY);
    }
    this._fig._line1.stop('freeze');
    this._fig._line1.animations.new()
      .position({ target, duration: 0.7 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  shaddowLine1() {
    const p = this._fig._line1.getPosition();
    this._fig._line2.setPosition(p);
    this.diagram.animateNextFrame();
  }

  goToRandom() {
    // const r = rand(0, Math.PI);
    let angle = rand(Math.PI / 3.7, Math.PI / 2);
    if (this._fig._line3.getRotation() < Math.PI / 2) {
      angle += Math.PI / 2 - Math.PI / 3.7;
    }
    // const angle = rand(Math.PI / 3.7, Math.PI - Math.PI / 3.7);
    this._fig.stop('freeze');
    // this._fig.animations.new()
    //   .rotation({ target: r, duration: 0.8 })
    //   .start();
    this._fig._line3.animations.new()
      .rotation({ target: angle, duration: 0.8 })
      .start();
    this.diagram.animateNextFrame();
  }
}
