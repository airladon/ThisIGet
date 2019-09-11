// @flow
import * as React from 'react';
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import StaticQR from '../../../../../../js/components/staticQR';
import areaMd from './area.md';
import rectangleMd from './rectangle.md';
import squareMd from './square.md';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  centerH,
} = Fig.tools.html;

export class QRArea extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = diagramLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Area');
    this.setDescription('|Area| is the |amount of space| a shape takes up and is measured in |squared length| units, such as |square meters| normally written as |m<sup>2</sup>|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.7 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const shapes = collection._shapes;
    const unit = collection._unitShape;
    collection.show([
      shapes._circle, shapes._triangle, shapes._square, unit._grid,
    ]);
    collection._areaSquare.showAll();
    collection._areaSquare.showForm('0');
    collection._areaSquare.setScenario('qr');
    collection._areaCircle.showAll();
    collection._areaCircle.showForm('0');
    collection._areaCircle.setScenario('qr');
    collection._areaTriangle.showAll();
    collection._areaTriangle.showForm('0');
    collection._areaTriangle.setScenario('qr');
    this.transformToQRWindow(collection, new Rect(-2.8, -1.1, 5.6, 2.1));
    this.diagram.animateNextFrame();
  }
}

export class QRRectangle extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = diagramLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Rectangle');
    this.setDescription(centerH('The |area of a rectangle| is equal to its |width| multiplied by its |height|.'), modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.7 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    // collection.show();
    const rect = collection._rectangle;
    const eqn = collection._eqn;
    collection.show([
      rect._line, rect._labelWidth, rect._labelHeight, eqn,
    ]);
    eqn.showForm('summaryRect');
    collection.setScenarios('summary');
    this.transformToQRWindow(collection, new Rect(-2.8, -1.1, 5.6, 2.6));
    this.diagram.animateNextFrame();
  }
}

export class QRSquare extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = diagramLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Square');
    this.setDescription('The |area of a square| is equal to its |side length squared|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    // collection.show();
    const square = collection._square;
    const eqn = collection._eqn;
    collection.show([
      square._line, square._labelB1, square._labelB2, eqn,
    ]);
    eqn.showForm('summarySquare');
    collection.setScenarios('summary');
    this.transformToQRWindow(collection, new Rect(-1.5, -1.3, 2.6, 2.6));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  AreaPres: QRArea,
  RectanglePres: QRRectangle,
  SquarePres: QRSquare,
  Area: <StaticQR
    title={'Area'}
    content={areaMd}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  Rectangle: <StaticQR
    title={'Rectangle'}
    content={rectangleMd}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  Square: <StaticQR
    title={'Square'}
    content={squareMd}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
});
