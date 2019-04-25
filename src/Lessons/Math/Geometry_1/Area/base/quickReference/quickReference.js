// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
//   clickWord,
// } = Fig.tools.html;

export class QRArea extends PopupBoxCollection {
  _collection: CommonCollection;

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
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Area');
    this.setDescription('|Area| is the |amount of space| a shape takes up and is measured in |squared length| units, such as |square meters| normally written as |m<sup>2</sup>|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    // collection.show();
    const shapes = collection._shapes;
    const unit = collection._unitShape;
    collection.show([
      shapes._circle, shapes._triangle, shapes._square, unit._grid,
      shapes._triangleHtmlLabel, shapes._squareHtmlLabel,
      shapes._circleHtmlLabel,
    ]);
    this.transformToQRWindow(collection, new Rect(-2.8, -1.2, 5.6, 2.1));
    this.diagram.animateNextFrame();
  }
}

export class QRRectangle extends PopupBoxCollection {
  _collection: CommonCollection;

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
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Rectangle');
    this.setDescription('The |area of a rectangle| is equal to its |width| multiplied by its |height|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.8, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    // collection.show();
    const rect = collection._rectangle;
    const eqn = collection._eqnEqn;
    collection.show([
      rect._line, rect._labelWidth, rect._labelHeight, eqn,
    ]);
    eqn.showForm('summaryRect');
    collection.setScenarios('summary');
    this.transformToQRWindow(collection, new Rect(-2.8, -1.3, 5.6, 2.6));
    this.diagram.animateNextFrame();
  }
}

export class QRSquare extends PopupBoxCollection {
  _collection: CommonCollection;

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
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Square');
    this.setDescription('The |area of a square| is equal to its |side length squared|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'left', xSize: 0.5 });
    super.show();
    const collection = this._collection;
    // collection.show();
    const square = collection._square;
    const eqn = collection._eqnEqn;
    collection.show([
      square._line, square._labelB1, square._labelB2, eqn,
    ]);
    eqn.showForm('summarySquare');
    collection.setScenarios('summary');
    this.transformToQRWindow(collection, new Rect(-1.5, -1.3, 2.6, 2.6));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Area: QRArea,
    Rectangle: QRRectangle,
    Square: QRSquare,
  };
}

attachQuickReference1();

