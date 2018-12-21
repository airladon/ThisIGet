// @flow
import Fig from 'figureone';
// import Diagram from '../../../js/diagram/Diagram';

// import {
//   Point, Transform, polarToRect,
// } from '../../../js/diagram/tools/g2';
// import { Equation } from '../../../js/diagram/DiagramElements/Equation/GLEquation';

const {
  Diagram, Point, Transform, EquationLegacy,
} = Fig;
const { polarToRect } = Fig.tools.g2;

export type TypeEquationLabel = {
  eqn: EquationLegacy;
  updateRotation: (number, Point, number, number) => void;
  setText: (string) => {};
  getText: void => string;
  // updateScale: (Point) => void;
};

export default function makeEquationLabel(
  diagram: Diagram,
  labelTextOrEquation: string | EquationLegacy | Array<string> = '',
  color: Array<number>,
) {
  let eqn;
  if (typeof labelTextOrEquation === 'string') {
    eqn = diagram.equation.makeEqn();
    eqn.createElements({ base: labelTextOrEquation }, color);
    eqn.collection.transform = new Transform().scale(1, 1).rotate(0).translate(0, 0);
    eqn.formAlignment.fixTo = new Point(0, 0);
    eqn.formAlignment.hAlign = 'center';
    eqn.formAlignment.vAlign = 'middle';
    eqn.formAlignment.scale = 0.7;
    eqn.addForm('base', ['base']);
    eqn.setCurrentForm('base');
  } else if (labelTextOrEquation instanceof EquationLegacy) {
    eqn = labelTextOrEquation;
  } else {
    eqn = diagram.equation.makeEqn();
    const elements = {};
    labelTextOrEquation.forEach((labelText, index) => {
      elements[`_${index}`] = labelText;
    });
    eqn.createElements(elements, color);
    eqn.collection.transform = new Transform().scale(1, 1).rotate(0).translate(0, 0);
    eqn.formAlignment.fixTo = new Point(0, 0);
    eqn.formAlignment.hAlign = 'center';
    eqn.formAlignment.vAlign = 'middle';
    eqn.formAlignment.scale = 0.7;
    labelTextOrEquation.forEach((labelText, index) => {
      eqn.addForm(`${index}`, [`_${index}`]);
    });
    eqn.setCurrentForm('0');
  }

  function setText(text: string) {
    const form = eqn.getCurrentForm();
    if (form != null) {
      const key = Object.keys(form.elements.elements)[0]; // $FlowFixMe
      const textObject = form.elements[key].drawingObject;
      if (textObject != null) {
        textObject.setText(text);
      }
      form.arrange(
        eqn.formAlignment.scale,
        eqn.formAlignment.hAlign,
        eqn.formAlignment.vAlign,
        eqn.formAlignment.fixTo,
      );
    }
  }

  function getText(): string {
    let textToReturn = '';
    const form = eqn.getCurrentForm();
    if (form != null) {
      const key = Object.keys(form.elements.elements)[0]; // $FlowFixMe
      const textObject = form.elements[key].drawingObject;
      if (textObject != null) {                           // $FlowFixMe
        textToReturn = textObject.text[0].text;
      }
    }
    return textToReturn;
  }

  function updateRotation(
    labelAngle: number,
    position: Point,
    offsetMag: number = 0,
    offsetAngle: number = 0,
  ) {
    if (offsetMag !== 0) {
      let labelWidth = 0;
      let labelHeight = 0;
      const currentForm = eqn.getCurrentForm();
      if (currentForm != null) {
        labelWidth = currentForm.width / 2 + 0.04;
        labelHeight = currentForm.height / 2 + 0.04;
      }
      const a = labelWidth + offsetMag;
      const b = labelHeight + offsetMag;
      const r = a * b / Math.sqrt((b * Math.cos(labelAngle - offsetAngle)) ** 2
        + (a * Math.sin(labelAngle - offsetAngle)) ** 2);
      eqn.collection.setPosition(position.add(polarToRect(r, offsetAngle)));
    } else {
      eqn.collection.setPosition(position);
    }
    eqn.collection.transform.updateRotation(labelAngle);
  }

  const label = {
    eqn,
    updateRotation,
    setText,
    getText,
    // updateScale,
  };

  return label;
}
