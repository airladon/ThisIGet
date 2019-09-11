// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
// } = Fig.tools.html;

export default class QRArea extends PopupBoxCollection {
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
    this.setTitle('Area of a Triangle');
    this.setDescription('The area of a triangle is equal to |half its base times its height|. The base can be any side, and the |height| is equal to the |perpendicular line between the line on which the base sits and the top| point.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    // collection.show();
    // const area1 = collection._area1;
    const eqn = collection._eqn;
    // area1.show([area1._tri, area1._base, area1._height]);
    const height1 = collection._height1;
    const height2 = collection._height2;
    height1.showAll();
    height2.showAll();
    collection.setScenarios('qr');
    eqn.showForm('10');
    this.transformToQRWindow(collection, new Rect(-3, -1.1, 6, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRArea,
});
