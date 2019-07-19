// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

const { removeRandElement, round, rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  triangle: {
    _line: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _triangle: {
    _line: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  enableUpdate: boolean;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.triangle = this._triangle;
    this.triangle.updatePointsCallback = this.updatePoints.bind(this);
    this.triangle._pad0.makeTouchable();
    // this.hasTouchableElements = true;
  }

  updatePoints() {
    // First put angles inside triangle if outside
    if (this.enableUpdate) {
      if (this.triangle._angle0.label == null) {
        return;
      }
      // $FlowFixMe
      let angle0 = round(this.triangle._angle0.getAngle('deg'), 0);
      // $FlowFixMe
      let angle1 = round(this.triangle._angle1.getAngle('deg'), 0);
      // $FlowFixMe
      let angle2 = round(this.triangle._angle2.getAngle('deg'), 0);
      // $FlowFixMe
      const side01 = round(this.triangle._side01.getLength(), 2);
      // $FlowFixMe
      const side12 = round(this.triangle._side12.getLength(), 2);
      // $FlowFixMe
      const side20 = round(this.triangle._side20.getLength(), 2);

      // Reverse the points if the angles are on the outside
      if (angle0 > 90 && angle1 > 90 && angle2 > 90) {
        this.triangle.reverse = !this.triangle.reverse;
        this.triangle.updatePoints(this.triangle.points, false);
        // $FlowFixMe
        angle0 = round(this.triangle._angle0.getAngle('deg'), 0);
        // $FlowFixMe
        angle1 = round(this.triangle._angle1.getAngle('deg'), 0);
        // $FlowFixMe
        angle2 = round(this.triangle._angle2.getAngle('deg'), 0);
      } else {
        // This is a weird case at the 0/360 transition
        if (angle0 > 180) {
          angle0 = 360 - angle0;
        }
        if (angle1 > 180) {
          angle1 = 360 - angle1;
        }
        if (angle2 > 180) {
          angle2 = 360 - angle2;
        }
      }

      // Hide the angles if the triangle is thin or small enough
      if (
        angle0 > 160 || angle1 > 160 || angle2 > 160
        || angle0 < 15 || angle1 < 15 || angle2 < 15
        || side01 < 0.6 || side12 < 0.6 || side20 < 0.6
      ) {
        this.triangle.hideAngles();
      } else {
        this.triangle.showAngles();
      }

      // $FlowFixMe
      const a0 = parseInt(this.triangle._angle0.label.getText(), 10);
      // $FlowFixMe
      const a1 = parseInt(this.triangle._angle1.label.getText(), 10);
      // $FlowFixMe
      const a2 = parseInt(this.triangle._angle2.label.getText(), 10);
      // $FlowFixMe
      const s01 = parseFloat(this.triangle._side01.label.getText());
      // $FlowFixMe
      const s12 = parseFloat(this.triangle._side12.label.getText());
      // $FlowFixMe
      const s20 = parseFloat(this.triangle._side20.label.getText());

      if (this.triangle._angle0.isShown) {
        // Make angles consistent with 180º
        const tot = round(angle0, 0) + round(angle1, 0) + round(angle2, 0);
        const diff = 180 - tot;
        // If the angles are > 180, then find the closet angle
        // to rounding up and round it up
        // If the angles are < 180 then find the closes angle
        // to round down and round it down
        const options = [angle0, angle1, angle2];
        const remainders = options.map(a => a - Math.floor(a));
        const angles = [this.triangle._angle0, this.triangle._angle1, this.triangle._angle2];

        let indexToChange = -1;
        let newValue = 0;
        if (diff > 0) {
          indexToChange = remainders.reduce(
            (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
            0,
          );
          newValue = Math.ceil(this.triangle[`_angle${indexToChange}`].getAngle('deg'));
        } else if (diff < 0) {
          indexToChange = remainders.reduce(
            (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
            1,
          );
          newValue = Math.floor(this.triangle[`_angle${indexToChange}`].getAngle('deg'));
        }
        [0, 1, 2].forEach((index) => {
          if (index !== indexToChange) {
            if (angles[index].label != null) {
              angles[index].label.showRealAngle = true;
            }
          } else if (angles[index].label != null) {
            angles[index].label.showRealAngle = false;
            angles[index].label.setText(`${newValue}º`);
          }
        });

        // Make sides consistent with equilateral or isosceles
        // const a0 = angle0;
        // const a1 = angle1;
        // const a2 = angle2;
        // const s01 = side01;
        // const s12 = side12;
        // const s20 = side20;
        if (a0 === 60 && a1 === 60 && a2 === 60) {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side12.setLabel(`${s01.toFixed(2)}`);
          this.triangle._side20.setLabel(`${s01.toFixed(2)}`);
        } else if (a0 === a1) {
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side20.setLabel(`${s12.toFixed(2)}`);
          if (s01 === s12) {
            if (side01 - Math.floor(side01) > 0.5) {
              this.triangle._side01.setLabel(`${(s12 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side01.setLabel(`${(s12 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side01.setLabelToRealLength();
          }
        } else if (a0 === a2) {
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side01.setLabel(`${s12.toFixed(2)}`);
          if (s20 === s12) {
            if (side20 - Math.floor(side20) > 0.5) {
              this.triangle._side20.setLabel(`${(s12 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side20.setLabel(`${(s12 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side20.setLabelToRealLength();
          }
        } else if (a1 === a2) {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side20.setLabel(`${s01.toFixed(2)}`);
          if (s12 === s01) {
            if (side12 - Math.floor(side12) > 0.5) {
              this.triangle._side12.setLabel(`${(s01 - 0.01).toFixed(2)}`);
            } else {
              this.triangle._side12.setLabel(`${(s01 + 0.01).toFixed(2)}`);
            }
          } else {
            this.triangle._side12.setLabelToRealLength();
          }
        } else {
          this.triangle._side01.setLabelToRealLength();
          this.triangle._side12.setLabelToRealLength();
          this.triangle._side20.setLabelToRealLength();
        }
      }
    }
  }

  randomTriangle() {
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.8, 2);
      let y = rand(0.8, 1.3);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this.triangle[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }
}
