// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import { loadRemote, loadRemoteCSS } from '../../../../../js/tools/misc';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  Transform,
} = Fig;

export default class IsocelesCollection extends CommonDiagramCollection {
  _tri: {
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
  };

  _rect: {
    _tri1: {
      _angle1: DiagramObjectAngle;
      _angle1R: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
      _side12: DiagramObjectLine;
      _side31: DiagramObjectLine;
      _line: DiagramElementPrimative;
      _closeLine: DiagramObjectLine;
    };

    _tri2: {
      _angle1: DiagramObjectAngle;
      _angle1R: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
      _side12: DiagramObjectLine;
      _side31: DiagramObjectLine;
      _line: DiagramElementPrimative;
      _closeLine: DiagramObjectLine;
    };
  };

  _left: {
    _line: DiagramElementPrimative;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
  };

  _right: {
    _line: DiagramElementPrimative;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
  }

  _split: DiagramObjectLine;
  _topPoint: DiagramElementPrimative;
  _midPoint: DiagramElementPrimative;

  _splitLine1: DiagramObjectLine;
  _splitLine2: DiagramObjectLine;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.iso.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.diagram.addElements(this, this.layout.addEquationA);
    this.diagram.addElements(this, this.layout.addEquationB);
    console.log(this);  // eslint-disable-line
    console.log('here', Fig.tools.math.round(6.392234, 2)); // eslint-disable-line
    this.loadJS();
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  loadJS() {
    loadRemoteCSS(
      'areaCSS',
      '/static/dist/Lessons/Math/Geometry_1/Area/quickReference/lesson.css',
      () => {
        loadRemote(
          'areaScript',
          '/static/dist/Lessons/Math/Geometry_1/Area/quickReference/lesson.js',
          () => {
            // eslint-disable-next-line
            const qrArea = new window.quickReference.related_angles.Opposite(this.diagram);
            this.diagram.elements.add('qr', qrArea);
            // qrArea.setFirstTransform();
            // $FlowFixMe
            this.diagram.elements._qr.hideAll();
            // this.diagram.elements.showOnly(this.diagram.elements._qr);
            // this.diagram.elements._qr.show();
            qrArea.show();
          },
        );
      },
    );
  }

  pulseEqualSides() {
    if (this._tri._side23._label != null) {
      this._tri._side23._label.pulseScaleNow(1, 2);
    }
    if (this._tri._side31._label != null) {
      this._tri._side31._label.pulseScaleNow(1, 2);
    }
    this.diagram.animateNextFrame();
  }

  pulseEqualAngles() {
    this._tri._angle1.pulseScaleNow(1, 1.5);
    this._tri._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAngle3() {
    this._tri._angle3.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseTopPoint() {
    this._topPoint.show();
    this._topPoint.pulseScaleNow(1, 100, 0, () => { this._topPoint.hide(); });
    this.diagram.animateNextFrame();
  }

  pulseMidPoint() {
    this._midPoint.show();
    this._midPoint.pulseScaleNow(1, 100, 0, () => { this._midPoint.hide(); });
    this.diagram.animateNextFrame();
  }

  growSplit() {
    this._split.grow(0, 1);
    this.diagram.animateNextFrame();
  }

  pulseRectRightAngles() {
    this._rect._tri1._angle1R.stopAnimatingColor(true, true);
    this._rect._tri2._angle1R.stopAnimatingColor(true, true);
    this._rect._tri1._angle1R.showAll();
    this._rect._tri2._angle1R.showAll();
    this._rect._tri2._angle1R.pulseScaleNow(1, 1.5);
    this._rect._tri2._angle2.pulseScaleNow(1, 1.5);
    this._rect._tri1._angle2.pulseScaleNow(1, 1.5);
    this._rect._tri1._angle1R.pulseScaleNow(1, 1.5, 0, () => {
      this._rect._tri1._angle1R.disolveOut(1);
      this._rect._tri2._angle1R.disolveOut(1);
      this.diagram.animateNextFrame();
    });
    this.diagram.animateNextFrame();
  }

  pulseRectAngles() {
    this._rect._tri1._angle1.pulseScaleNow(1, 1.5);
    this._rect._tri1._angle2.pulseScaleNow(1, 1.5);
    this._rect._tri2._angle1.pulseScaleNow(1, 1.5);
    this._rect._tri2._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseRectHeight() {
    if (this._rect._tri1._side12._label) {
      this._rect._tri1._side12._label.pulseScaleNow(1, 2);
    }
    if (this._rect._tri2._side12._label) {
      this._rect._tri2._side12._label.pulseScaleNow(1, 2);
    }
    this.diagram.animateNextFrame();
  }

  pulseRectTriangles() {
    this._rect._tri1._line.pulseThickNow(1, 1.012, 5);
    this._rect._tri2._line.pulseThickNow(1, 1.012, 5);
    this._rect._tri1._closeLine.pulseWidth();
    this._rect._tri2._closeLine.pulseWidth();
    this.diagram.animateNextFrame();
  }
}
