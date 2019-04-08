// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
// eslint-disable-next-line import/no-cycle
import {
  makeAnglesClose, checkElementsForParallel,
} from './tools';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  Transform, normAngleTo90, Point,
} = Fig.tools.g2;

const { DiagramElementCollection, DiagramObjectLine } = Fig;

export default class ParallelCollection extends CommonDiagramCollection {
  layout: Object;
  colors: Object;
  _line1: DiagramObjectLine;
  _line2: DiagramObjectLine;
  _line3: DiagramObjectLine;

  checkForParallel(makeRotationEqual: boolean = false) {
    if (!this._line1 || !this._line2) {
      return;
    }
    const isParallel = checkElementsForParallel(
      this._line1, this._line2,
      makeRotationEqual, this.layout.line.width * 1.1,
    );
    if (isParallel) {
      this._line1.setColor(this.layout.colors.line);
      if (this._line1._midLine) {
        this._line1._midLine.setColor(this.layout.colors.line);
      }
      this._line2.setColor(this.layout.colors.line);
    } else {
      this._line1.setColor(this.layout.colors.disabled);
      this._line2.setColor(this.layout.colors.disabled);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  normalizeAngle(element: DiagramElementCollection, wrap: number = 2 * Math.PI) {
    let angle = element.transform.r();
    if (angle != null) {
      if (angle > wrap) {
        angle -= wrap;
      }
      element.transform.updateRotation(angle);
    }
  }

  makeLine() {
    const lay = this.layout.line;
    const line = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: lay.length.full,
      width: lay.width,
      color: this.layout.colors.line,
    });
    // line.setMultiMovable(0.33, lay.boundary);
    line.setMovable(true, 'centerTranslateEndRotation', 0.33, lay.boundary);
    line.setTransformCallback = (t: Transform) => {
      line.updateMoveTransform(t);
      this.normalizeAngle(line);
      this.checkForParallel();
    };
    return line;
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.diagram = diagram;
    this.layout = layout;
    this.setPosition(this.layout.position);
    this.add('line1', this.makeLine());
    this._line1.setPosition(this.layout.line1.position.x, 0);
    this.add('line2', this.makeLine());
    this._line2.setPosition(this.layout.line2.position.x, 0);

    this.hasTouchableElements = true;
  }

  pulseParallel() {
    this._line1.pulseWidth();
    this._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  normalizeAngleTo90(element: DiagramElementCollection) {
    let angle = element.transform.r();
    if (angle != null) {
      angle = normAngleTo90(angle);
      element.transform.updateRotation(angle);
    }
  }

  scaleLine(scale: number) {
    const scenario = {
      scale: new Point(scale, 1),
    };
    this.moveToScenario(this._line1, scenario, 1);
    this.moveToScenario(this._line2, scenario, 1);
    this.diagram.animateNextFrame();
  }

  rotateLine1ToParallel() {
    this._line1.stop();
    this._line2.stop();
    makeAnglesClose(this._line1, this._line2);

    const r1 = this._line1.transform.r();
    const r2 = this._line2.transform.r();
    const velocity = this._line1.transform.constant(0);
    velocity.updateRotation(2 * Math.PI / 6);
    if (r1 != null && r2 != null) {
      if (checkElementsForParallel(this._line1, this._line2, false, this.layout.line.width * 1.1)) {
        this.pulseParallel();
      } else {
        this._line1.animateRotationTo(r2, 0, velocity, this.pulseParallel.bind(this));
      }
    }
    this.diagram.animateNextFrame();
  }
}
