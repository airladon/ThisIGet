// @flow
import Fig from 'figureone';
// import Diagram from '../../../js/diagram/Diagram';
// import {
//   DiagramElementCollection, DiagramElementPrimative,
// } from '../../../js/diagram/Element';
// import {
//   Transform, Point, Line,
// } from '../../../js/diagram/tools/g2';
// import {
//   roundNum,
// } from '../../../js/diagram/tools/mathtools';
// import { Equation } from '../../../js/diagram/DiagramElements/Equation/GLEquation';
import makeEquationLabel from './equationLabel';
import type { TypeEquationLabel } from './equationLabel';

const {
  Diagram, DiagramElementPrimative, DiagramElementCollection,
  Transform, Point, Line, EquationLegacy,
} = Fig;
const {
  roundNum,
} = Fig.tools.math;

export type TypeAngle = {
  eqn: EquationLegacy;
  _arc: DiagramElementPrimative;
  _label: {
    _base: DiagramElementPrimative;
  } & DiagramElementCollection;
  label: null | {
    radius: number;
  } & TypeEquationLabel;
  curve: DiagramElementPrimative;
  right: DiagramElementPrimative;
  autoRightAngle: boolean;
  radius: number;
  addLabel: (string | EquationLegacy, number) => void;
  updateAngle: (number, number, ?number) => void;
  setLabel: (string) => void;
  showForm: (string) => void;
  setToCorner: (Point, Point, Point) => void;
  autoRightAngle: boolean;
  radius: number;
  showRealAngle: boolean;
  realAngleDecimals: number;
  currentAngle: number;
  updateLabel: (?number) => void;
  updateAngleFromPoints: (Point, Point, Point, ?boolean, ?number, ?number) => void;
} & DiagramElementCollection;

