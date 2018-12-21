// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
// import {
//   Transform, // Rect, Point,
// } from '../../../../../js/diagram/tools/g2';
// import DiagramObjectAngle from '../../../../../js/diagram/DiagramObjects/Angle';
// import { DiagramObjectLine } from '../../../../../js/diagram/DiagramObjects/Line';
// import { joinObjects } from '../../../../../js/tools/tools';
// import {
//   DiagramElementPrimative,
// } from '../../../../../js/diagram/Element';

import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const {
  Transform, DiagramObjectAngle, DiagramObjectLine, DiagramElementPrimative,
} = Fig;

export default class EquilateralCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _tri: {
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _angle3: DiagramObjectAngle;
    _side12: DiagramObjectLine;
    _side23: DiagramObjectLine;
    _side31: DiagramObjectLine;
    _isoLines: DiagramElementPrimative;
  };

  isoOrientation: number;

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.iso.position);
    this.diagram.addElements(this, this.layout.addEquilateralElements);
    this.hasTouchableElements = true;
    this.isoOrientation = 1;
  }

  pulseSides() {
    if (this._tri._side12._label) {
      this._tri._side12._label.pulseScaleNow(1, 2);
    }
    if (this._tri._side23._label) {
      this._tri._side23._label.pulseScaleNow(1, 2);
    }
    if (this._tri._side31._label) {
      this._tri._side31._label.pulseScaleNow(1, 2);
    }
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    this._tri._angle1.pulseScaleNow(1, 1.5);
    this._tri._angle2.pulseScaleNow(1, 1.5);
    this._tri._angle3.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  toggleIsoOrientation(
    orientation: number | null = null,
    showAngle: boolean = false,
  ) {
    if (orientation === null) {
      this.isoOrientation = (this.isoOrientation + 1) % 3;
    } else {
      this.isoOrientation = orientation;
    }

    this._tri._isoLines.stopAnimatingColor(true, true);
    // this._tri._angle1.stopAnimatingColor(true, true);
    // this._tri._angle2.stopAnimatingColor(true, true);
    // this._tri._angle3.stopAnimatingColor(true, true);

    const angle = Math.PI / 3 * 2 * this.isoOrientation;
    this._tri._isoLines.show();
    this._tri._isoLines.transform.updateRotation(angle);
    if (showAngle) {
      if (this.isoOrientation === 0) {
        this._tri._angle1.showAll();
        this._tri._angle2.hide();
        this._tri._angle3.showAll();
        // this._tri._angle1.setColor(this.layout.colors.angles);
        // this._tri._angle2.setColor(this.layout.colors.diagram.disabledDark);
        // this._tri._angle3.setColor(this.layout.colors.angles);
      } else if (this.isoOrientation === 1) {
        this._tri._angle1.showAll();
        this._tri._angle2.showAll();
        this._tri._angle3.hide();
        // this._tri._angle1.setColor(this.layout.colors.angles);
        // this._tri._angle2.setColor(this.layout.colors.angles);
        // this._tri._angle3.setColor(this.layout.colors.diagram.disabledDark);
      } else {
        this._tri._angle1.hide();
        this._tri._angle2.showAll();
        this._tri._angle3.showAll();
        // this._tri._angle1.setColor(this.layout.colors.diagram.disabledDark);
        // this._tri._angle2.setColor(this.layout.colors.angles);
        // this._tri._angle3.setColor(this.layout.colors.angles);
      }
    }

    this._tri._isoLines.pulseThickNow(0.5, 1.02, 5, () => {
      this._tri._isoLines.disolveOutWithDelay(0.5, 1);
      // if (this._tri._angle1.isShown) {
      //   this._tri._angle1.disolveOutWithDelay(0.5, 1);
      // }
      // if (this._tri._angle2.isShown) {
      //   this._tri._angle2.disolveOutWithDelay(0.5, 1);
      // }
      // if (this._tri._angle3.isShown) {
      //   this._tri._angle3.disolveOutWithDelay(0.5, 1);
      // }
    });

    this.diagram.animateNextFrame();
  }
  // pulseEqualSides() {
  //   if (this._tri._side23._label != null) {
  //     this._tri._side23._label.pulseScaleNow(1, 2);
  //   }
  //   if (this._tri._side31._label != null) {
  //     this._tri._side31._label.pulseScaleNow(1, 2);
  //   }
  //   this.diagram.animateNextFrame();
  // }

  // pulseEqualAngles() {
  //   this._tri._angle1.pulseScaleNow(1, 1.5);
  //   this._tri._angle2.pulseScaleNow(1, 1.5);
  //   this.diagram.animateNextFrame();
  // }

  // pulseAngle3() {
  //   this._tri._angle3.pulseScaleNow(1, 1.5);
  //   this.diagram.animateNextFrame();
  // }

  // pulseTopPoint() {
  //   this._topPoint.show();
  //   this._topPoint.pulseScaleNow(1, 100, 0, () => { this._topPoint.hide(); });
  //   this.diagram.animateNextFrame();
  // }

  // pulseMidPoint() {
  //   this._midPoint.show();
  //   this._midPoint.pulseScaleNow(1, 100, 0, () => { this._midPoint.hide(); });
  //   this.diagram.animateNextFrame();
  // }

  // growSplit() {
  //   this._split.grow(0, 1);
  //   this.diagram.animateNextFrame();
  // }

  // pulseRectRightAngles() {
  //   this._rect._tri1._angle1R.stopAnimatingColor(true, true);
  //   this._rect._tri2._angle1R.stopAnimatingColor(true, true);
  //   this._rect._tri1._angle1R.showAll();
  //   this._rect._tri2._angle1R.showAll();
  //   this._rect._tri2._angle1R.pulseScaleNow(1, 1.5);
  //   this._rect._tri2._angle2.pulseScaleNow(1, 1.5);
  //   this._rect._tri1._angle2.pulseScaleNow(1, 1.5);
  //   this._rect._tri1._angle1R.pulseScaleNow(1, 1.5, 0, () => {
  //     this._rect._tri1._angle1R.disolveOut(1);
  //     this._rect._tri2._angle1R.disolveOut(1);
  //     this.diagram.animateNextFrame();
  //   });
  //   this.diagram.animateNextFrame();
  // }

  // pulseRectAngles() {
  //   this._rect._tri1._angle1.pulseScaleNow(1, 1.5);
  //   this._rect._tri1._angle2.pulseScaleNow(1, 1.5);
  //   this._rect._tri2._angle1.pulseScaleNow(1, 1.5);
  //   this._rect._tri2._angle2.pulseScaleNow(1, 1.5);
  //   this.diagram.animateNextFrame();
  // }

  // pulseRectHeight() {
  //   if (this._rect._tri1._side12._label) {
  //     this._rect._tri1._side12._label.pulseScaleNow(1, 2);
  //   }
  //   if (this._rect._tri2._side12._label) {
  //     this._rect._tri2._side12._label.pulseScaleNow(1, 2);
  //   }
  //   this.diagram.animateNextFrame();
  // }

  // pulseRectTriangles() {
  //   this._rect._tri1._line.pulseThickNow(1, 1.012, 5);
  //   this._rect._tri2._line.pulseThickNow(1, 1.012, 5);
  //   this._rect._tri1._closeLine.pulseWidth();
  //   this._rect._tri2._closeLine.pulseWidth();
  //   this.diagram.animateNextFrame();
  // }
}
