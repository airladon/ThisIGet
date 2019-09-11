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
const {
  click,
  highlightWord,
} = Fig.tools.html;

export class QRRectangle extends PopupBoxCollection {
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

    const { colors } = this.layout;
    const coll = this._collection;
    const modifiers = {
      opposite: click(coll.toggleOppositeSides, [coll], colors.diagram.action),
      all_angles_equal_to_90: highlightWord('all angles equal to 90º', colors.qrRectangles_angles),
    };
    this.setTitle('Rectangle');
    this.setDescription('A |rectangle| is a quadrangle with |all_angles_equal_to_90|. A rectangle\'s |opposite| sides are |parallel| and |equal| in length.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show();
    const rect = coll._rect;
    rect._left.showAll();
    rect._right.showAll();
    rect._top.showAll();
    rect._bottom.showAll();
    rect._bottomLeft.showAll();
    rect._topLeft.showAll();
    rect._topRight.showAll();
    rect._bottomRight.showAll();
    coll.setScenarios('center');
    coll.setRectLabels('ABAB');
    coll.resetColors();
    this.transformToQRWindow(coll, new Rect(-2, -1, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRSquare extends PopupBoxCollection {
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

    const { colors } = this.layout;
    const modifiers = {
      _90: highlightWord('90º', colors.qrRectangles_angles),
    };
    this.setTitle('Square');
    this.setDescription('A |square| is a rectangle with |all sides equal|. All the angles in a square are |_90| and its opposite sides are |parallel|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show();
    const square = coll._square;
    square.showAll();
    coll.setScenarios('center');
    coll.setRectLabels('ABAB');
    coll.resetColors();
    this.transformToQRWindow(coll, new Rect(-2, -0.9, 4, 2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Rectangle: QRRectangle,
  Square: QRSquare,
});
