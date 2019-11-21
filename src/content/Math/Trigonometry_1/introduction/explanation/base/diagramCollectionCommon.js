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

const { round } = Fig.tools.math;

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
      this.data = [...Array(count).fill(element), ...this.data.slice(0, this.data.length - count)];
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
    _sine: DiagramObjectPolyLine
  } & DiagramElementCollection;

  lastTime: number;
  signal: Queue;
  timeOut: TimeoutID;
  stationaryTime: number;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this._rotator._line._line.setMovable(true);
    this._rotator._line.setTransformCallback = this.updateRotator.bind(this);
    this.lastTime = new Date().getTime();
    this.signal = new Queue(Array(this.layout.time.length).fill(0));
    this._rotator._sine.beforeDrawCallback = this.updateSine.bind(this);
    // console.log(this.signal.length, this.signal.data.slice(0, 10));
    // this.signal.add(1, 5)
    // console.log(this.signal.length, this.signal.data.slice(0, 10));
  }

  updateRotator() {
    // const p1 = this._rotator._line.p1._dup();
    // console.log(this._rotator._line.getRotation())
    const p = this._rotator._line.getP2();
    if (this._rotator._h.isShown) {
      this._rotator._h.setEndPoints([0, p.y], p);
    }
    if (this._rotator._v.isShown) {
      this._rotator._v.setEndPoints([p.x, 0], p);
    }
    if (this._rotator._sine.isShown) {
      // clearTimeout(this.timeOut);
      // this.timeOut = setTimeout(this.updateSine.bind(this, 'stationary'), 20);
      this.stationaryTime = 0;
      // this.updateSine('movement');
    }
    // this.diagram.animateNextFrame();
  }

  updateSine() {
    // console.log(state, this.stationaryTime);
    if (this.stationaryTime < this.layout.timeDuration) {
      const currentTime = new Date().getTime();
      const delta = Math.min(currentTime - this.lastTime, this.layout.timeDuration * 1000);
      const numSteps = round(delta / 1000 / this.layout.timeStep, 0);
      this.lastTime = currentTime;
      if (numSteps > 0) {
        this.signal.add(this._rotator._v.p2.y, numSteps);
        const newPoints = this.signal.data.map((y, index) => new Point(this.layout.time[index], y));
        this._rotator._sine.updatePoints(newPoints);
      }
      this.stationaryTime += delta / 1000;
      // console.log(this.stationaryTime)
      this.diagram.animateNextFrame();
    }
    // if (state === 'stationary') {
    //   this.stationaryTime += 0.02;
    //   if (this.stationaryTime < this.layout.timeDuration) {
    //     // clearTimeout(this.timeOut);
    //     this.timeOut = setTimeout(this.updateSine.bind(this, 'stationary'), 20);
    //   }
    //   this.diagram.animateNextFrame();
    // }
  }
}
