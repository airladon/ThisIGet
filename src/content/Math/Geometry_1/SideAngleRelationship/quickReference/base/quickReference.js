// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import QRCollection from './collection';
import details from '../../details';
import version from './version';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
} = Fig.tools.html;

export default class QRSideAngleRelationship extends PopupBoxCollection {
  _collection: QRCollection;

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
      QRCollection,
    );
    this.hasTouchableElements = true;

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      Angles_opposite_longer_sides: click(coll.pulseLargestSideAngle, [coll], colors.angles),
      angles_opposite_shorter_sides: click(coll.pulseSmallestSideAngle, [coll], colors.angles),
      sides_opposite_larger_angles: click(coll.pulseLargestSideAngle, [coll], colors.sides),
      sides_opposite_smaller_angles: click(coll.pulseSmallestSideAngle, [coll], colors.sides),
    };
    this.setTitle('Triangle Angle Side Relationships');
    this.setDescription([
      '|Angles_opposite_longer_sides| will always be |larger| than |angles_opposite_shorter_sides| in the same triangle. Similarly, |sides_opposite_larger_angles| will always be |longer| than |sides_opposite_smaller_angles| in the same triangle.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const fig = collection._fig;
    fig.show([
      fig._tri._line,
      fig._tri._angle0, fig._tri._angle2,
      fig._tri._side01, fig._tri._side12,
    ]);
    fig.setScenarios('qr');
    fig._tri.updateLabels();
    this.transformToQRWindow(collection, new Rect(-2, -1.1, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  Main: QRSideAngleRelationship,
});
