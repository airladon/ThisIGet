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
const {
//   click,
  highlight,
} = Fig.tools.html;

export default class QRCircleArea extends PopupBoxCollection {
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

    const modifiers = { radius: highlight(layout.colors.radius) };
    this.setTitle('Circle Area');
    this.setDescription('|Circle area| is the product of |π| and the |radius| squared.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.7 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    const fig = coll._fig;
    const polyMost = fig._polyMost;
    const circle = fig._circle;
    const eqn = coll._eqn;
    circle.show();
    polyMost._radius.showAll();
    eqn.setScenario('qr');
    eqn.showForm('14');
    polyMost._radius.setScenario('circle');
    polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
    this.transformToQRWindow(coll, new Rect(-1.6, -1.1, 3.2, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  Main: QRCircleArea,
});
