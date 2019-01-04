// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import TriangleAreaCollection from '../common/diagramCollectionTri';

const { Transform } = Fig;

export default class QRTriangleArea extends PopupBoxCollection {
  _collection: TriangleAreaCollection;

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
      TriangleAreaCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('Area of a Triangle');
    this.setDescription('The |area of a triangle| is equal to |half its base times its height|. Any side can be the |base| if the height changes to be relative to the base.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.7);
    super.show();
    const collection = this._collection;
    // collection.showAll();
    collection.show();
    collection._tri2.showAll();
    collection._sideTri2Base.showAll();
    collection._sideTri2Height.showAll();
    collection._tri2AreaEqn.show();
    collection.eqns.tri2AreaEqn.showForm('10');
    collection.transform.updateScale(0.7, 0.7);
    // collection.setPosition(this.layout.position);
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
    Main: QRTriangleArea,
  };
}

attachQuickReference();
