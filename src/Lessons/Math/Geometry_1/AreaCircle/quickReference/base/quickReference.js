// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.details.uid;
const versionUID = version.details.uid;

const { Transform, Rect } = Fig;
const {
//   click,
  highlight,
//   clickWord,
} = Fig.tools.html;

export default class QRCircleArea extends PopupBoxCollection {
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

    const modifiers = { radius: highlight(layout.colors.radius) };
    this.setTitle('Circle Area');
    this.setDescription('|Circle area| is the product of |π| and the |radius| squared.', modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
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
    this.transformToQRWindow(coll, new Rect(-1.6, -1.4, 3.2, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Main: QRCircleArea,
});
