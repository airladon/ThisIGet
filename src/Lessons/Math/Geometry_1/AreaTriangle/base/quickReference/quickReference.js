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

export default class QRArea extends PopupBoxCollection {
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
    this.setTitle('Area of a Triangle');
    this.setDescription('The area of a triangle is equal to |half its base times its height|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.8, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const area1 = collection._area1;
    const eqn = collection._eqn;
    area1.show([area1._tri, area1._base, area1._height]);
    collection.setScenarios('qr');
    eqn.showForm('10');
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 4, 2.4));
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
    Main: QRArea,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();

