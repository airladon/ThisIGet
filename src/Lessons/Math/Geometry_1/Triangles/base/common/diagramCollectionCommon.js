// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  Transform,
} = Fig;

const { removeRandElement, rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _customTriangle: DiagramObjectPolyLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._customTriangle._pad0.makeTouchable();
  }

  randomCustomTriangle() {
    const { boundary, radius } = this.layout.customTriangle.options.pad;
    const boundaryTop = boundary[1] + boundary[3] - radius;
    const boundaryRight = boundary[0] + boundary[2] - radius;
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.3, boundaryRight);
      let y = rand(0.3, boundaryTop);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this._customTriangle[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  newCustomTriangle(callback: ?() => void = null) {
    this.randomCustomTriangle();
    this._customTriangle.stop(true, 'noComplete');
    this._customTriangle.animations.new()
      .scenarios({ target: 'next', duration: 1.5 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    this._customTriangle._angle0.pulseScaleNow(1, 1.5);
    this._customTriangle._angle1.pulseScaleNow(1, 1.5);
    this._customTriangle._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  growSides() {
    this._customTriangle._side01.grow(0, 1.5);
    this._customTriangle._side12.grow(0, 1.5);
    this._customTriangle._side20.grow(0, 1.5);
    this.diagram.animateNextFrame();
  }
}