export function makeAngle(
  diagram: Diagram,
  radius: number,
  lineWidth: number,
  sides: number,
  color: Array<number>,
) {
  const curve = diagram.shapes.polygon({
    sides,
    radius,
    width: lineWidth,
    color,
  });
  const right = diagram.shapes.collection();
  const rightLength = radius / Math.sqrt(2);
  right.add('line1', diagram.shapes.horizontalLine(
    new Point(rightLength, 0),
    rightLength + lineWidth / 2, lineWidth,
    Math.PI / 2, color,
  ));
  right.add('line2', diagram.shapes.horizontalLine(
    new Point(0, rightLength),
    rightLength + lineWidth / 2, lineWidth,
    0, color,
  ));

  const arc = curve;
  const angle = diagram.shapes.collection(new Transform()
    .scale(1, 1).rotate(0).translate(0, 0));
  angle.add('arc', arc);
  angle.curve = curve;
  angle.right = right;
  angle.autoRightAngle = false;
  angle.radius = radius + lineWidth / 2;
  angle.label = null;
  angle.showRealAngle = false;
  angle.currentAngle = 0;
  angle.realAngleDecimals = 2;

  angle.addLabel = (labelTextOrEquation: string | EquationLegacy | Array<string> = '', labelRadius: number) => {
    const eqnLabel = makeEquationLabel(diagram, labelTextOrEquation, color);
    angle.label = Object.assign({}, eqnLabel, {
      radius: labelRadius,
      autoHideMag: -1,
    });
    angle.add('label', eqnLabel.eqn.collection);
    angle.showForm();
  };

  angle.updateAngleFromPoints = function updateAngleFromPoints(
    p1: Point,
    p2: Point,
    p3: Point,
    updatePosition: boolean = true,
    labelRotationOffset: number = 0,
    angleToTestRightAngle: number | null = null,
  ) {
    const startLine = new Line(p2, p1);
    const start = startLine.angle();
    const stopLine = new Line(p2, p3);
    const stopAngle = stopLine.angle();
    let size = stopAngle - start;
    if (size < 0) {
      size += Math.PI * 2;
    }
    let angleToTestRightAngleToUse = angleToTestRightAngle;
    if (angleToTestRightAngleToUse == null) {
      angleToTestRightAngleToUse = size;
    }
    angle.updateAngle(
      start, size, labelRotationOffset,
      angleToTestRightAngleToUse,
    );
    if (updatePosition) {
      angle.setPosition(p2);
    }
  };

  angle.updateLabel = function updateLabels(labelRotationOffset: number | null = null) {
    const start = this.transform.r();
    const size = this.currentAngle;
    let labelRot = labelRotationOffset;
    if (labelRot == null) {
      labelRot = angle._label.transform.r();
    }
    if (start != null && labelRot != null) {
      angle.updateAngle(start, size, -labelRot - start);
    }
  };

  angle.updateAngle = function updateAngle(
    start: number,
    size: number,
    labelRotationOffset: number = 0,
    angleToTestRightAngle: number = size,
  ) {
    angle.currentAngle = size;
    if (angle.showRealAngle) {
      const angleText = roundNum(size * 180 / Math.PI, angle.realAngleDecimals).toString();
      angle._label._base.drawingObject.setText(`${angleText}º`);
      angle.label.eqn.reArrangeCurrentForm();
    }
    if (angle.autoRightAngle
      && angleToTestRightAngle >= Math.PI / 2 * 0.995
      && angleToTestRightAngle <= Math.PI / 2 * 1.005
    ) {
      if (angle._arc === angle.curve) {
        angle._arc = angle.right;
        angle.elements.arc = angle.right;
        if (angle.curve.isShown) {
          angle.right.show();
          angle.curve.hide();
        }
        diagram.animateNextFrame();
      }
    } else if (angle._arc === angle.right) {
      angle._arc = angle.curve;
      angle.elements.arc = angle.curve;
      if (angle.right.isShown) {
        angle.curve.show();
        angle.right.hide();
      }
      diagram.animateNextFrame();
    }
    angle._arc.angleToDraw = size;
    angle.transform.updateRotation(start);
    if (angle.label) {
      const labelPosition = new Point(0, 0);
      angle.label.updateRotation(
        -start - labelRotationOffset,
        labelPosition,
        angle.label.radius,
        size / 2,
      );
      if (Math.abs(size) < angle.label.autoHideMag) {
        angle._label.hide();
      } else {
        angle._label.show();
      }
    }
  };

  angle.setLabel = (newLabel: string) => {
    if (angle._label._base) {
      angle.label.setText(newLabel);
    }
  };

  angle.showForm = (form: string = 'base') => {
    angle.label.eqn.showForm(form);
    const start = angle.transform.r();
    const size = angle._arc.angleToDraw;
    if (start != null) {
      angle.updateAngle(start, size);
    }
  };

  angle.setToCorner = (p: Point, q: Point, r: Point) => {
    angle.setPosition(q);
    const angleQP = p.sub(q).toPolar().angle;
    const angleQR = r.sub(q).toPolar().angle;
    let delta = angleQR - angleQP;
    if (delta < 0) {
      delta = Math.PI * 2 + delta;
    }
    angle.updateAngle(angleQP, delta);
  };
  return angle;
}

export function showAngles(
  allAngles: Array<DiagramElementCollection | DiagramElementPrimative>,
  angles: Array<[TypeAngle, string, Array<number>]
          | [TypeAngle, string, Array<number>, boolean]>,
  showOnly: boolean = true,
) {
  if (showOnly) {
    const anglesToShow = angles.map(angle => angle[0]);
    const anglesToHide = allAngles.filter(angle => anglesToShow.indexOf(angle) === -1);
    anglesToHide.forEach((angle) => {
      angle.hide();
    });
  }
  angles.forEach((angle) => {
    const [element, form, color] = angle;
    if (element.label) {
      element.label.eqn.showForm(form);
    }
    element.show();
    element._arc.show();
    element.setColor(color);

    if (angle.length === 4) {
      // $FlowFixMe
      if (angle[3]) {
        element.pulseScaleNow(1, 1.2);
      }
    }
  });
}
