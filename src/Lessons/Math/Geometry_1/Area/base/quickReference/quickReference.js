// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';

import MeasureCollection from '../common/diagramCollectionMeasure';
import RectAreaCollection from '../common/diagramCollectionRect';

const { Transform, Rect } = Fig;

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
    this.setDiagramSpace({ location: 'top', ySize: 0.7, xSize: 0.5 });
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
    // collection.transform.updateScale(0.5, 0.5);
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 4, 2.4));
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
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    collection._line.show();
    collection._sideWidth.showAll();
    collection._sideHeight.showAll();
    collection.eqns.squareRectEqn.showForm('0');
    // collection.transform.updateScale(0.7, 0.7);
    // collection.setPosition(this.layout.rectPosition);
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 3.6, 2.4));
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
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    collection._square.show();
    collection._sideSquareA.showAll();
    collection._sideSquareB.showAll();
    collection.eqns.squareRectEqn.showForm('1');
    // collection.transform.updateScale(0.7, 0.7);
    // collection.setPosition(this.layout.squarePosition);
    this.transformToQRWindow(collection, new Rect(-1.5, -1.4, 3, 2.4));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Main: QRArea,
    Square: QRSquare,
    Rectangle: QRRect,
  };
}

attachQuickReference();
