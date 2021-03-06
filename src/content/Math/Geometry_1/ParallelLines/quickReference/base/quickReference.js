// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
// } = Fig.tools.html;

export default class QRBoilerplate extends PopupBoxCollection {
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
    this.setTitle('Parallel Lines');
    this.setDescription('Lines are |parallel| if they have the |same rotation| and |do not touch|. Therefore, the lines cannot be on top of each other, and if extended to an infinite length, would never cross. Small arrows are sometimes used to mark lines as parallel.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    const markings = coll._markings;
    markings._l1.showAll();
    markings._l2.showAll();
    markings._l1.setPosition(0, 0.3);
    markings._l2.setPosition(0, -0.4);
    this.transformToQRWindow(coll, new Rect(-2, -0.6, 4, 1.6));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  Main: QRBoilerplate,
});
