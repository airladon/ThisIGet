// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, DiagramObjectPolyLine,
  Transform,
} = Fig;

const { rand, randElement } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _congruentTriangles: {
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
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

  rotateTriangle(rotationIn: ?number = null) {
    const { tri2 } = this._congruentTriangles.elements;

    let rotation = rotationIn;
    if (rotation === null) {
      tri2.setRotation(tri2.getRotation('0to360'));
      const direction = randElement([-1, 1]);
      rotation = tri2.getRotation() + direction * rand(Math.PI / 3, Math.PI);
    }

    tri2.stop(true, 'noComplete');
    tri2.animations.new()
      .rotation({ target: rotation, duration: 2, diration: 0 })
      .start();
    this.diagram.animateNextFrame();
  }

  toggleAngles(tri: number, toShowIn: ?boolean = null) {
    const triangle = this._congruentTriangles.elements[`tri${tri}`];
    const { angle0, angle1, angle2 } = triangle.elements;
    let currentShown = false;
    let toShow = toShowIn;
    if (angle0.isShown) {
      currentShown = true;
    }
    if (toShow === null) {
      toShow = !currentShown;
    }
    if (toShow) {
      angle0.showAll();
      angle1.showAll();
      angle2.showAll();
    } else {
      angle0.hide();
      angle1.hide();
      angle2.hide();
    }
    this.diagram.animateNextFrame();
  }

  toggleSides(tri: number, toShowIn: ?boolean = null) {
    const triangle = this._congruentTriangles.elements[`tri${tri}`];
    const { side01, side12, side20 } = triangle.elements;
    let currentShown = false;
    let toShow = toShowIn;
    if (side01.isShown) {
      currentShown = true;
    }
    if (toShow === null) {
      toShow = !currentShown;
    }
    if (toShow) {
      side01.showAll();
      side12.showAll();
      side20.showAll();
    } else {
      side01.hide();
      side12.hide();
      side20.hide();
    }
    this.diagram.animateNextFrame();
  }

  toggleBothSides(toShowIn: ?boolean = null) {
    if (this.isFlipping) {
      this._congruentTriangles._tri2.stop(true, 'complete');
    }
    this.toggleSides(1, toShowIn);
    this.toggleSides(2, toShowIn);
  }

  toggleBothAngles(toShowIn: ?boolean = null) {
    if (this.isFlipping) {
      this._congruentTriangles._tri2.stop(true, 'complete');
    }
    this.toggleAngles(1, toShowIn);
    this.toggleAngles(2, toShowIn);
  }

  flipTriangle() {
    const { tri2 } = this._congruentTriangles.elements;
    const anglesShown = tri2._angle0.isShown;
    const sidesShown = tri2._side01.isShown;
    tri2.hideAll();
    tri2._line.show();
    tri2.stop(true, 'noComplete');
    this.isFlipping = true;
    tri2.animations.new()
      .scenario({ target: 'mirror', duration: 3 })
      .whenFinished(() => {
        tri2.setScaleWithoutMoving(1, 1);
        tri2.updatePoints([tri2.points[2], tri2.points[1], tri2.points[0]]);
        tri2._angle0.label.setText('a');
        tri2._angle2.label.setText('c');
        tri2._side01.label.setText('B');
        tri2._side12.label.setText('A');
        tri2.hideAll();
        tri2._line.show();
        if (anglesShown) {
          tri2._angle0.showAll();
          tri2._angle1.showAll();
          tri2._angle2.showAll();
        }
        if (sidesShown) {
          tri2._side01.showAll();
          tri2._side12.showAll();
          tri2._side20.showAll();
        }
        this.isFlipping = false;
        this.isFlipped = !this.isFlipped;
        console.log('stopped', this.isFlipped)
      })
      .start();
    this.diagram.animateNextFrame();
  }
}
