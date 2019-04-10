// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine,
  Transform, Point,
} = Fig;

// const { minAngleDiff } = Fig.tools.g2;

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
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Opposite').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElementsThreeLines);
    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line3.makeTouchable();
    this._fig._line1.move.element = this._fig;
    this._fig._line2.move.element = this._fig;
    this._fig._line3.move.maxTransform.updateRotation(Math.PI - Math.PI / 3.7);
    this._fig._line3.move.minTransform.updateRotation(Math.PI / 3.7);
    this._fig._line3.setTransformCallback = (t: Transform) => {
      this._fig._line1.updateMoveTransform(t);
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
  }

  setAngle(angleId: number, color: Array<number>, text: 'string') {
    const angle = this._fig[`_angle${angleId}`];
    const { isShown } = angle;
    console.log(angle.name)
    console.log(angle.isShown)
    angle.setColor(color);
    console.log(angle.isShown)
    angle.label.setText(text);
    console.log(angle.isShown)
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

  // newPageRotation(done: ?() => void = null) {
  //   const line1 = this._fig._line1;
  //   const line2 = this._fig._line2;
  //   const r1 = line1.getRotation();
  //   const r2 = line2.getRotation();
  //   const minAngle = minAngleDiff(r2, r1);
  //   this._fig.stop(true, 'noComplete');
  //   if (Math.abs(minAngle) < 0.3) {
  //     line2.animations.new()
  //       .rotation({ target: 1, duration: 0.5 })
  //       .whenFinished(done)
  //       .start();
  //     line1.animations.new()
  //       .rotation({ target: 0, duration: 0.5 })
  //       .start();
  //   } else if (done != null) {
  //     done();
  //   }
  //   this.diagram.animateNextFrame();
  // }

  // setAngle(angleId: number, color: Array<number>, text: 'string') {
  //   const angle = this._fig[`_angle${angleId}`];
  //   angle.setColor(color);
  //   angle.label.setText(text);
  // }

  // showAngles(angles: Array<DiagramObjectAngle> | DiagramObjectAngle) {
  //   let anglesArray = [];
  //   if (!Array.isArray(angles)) {
  //     anglesArray = [angles];
  //   } else {
  //     anglesArray = angles;
  //   }
  //   const fig = this._fig;
  //   const possible = [fig._angle1, fig._angle2, fig._angle3, fig._angle4];
  //   possible.forEach((angle) => {
  //     if (anglesArray.indexOf(angle) > -1) {
  //       angle.showAll();
  //     } else {
  //       angle.hide();
  //     }
  //   });
  // }

  // toggleAngles() {
  //   if (this._fig._angle1.isShown) {
  //     this.showAngles(this._fig._angle2);
  //   } else if (this._fig._angle2.isShown) {
  //     this.showAngles(this._fig._angle3);
  //   } else if (this._fig._angle3.isShown) {
  //     this.showAngles(this._fig._angle4);
  //   } else if (this._fig._angle4.isShown) {
  //     this.showAngles(this._fig._angle1);
  //   }
  //   this.updateAngles();
  //   this.diagram.animateNextFrame();
  // }

  // updateAngles() {
  //   const line1 = this._fig._line1;
  //   const line2 = this._fig._line2;
  //   const angle1 = this._fig._angle1;
  //   const angle2 = this._fig._angle2;
  //   const angle3 = this._fig._angle3;
  //   const angle4 = this._fig._angle4;

  //   const r1 = line1.getRotation();
  //   const r2 = line2.getRotation();
  //   const minAngle = minAngleDiff(r2, r1);
  //   if (angle1.isShown) {
  //     if (minAngle > 0) {
  //       angle1.setAngle({ rotation: r1, angle: minAngle });
  //     } else {
  //       angle1.setAngle({ rotation: r1, angle: Math.PI - Math.abs(minAngle) });
  //     }
  //   }
  //   if (angle2.isShown) {
  //     if (minAngle > 0) {
  //       angle2.setAngle({
  //         rotation: r1 + Math.PI - (Math.PI - minAngle),
  //         angle: Math.PI - minAngle,
  //       });
  //     } else {
  //       angle2.setAngle({
  //         rotation: r1 + Math.PI - Math.abs(minAngle),
  //         angle: Math.abs(minAngle),
  //       });
  //     }
  //   }
  //   if (angle3.isShown) {
  //     if (minAngle > 0) {
  //       angle3.setAngle({ rotation: r1 + Math.PI, angle: minAngle });
  //     } else {
  //       angle3.setAngle({
  //         rotation: r1 + Math.PI,
  //         angle: Math.PI - Math.abs(minAngle),
  //       });
  //     }
  //   }
  //   if (angle4.isShown) {
  //     if (minAngle > 0) {
  //       angle4.setAngle({
  //         rotation: r1 + 2 * Math.PI - (Math.PI - minAngle),
  //         angle: Math.PI - minAngle,
  //       });
  //     } else {
  //       angle4.setAngle({
  //         rotation: r1 + 2 * Math.PI - Math.abs(minAngle),
  //         angle: Math.abs(minAngle),
  //       });
  //     }
  //   }
  // }
}
