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
  highlight,
//   clickWord,
} = Fig.tools.html;

export default class QREquilateral extends PopupBoxCollection {
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
    // const tri = coll._triangle;
    const { colors } = this.layout;

    const modifiers = {
      three_equal_sides: click(coll.pulseSides, [coll], colors.sides),
      three_equal_angles: click(coll.pulseAngles, [coll, null], colors.angles),
      sides: highlight(colors.sides),
      angles: highlight(colors.angles),
    };
    this.setTitle('');
    this.setDescription([
      'An |equilateral| triangle has |three_equal_sides| and |three_equal_angles|.',
      '|Any| triangle with three equal |sides| |or| three equal |angles| will be an equilateral triangle.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection._triangle.showAll();
    this.transformToQRWindow(collection, new Rect(-1.3, -1, 2.6, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Main: QREquilateral,
});
