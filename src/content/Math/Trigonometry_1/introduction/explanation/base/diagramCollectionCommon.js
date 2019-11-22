// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Point,
  Transform,
} = Fig;

const { round, rand, range } = Fig.tools.math;

class Queue {
  data: Array<number>;
  maxLen: number;

  constructor(initialArray) {
    this.data = initialArray;
    this.maxLen = this.data.length;
  }

  add(element, count = 1) {
    if (count === 1) {
      this.data.pop();
      this.data.unshift(element);
    } else if (count < this.maxLen) {
      const newElements = [];
      // Interpolate the points so we don't have steps in the output
      const delta = (this.data[0] - element) / (count);
      for (let i = 0; i < count; i += 1) {
        newElements.push(element + delta * i);
      }
      this.data = [...newElements, ...this.data.slice(0, this.data.length - count)];
    } else {
      this.data = Array(this.maxLen).fill(element);
    }
  }
}

export default class CommonCollection extends CommonDiagramCollection {
  _rotator: {
    _line: { _line: DiagramElementPrimitive } & DiagramObjectLine;
    _h: DiagramObjectLine;
    _v: DiagramObjectLine;
    _sine: DiagramObjectPolyLine;
    _pause: DiagramElementPrimitive;
    _record: DiagramElementPrimitive;
    _x: DiagramElementPrimitive;
    _y: DiagramElementPrimitive;
    _xExtension: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _sineExample: DiagramObjectPolyLine;

  lastTime: number;
  signal: Queue;
  timeOut: TimeoutID;
  stationaryTime: number;
  spin: {
    f: number,
    duration: number,
    initialAngle: number,
  };

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this._rotator._line._line.setMovable(true);
    this._rotator._line._line.increaseBorderSize();
    this._rotator._record.makeTouchable();
    this._rotator._pause.makeTouchable();
    this._rotator._pause.onClick = this.pause.bind(this);
    this._rotator._record.onClick = this.record.bind(this);
    this._rotator._line.setTransformCallback = this.updateRotator.bind(this);
    this.custom.recordState = 'record';
    this.lastTime = new Date().getTime();
    this.signal = new Queue(Array(this.layout.time.length).fill(0));
    this._rotator._sine.beforeDrawCallback = this.updateSine.bind(this);
    this.spin = { f: 1, duration: 1, initialAngle: 0 };
    this.custom.f = 1;
    this.custom.timeSteps = range(0, 5, 0.01);
  }

  pause() {
    this.custom.recordState = 'pause';
    this._rotator._pause.hide();
    this._rotator._record.show();
    this.diagram.animateNextFrame();
  }

  accentRecord() {
    this.record();
    this.pushLine();
  }

  record() {
    if (this.custom.recordState === 'record') {
      return;
    }
    this.custom.recordState = 'record';
    this.stationaryTime = 0;
    this._rotator._pause.show();
    this._rotator._record.hide();
    this.lastTime = new Date().getTime();
    this.diagram.animateNextFrame();
  }

  updateRotator() {
    const p = this._rotator._line.getP2();
    if (this._rotator._h.isShown) {
      this._rotator._h.setEndPoints([0, 0], [p.x, 0]);
    }
    if (this._rotator._v.isShown) {
      this._rotator._v.setEndPoints([p.x, 0], p);
    }
    if (this._rotator._sine.isShown) {
      this.stationaryTime = 0;
    }
  }

  resetSine() {
    const slowDown = 4;
    const yValue = this._rotator._line.getP2().y;
    this.signal = new Queue(Array(this.layout.time.length).fill(yValue));
    const newPoints = this.signal.data.map(
      (y, index) => new Point(this.layout.time[index] / slowDown, y),
    );
    this._rotator._sine.updatePoints(newPoints);
    this.diagram.animateNextFrame();
  }

  updateSine() {
    if (this.custom.recordState === 'pause') {
      return;
    }
    const slowDown = 4;
    if (this.stationaryTime < this.layout.timeDuration) {
      const currentTime = new Date().getTime();
      const delta = Math.min(currentTime - this.lastTime, this.layout.timeDuration * 1000);
      const numSteps = round(delta / 1000 / this.layout.timeStep, 0);
      this.lastTime = currentTime;
      if (numSteps > 0) {
        this.signal.add(this._rotator._v.p2.y, numSteps);
        const newPoints = this.signal.data.map(
          (y, index) => new Point(this.layout.time[index] / slowDown, y),
        );
        this._rotator._sine.updatePoints(newPoints);
      }
      this.stationaryTime += delta / 1000;
      this.diagram.animateNextFrame();
    }
  }

  setFreq(freq: number) {
    if (freq === this.custom.f) {
      return;
    }
    this.custom.f = freq;
    const newPoints = this.custom.timeSteps.map(
      t => new Point(t - 2.5, Math.sin(2 * Math.PI * freq * t)),
    );
    // console.log(newPoints)
    this._sineExample.updatePoints(newPoints);
  }

  stretch(newF: number, pulseScale: number = 1) {
    const start = this.custom.f;
    const target = newF;
    const delta = target - start;
    const velocity = 0.5;
    const duration = Math.abs(delta / velocity);
    let scale = pulseScale;
    if (Math.abs(delta) > 0.1) {
      scale = 1;
    }
    this._sineExample.stop();
    this._sineExample.animations.new()
      .custom({
        duration,
        callback: (p) => {
          this.setFreq(start + delta * p);
        },
      })
      .pulse({ scale, duration: 1 })
      .start();
    this.diagram.animateNextFrame();
  }

  spinNow(f: number, duration: number) {
    this.spin.f = f;
    this.spin.duration = duration;
    this.spin.initialAngle = this._rotator._line.getRotation();
    this._rotator._line.stop();
    this._rotator._line.animations.new()
      .custom({ callback: this.spinner.bind(this), duration })
      .start();
    this.diagram.animateNextFrame();
  }

  spinner(percent: number) {
    const angle = this.spin.initialAngle + 2 * Math.PI * this.spin.f * percent * this.spin.duration;
    this._rotator._line.setRotation(angle);
  }

  pushLine() {
    this.record();
    const line = this._rotator._line;
    const r = line.getRotation();
    line.stop();
    const delta = rand(Math.PI / 3, Math.PI * 3 / 2);
    line.animations.new()
      .rotation({ target: r + delta, duration: 2 })
      .start();
    this.diagram.animateNextFrame();
  }
}
