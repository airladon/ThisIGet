// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';

import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
} = Fig.tools.html;

export default class QRAngle extends PopupBoxCollection {
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

    const diag = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      smaller: click(diag.rotateLine, [diag, 'small'], colors.qrAngles_lessSharp),
      larger: click(diag.rotateLine, [diag, 'large'], colors.qrAngles_moreSharp),
      angle: click(diag.pulseFill, [diag], colors.qrAngles_angles),
      lines: click(diag.pulseLines, [diag], colors.qrAngles_lines),
    };
    this.setTitle('Angle');
    this.setDescription([
      'An |angle| is the corner formed by two |lines|. A |larger| angle is a |less sharp| corner, and a |smaller| angle is a |more sharp| corner.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.show();
    const angle = collection._angle;
    angle._line1.showAll();
    angle._line2.showAll();
    angle._fill.show();
    angle._line1.setRotation(1);
    angle._line1.move.bounds.updateRotation({
      min: Math.PI * 0.05,
      max: Math.PI * 0.95,
    });
    // angle._line1.move.bounds.updateRotation(Math.PI * 0.05);
    angle._line1.makeTouchable();
    this.transformToQRWindow(collection, new Rect(-2, -0.6, 4, 2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  Main: QRAngle,
});
