// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../details';

import MeasureCollection from '../common/diagramCollectionMeasure';
import RectAreaCollection from '../common/diagramCollectionRect';

const { Transform } = Fig;

export class QRArea extends PopupBoxCollection {
  _collection: MeasureCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      MeasureCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('Area');
    this.setDescription(`
      <p>
      |Area| is the |amount of space a shape takes up| and is measured in squares of some reference size.
      </p>
      <p>
      For example, a reference square might have a side length of |1 meter|, and therefore area would be measured in |square meters| which would normally be written as |m<sup>2</sup>|.
      </p>
    `, modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.4);
    super.show();
    const collection = this._collection;
    collection.show();
    collection._mediumGrid.show();
    collection._squareA.show();
    collection._squareLabelMeters.show();
    collection._circleA.showAll();
    collection._circleLabelMeters.show();
    collection._triangleA.show();
    collection._triLabelMeters.show();
    collection.transform.updateScale(0.5, 0.5);
    collection.setPosition(this.layout.areaPosition);
    this.diagram.animateNextFrame();
  }
}

export class QRRect extends PopupBoxCollection {
  _collection: RectAreaCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      RectAreaCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('Area of a Rectangle');
    this.setDescription(`
      <p>
      The |area of a rectangle| is equal to its |width| times its |height|.
      </p>
    `, modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.5);
    super.show();
    const collection = this._collection;
    collection.show();
    collection._line.show();
    collection._sideWidth.showAll();
    collection._sideHeight.showAll();
    collection.eqns.squareRectEqn.showForm('0');
    collection.transform.updateScale(0.7, 0.7);
    collection.setPosition(this.layout.rectPosition);
    this.diagram.animateNextFrame();
  }
}


export class QRSquare extends PopupBoxCollection {
  _collection: RectAreaCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      RectAreaCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('Area of a Rectangle');
    this.setDescription(`
      <p>
      The |area of a square| is equal to its |side length squared|.
      </p>
    `, modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.5);
    super.show();
    const collection = this._collection;
    collection.show();
    collection._square.show();
    collection._sideSquareA.showAll();
    collection._sideSquareB.showAll();
    collection.eqns.squareRectEqn.showForm('1');
    collection.transform.updateScale(0.7, 0.7);
    collection.setPosition(this.layout.squarePosition);
    this.diagram.animateNextFrame();
  }
}

function abc() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  window.quickReference.area = QRArea;
}

abc();
