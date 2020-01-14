// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
  Point,
} = Fig;

const { rand, round, randInt } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _line: { _line: DiagramElementPrimitive } & DiagramObjectLine;
    _h: DiagramObjectLine;
    _v: DiagramObjectLine;
    _hypotenuse: { _label: Equation } & DiagramObjectLine;
    _theta: DiagramObjectAngle;
    _right: DiagramObjectAngle;
    // _real: DiagramObjectAngle;
    // _sine: DiagramObjectLine;
    // _sineTheta: { _label: Equation } & DiagramObjectLine;
    _opposite: { _label: Equation } & DiagramObjectLine;
    _arc: DiagramElementPrimitive;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._fig._line.setMovable(true);
    this._fig._line._line.increaseBorderSize();
    this._fig._line.setTransformCallback = this.updateRotation.bind(this);
    // this._fig.hasTouchableElements = true;
  }

  // labelForm(form: string) {
  //   if (this._fig._sineTheta.isShown) {
  //     this._fig._sineTheta._label.showForm(form);
  //   }
  //   if (this._fig._hypotenuse.isShown) {
  //     this._fig._hypotenuse._label.showForm(form);
  //   }
  // }

  gotoSmallAngle() {
    this.gotoRotation(rand(0.1, 0.3), 0.8, null);
  }

  gotoLargeAngle() {
    this.gotoRotation(rand(Math.PI / 2 - 0.3, Math.PI / 2 - 0.1), 0.8, null);
  }

  rotateFrom0To90() {
    this._fig._line.stop();
    this._fig._line.animations.new()
      .rotation({ target: 1 * Math.PI / 180, velocity: 0.5 })
      .rotation({ target: 89 * Math.PI / 180, duration: 10 })
      .delay(0.5)
      .rotation({ target: Math.PI / 3, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  gotoRotation(angle: ?number = null, duration: ?number = 0, done: ?() => void = null) {
    let r = 0;
    if (angle != null) {
      r = angle;
    } else {
      const currentR = this._fig._line.getRotation();
      let direction = 1;
      if (currentR > Math.PI / 4) {
        direction = -1;
      }
      r = currentR + direction * rand(Math.PI / 8, Math.PI / 4 * 0.9);
    }
    if (duration === 0) {
      this._fig._line.setRotation(r);
      if (done != null) {
        done();
      }
    } else {
      this._fig._line.stop();
      let rotationOptions = { target: r, duration };
      if (duration === null) {
        rotationOptions = { target: r, velocity: 2 };
      }
      this._fig._line.animations.new()
        .rotation(rotationOptions)
        .whenFinished(done)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  sweepRotation(done: ?() => void) {
    this.gotoRotation(Math.PI / 180 * 1, 0.5, () => {
      this.gotoRotation(Math.PI / 2, 3, () => {
        this.gotoRotation(Math.PI / 18 * 4, 1, done);
      });
    });
  }

  resetRotation(done: ?() => void = null, duration: number = 0) {
    if (duration === 0) {
      this._fig._line.setLength(this.layout.r);
      this._fig._line.setRotation(Math.PI / 18 * 4);
      if (done != null) {
        done();
      }
    } else {
      const r = this._fig._line.getRotation();
      const l = this._fig._line.getLength();
      const callback = () => {
        if (done != null) {
          done();
        }
      };
      let callback2 = () => {
        if (done != null) {
          done();
        }
      };
      let callback3 = () => {
        if (done != null) {
          done();
        }
      };
      if (r < 0.3 || r > Math.PI / 2 - 0.3) {
        this.gotoRotation(Math.PI / 4, 1, callback);
        callback2 = null;
        callback3 = null;
      }
      if (l !== this.layout.r) {
        this.setLineLength(this.layout.r, true, callback2, false);
        callback3 = null;
      }

      if (callback3 != null) {
        callback3();
      }
    }
  }

  setLineLength(
    length: ?number,
    animate: boolean = false,
    done: ?() => void = null,
    stop: ?boolean = true,
  ) {
    const currentLength = this._fig._line.getLength();
    let newLength;
    if (length == null) {
      const delta = rand(this.layout.r * 0.2, this.layout.r * 0.3);
      newLength = currentLength;
      if (currentLength > this.layout.r * 1.2) {
        newLength -= delta;
      } else {
        newLength += delta;
      }
    } else {
      newLength = length;
    }
    if (newLength === currentLength) {
      this.accent(this._fig._line, done);
      return;
    }
    if (animate === false) {
      this._fig._line.setLength(newLength);
      this.diagram.animateNextFrame();
      if (done != null) {
        done();
      }
      return;
    }
    this._fig._line.animateLengthTo(
      newLength, 1, true, done, this.updateRotation.bind(this), stop,
    );
    this.diagram.animateNextFrame();
    // this.updateRotation();
  }

  updateRotation() {
    // console.log('asdfasdf');
    const theta = this._fig._theta;
    // const angle = this._fig._angle;
    const right = this._fig._right;
    // const real = this._fig._real;
    const complement = this._fig._complement;
    const opp = this._fig._opp;
    // const sineTheta = this._fig._sineTheta;
    // const sine = this._fig._sine;
    const h = this._fig._h;
    const v = this._fig._v;
    const hypotenuse = this._fig._hypotenuse;
    // const opposite = this._fig._opposite;
    const r = this._fig._line.getRotation();
    const deg = round(r * 180 / Math.PI, 0);
    const length = this._fig._line.getLength();
    const oppLabel = this._fig._oppLabel;
    const p2 = new Point(length * Math.cos(r), length * Math.sin(r));
    if (h.isShown) {
      h.setEndPoints([0, 0], [p2.x, 0]);
    }
    if (v.isShown) {
      v.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    }
    if (opp.isShown) {
      opp.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    }
    if (this._fig._mirrorV) {
      this._fig._mirrorV.setEndPoints([p2.x, 0], [p2.x, -p2.y]);
    }

    const opacity = {
      right: 1,
      theta: 1,
      // real: 1,
      // sine: 1,
      // sineTheta: 1,
      // angle: 1,
      opposite: 1,
      complement: 1,
      oppLabel: 1,
    };

    if (p2.y < 0.28 && r >= 0.12) {
      opacity.right = 0;
      opacity.complement = 0;
    } else if (r < 0.12 && r >= 0.05) {
      opacity.right = 0;
      opacity.theta = 0;
      // opacity.real = 0;
      // opacity.sineTheta = 0;
      // opacity.angle = 0;
      opacity.oppLabel = 0;
      opacity.opposite = 0;
      opacity.complement = 0;
    } else if (r < 0.05) {
      // opacity.sine = 0;
      opacity.right = 0;
      opacity.theta = 0;
      // opacity.real = 0;
      // opacity.sineTheta = 0;
      // opacity.angle = 0;
      opacity.oppLabel = 0;
      opacity.opposite = 0;
      opacity.complement = 0;
    } else if (r > Math.PI / 2 * 0.8 && r < Math.PI / 2 * 0.88) {
      opacity.right = 0;
      opacity.complement = 0;
    } else if (r > Math.PI / 2 * 0.88) {
      opacity.right = 0;
      opacity.complement = 0;
      // opacity.real = 0;
      opacity.theta = 0;
      // opacity.angle = 0;
    }
    if (right.isShown) {
      right.setAngle({
        p1: [p2.x, p2.y],
        p2: [p2.x, 0],
        p3: [0, 0],
      });
      right.setOpacity(opacity.right);
    }
    if (this._fig._mirrorLine.isShown) {
      this._fig._mirrorLine.setRotation(-r);
    }

    if (theta.isShown) {
      theta.setAngle({
        p1: [p2.x, 0],
        p2: [0, 0],
        p3: p2,
      });
      theta.setOpacity(opacity.theta);
      theta._label._value.drawingObject.setText(`${deg}º`);
    }
    // if (real.isShown) {
    //   real.setAngle({
    //     p1: [p2.x, 0],
    //     p2: [0, 0],
    //     p3: p2,
    //   });
    //   real.setOpacity(opacity.real);
    // }
    if (complement.isShown) {
      complement.setAngle({
        p1: [0, 0],
        p2,
        p3: [p2.x, 0],
      });
      complement.setOpacity(opacity.complement);
    }
    // if (sineTheta.isShown) {
    //   sineTheta.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    //   sineTheta.setOpacity(opacity.sineTheta);
    // }
    // if (sine.isShown) {
    //   const angle = parseFloat(real.getLabel());
    //   sine.setLabel(`${round(Math.sin(angle / 180 * Math.PI), 3)}`);
    //   sine.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    //   sine.setOpacity(opacity.sine);
    // }
    if (oppLabel.isShown) {      
      oppLabel._label._value.drawingObject.setText(`${round(length / this.layout.r * Math.sin(deg / 180 * Math.PI), 3)}`);
      oppLabel.setEndPoints([p2.x, 0], [p2.x, p2.y]);
      oppLabel.setOpacity(opacity.oppLabel);
    }
    // if (opposite.isShown) {
    //   opposite.setEndPoints([p2.x, 0], [p2.x, p2.y]);
    //   opposite.setOpacity(opacity.opposite);
    // }
    if (hypotenuse.isShown) {
      hypotenuse.setEndPoints([0, 0], p2);
      hypotenuse._label._value.drawingObject.setText(`${round(length / this.layout.r, 2)}`);
    }

    if (this._fig._arc.isShown) {
      let arcAngle = r;
      while (arcAngle > Math.PI * 2) {
        arcAngle -= Math.PI * 2;
      }
      while (arcAngle < 0) {
        arcAngle += Math.PI * 2;
      }
      // console.log(arcAngle * 180 / Math.PI)
      this._fig._arc.setAngleToDraw(arcAngle + 0.005);
    }
    if (this._fig._mirrorArc.isShown) {
      let arcAngle = r;
      while (arcAngle > Math.PI * 2) {
        arcAngle -= Math.PI * 2;
      }
      while (arcAngle < 0) {
        arcAngle += Math.PI * 2;
      }
      // console.log(arcAngle * 180 / Math.PI)
      this._fig._mirrorArc.setAngleToDraw(arcAngle + 0.005);
    }
    // if (length !== this.layout.r) {
    //   hypotenuse._label.setOpacity(0);
    //   sineTheta._label.setOpacity(0);
    //   complement._label.setOpacity(0);
    // } else {
    //   hypotenuse._label.setOpacity(1);
    //   sineTheta._label.setOpacity(opacity.sineTheta);
    //   complement._label.setOpacity(opacity.complement);
    // }
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  showTable(index: number, fadeIn: boolean = true) {
    for (let i = 0; i < index; i += 1) {
      const row = document.getElementById(`id_row${i}`);
      if (row != null) {
        row.classList.remove('angle_table_hide');
      }
    }
    const row = document.getElementById(`id_row${index}`);
    if (row != null) {
      row.classList.remove('angle_table_hide');
      if (fadeIn) {
        row.classList.add('topic__diagram_text_fade_in');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  pulseTable() {
    const angleTable = document.getElementById('angle_table');
    if (angleTable != null) {
      angleTable.classList.remove('topic__diagram_text_pulse');
      // eslint-disable-next-line
      void angleTable.offsetWidth;
      angleTable.classList.add('topic__diagram_text_pulse');
    }
  }
  // measureOpp(angle: number, index: number, done: ?() => void) {
  //   this._fig._line.stop();
  //   this._fig._line.animations.new()
  //     .rotation({ target: angle, duration: 0.5 })
  //     .trigger({
  //       callback: () => {
  //         this.accent(this._fig._sine, null, null);
  //         this.accent(this._fig._real, null, null);
  //         this.diagram.animateNextFrame();
  //       },
  //       duration: 1,
  //     })
  //     .trigger({
  //       callback: this.showTable.bind(this, index, true),
  //       duration: 0.5,
  //     })
  //     .whenFinished(done)
  //     .start();
  //   this.diagram.animateNextFrame();
  // }

  // growTable(done: ?() => void) {
  //   const rows = document.querySelectorAll('.angle_row');
  //   rows.forEach((row) => {
  //     row.classList.add('angle_table_hide');
  //   });
  //   this._fig.stop();
  //   this._fig.animations.new()
  //     // .trigger({
  //     //   callback: this.measureOpp.bind(this, Math.PI / 180 * 0, 0, null),
  //     //   duration: 3,
  //     // })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 10, 0, null),
  //       duration: 2,
  //     })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 20, 1, null),
  //       duration: 2,
  //     })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 30, 2, null),
  //       duration: 2,
  //     })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 40, 3, null),
  //       duration: 2,
  //     })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 50, 4, null),
  //       duration: 2,
  //     })
  //     .trigger({
  //       callback: this.measureOpp.bind(this, Math.PI / 180 * 60, 5, null),
  //       duration: 2,
  //     })
  //     .whenFinished(done)
  //     .start();
  //   this.diagram.animateNextFrame();
  // }

  measureAngles(done: ?() => void = null) {
    // const angles = [0, 1, 2, 3, 43, 44, 45, 46, 47, 90].map(a => round(a * Math.PI / 180, 3));
    // const r = round(this._fig._line.getRotation(), 3);
    // const index = angles.indexOf(r);
    // const newIndex = (index + 1) % 10;
    // this.gotoRotation(angles[newIndex], 1, done);
    this.gotoRotation(null, 1, () => {
      this.accent(this._fig._oppLabel, done);
    });
  }
}
