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
  click,
//   highlight,
} = Fig.tools.html;

export default class QRBoilerplate extends PopupBoxCollection {
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

    const coll = this._collection;
    const { colors } = this.layout;
    // const fig = coll._fig;
    const modifiers = {
      external_angle: click(
        coll.pulseExternalAngle, [coll, null],
        colors.qrExternalAngles_externalAngle,
      ),
      exterior_angle: click(
        coll.pulseExternalAngle, [coll, null],
        colors.qrExternalAngles_externalAngle,
      ),
      sum_of_the_opposite_angles: click(
        coll.pulseOppositeAngles, [coll, null],
        colors.qrExternalAngles_angles,
      ),
      side: click(coll.pulseAdjacent, [coll], colors.qrExternalAngles_sides),
      extended_outwards: click(
        coll.pulseExternalLine, [coll],
        colors.qrExternalAngles_externalSide,
      ),
    };
    this.setTitle('External or Exterior Angle');
    this.setDescription('The |external_angle|, or |exterior_angle| of a triangle is the angle between a |side| and its adjacent side |extended_outwards|, and is |equal| to the |sum_of_the_opposite_angles|.', modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.show([
      fig._tri._line, fig._tri._angle0, fig._tri._angle1,
      fig._externalLine, fig._externalAngle,
      fig._adjacent,
    ]);
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Main: QRBoilerplate,
});
