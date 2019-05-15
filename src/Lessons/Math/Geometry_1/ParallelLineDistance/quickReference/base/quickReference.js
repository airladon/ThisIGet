// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
//   clickWord,
} = Fig.tools.html;

export default class QRParallelLineDistance extends PopupBoxCollection {
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
      line_perpendicular: click(coll.pulseMiddleLineAndAngles, [coll], colors.qrParallelLineDistance_distance),
      parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.qrParallelLineDistance_lines),
    };
    this.setTitle('Parallel Line Distance');
    this.setDescription([
      'The distance between |parallel_lines| is the length of a |line_perpendicular| to both lines, and is |constant| everywhere along the lines.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;

    coll.showAll();
    this.transformToQRWindow(coll, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Main: QRParallelLineDistance,
});
