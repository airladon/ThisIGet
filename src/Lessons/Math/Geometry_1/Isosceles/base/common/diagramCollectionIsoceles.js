// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import { loadRemote, loadRemoteCSS } from '../../../../../../js/tools/misc';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import getLessonIndex from '../../../../index';

const {
  DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  Transform, DiagramElementCollection,
} = Fig;

export default class IsocelesCollection extends CommonDiagramCollection {
  _tri: {
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
    _line: DiagramElementPrimative;
  } & DiagramElementCollection;

  _rect: {
    _tri1: {
      _angle1: DiagramObjectAngle;
      _angle1R: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
      _side12: DiagramObjectLine;
      _side31: DiagramObjectLine;
      _line: DiagramElementPrimative;
      _closeLine: DiagramObjectLine;
    } & DiagramElementCollection;

    _tri2: {
      _angle1: DiagramObjectAngle;
      _angle1R: DiagramObjectAngle;
      _angle2: DiagramObjectAngle;
      _side12: DiagramObjectLine;
      _side31: DiagramObjectLine;
      _line: DiagramElementPrimative;
      _closeLine: DiagramObjectLine;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _left: {
    _line: DiagramElementPrimative;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
  } & DiagramElementCollection;

  _right: {
    _line: DiagramElementPrimative;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
  } & DiagramElementCollection;

  _split: DiagramObjectLine;
  _topPoint: DiagramElementPrimative;
  _midPoint: DiagramElementPrimative;

  _splitLine1: DiagramObjectLine;
  _splitLine2: DiagramObjectLine;
  oppositeAngles: boolean;

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
    this.oppositeAngles = true;
    console.log(this);  // eslint-disable-line
    console.log('here', Fig.tools.math.round(6.392234, 2)); // eslint-disable-line
    // this.loadJS();
    // this.getQR('related_angles', 'Opposite');
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  loadJS() {
    loadRemoteCSS(
      'areaCSS',
      '/static/dist/Lessons/Math/Geometry_1/AdjacentAngles/quickReference/lesson.css',
      () => {
        loadRemote(
          'areaScript',
          '/static/dist/Lessons/Math/Geometry_1/AdjacentAngles/quickReference/lesson.js',
          () => {
            // eslint-disable-next-line
            console.log(window.quickReference)
            const qrArea = new window.quickReference.adjacent_angles.Complementary(this.diagram);
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

  getQR(uid: string, qrid: string) {
    const index = getLessonIndex();
    let jsLink = '';
    let cssLink = '';
    for (let i = 0; i < index.length; i += 1) {
      if (uid === index[i].uid) {
        cssLink = `/static/dist/${index[i].link}/quickReference/lesson.css`;
        jsLink = `/static/dist/${index[i].link}/quickReference/lesson.js`;
        i = index.length;
      }
    }
    if (cssLink !== '') {
      loadRemoteCSS(`${uid}CSS`, cssLink, () => {
        loadRemote(`${uid}Script`, jsLink, () => {
          const qr = new window.quickReference[uid][qrid](this.diagram);
          this.diagram.elements.add(qrid, qr);
          // $FlowFixMe
          this.diagram.elements[`_${qrid}`].hideAll();
          qr.show();
        });
      });
    }
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

  pulseOpposites() {
    if (this.oppositeAngles) {
      this._tri._angle2.pulseScaleNow(1, 1.5);
      if (this._tri._side31._label != null) {
        this._tri._side31._label.pulseScaleNow(1, 2);
      }
    } else {
      this._tri._angle1.pulseScaleNow(1, 1.5);
      if (this._tri._side23._label != null) {
        this._tri._side23._label.pulseScaleNow(1, 2);
      }
    }
    this.oppositeAngles = !this.oppositeAngles;
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
