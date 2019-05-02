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
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.55, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    const fig = collection._fig;
    fig.show([
      fig._tri._line,
      fig._tri._angle0, fig._tri._angle2,
      fig._tri._side01, fig._tri._side12,
    ]);
    fig.setScenarios('qr');
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

