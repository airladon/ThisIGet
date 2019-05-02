// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
//   clickWord,
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
      external_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
      exterior_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
      sum_of_the_opposite_angles: click(coll.pulseOppositeAngles, [coll, null], colors.angles),
      side: click(coll.pulseAdjacent, [coll], colors.sides),
      extended_outwards: click(coll.pulseExternalLine, [coll], colors.externalSide),
    };
    this.setTitle('External or Exterior Angle');
    this.setDescription('The |external_angle|, or |exterior_angle| of a triangle is the angle between a |side| and its adjacent side |extended_outwards|, and is |equal| to the |sum_of_the_opposite_angles|.', modifiers);
    this.setLink(details.details.uid);
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

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Main: QRBoilerplate,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();
