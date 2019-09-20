// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, DiagramObjectPolyLine,
  DiagramObjectAngle, DiagramObjectLine,
  Transform,
  // Point
} = Fig;

const { rand, randElement } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _congruentTriangles: {
    _tri1: {
      _angle0: DiagramObjectAngle,
      _angle1: DiagramObjectAngle,
      _angle2: DiagramObjectAngle,
      _side01: DiagramObjectLine,
      _side12: DiagramObjectLine,
      _side20: DiagramObjectLine,
    } & DiagramObjectPolyLine;
    _tri2: {
      _angle0: DiagramObjectAngle,
      _angle1: DiagramObjectAngle,
      _angle2: DiagramObjectAngle,
      _side01: DiagramObjectLine,
      _side12: DiagramObjectLine,
      _side20: DiagramObjectLine,
    } & DiagramObjectPolyLine;
  } & DiagramElementCollection;

  isFlipping: boolean;
  isFlipped: boolean;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    const tri2 = this._congruentTriangles._tri2;
    tri2.setTransformCallback = () => {
      const currentShow = tri2._angle0.isShown;
      tri2.updateRotation();
      if (!currentShow) {
        tri2._angle0.hide();
        tri2._angle1.hide();
        tri2._angle2.hide();
      }
    };
    this.isFlipping = false;
    this.isFlipped = false;
  }

  resetTriangle() {
    const { tri2 } = this._congruentTriangles.elements;
    tri2.updatePoints(this.layout.tri2.options.points);
    tri2.setScale(1, 1);
    tri2.setRotation(0);
    tri2._angle0.label.setText('c');
    tri2._angle2.label.setText('a');
    tri2._side01.label.setText('A');
    tri2._side12.label.setText('B');
  }

  rotateTriangle(rotationIn: ?number = null, callback: ?() => void = null) {
    const { tri2 } = this._congruentTriangles.elements;

    let rotation = rotationIn;
    if (rotation === null) {
      tri2.setRotation(tri2.getRotation('0to360'));
      const direction = randElement([-1, 1]);
      rotation = tri2.getRotation() + direction * rand(Math.PI / 3, Math.PI);
    }

    if (this.isFlipping) {
      tri2.stop(true, 'complete');
    } else {
      tri2.stop(true, 'noComplete');
    }
    tri2.animations.new()
      .rotation({ target: rotation, duration: 2, diration: 0 })
      .whenFinished(callback)
      .start();
    this.diagram.animateNextFrame();
  }

  simpleFlip(duration: number, callback: ?() => void = null) {
    const { tri2 } = this._congruentTriangles.elements;
    if (this.isFlipping) {
      tri2.stop(true, 'complete');
    } else {
      tri2.stop(true, 'noComplete');
    }
    tri2.hideAll();
    tri2._line.show();
    const currentScale = tri2.getScale().y;

    this.isFlipping = true;
    tri2.animations.new()
      .scale({ target: [-currentScale, currentScale], duration })
      .whenFinished(() => {
        tri2.setScaleWithoutMoving(currentScale, currentScale);
        tri2.updatePoints([tri2.points[2], tri2.points[1], tri2.points[0]]);
        this.isFlipped = !this.isFlipped;
        if (this.isFlipped) {
          tri2._angle0.label.setText('a');
          tri2._angle2.label.setText('c');
          tri2._side01.label.setText('B');
          tri2._side12.label.setText('A');
          tri2.interactiveLocation = [-0.7, 0.8];
        } else {
          tri2._angle0.label.setText('c');
          tri2._angle2.label.setText('a');
          tri2._side01.label.setText('A');
          tri2._side12.label.setText('B');
          tri2.interactiveLocation = [0.7, 0.8];
        }
        tri2._line.show();
        tri2._angle0.showAll();
        tri2._angle1.showAll();
        tri2._angle2.showAll();
        tri2._side01.showAll();
        tri2._side12.showAll();
        tri2._side20.showAll();
        this.isFlipping = false;
        tri2.updateRotation();
        if (callback != null) {
          callback();
        }
      })
      .start();
    this.diagram.animateNextFrame();
  }
}
