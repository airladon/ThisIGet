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
//   highlight,
} = Fig.tools.html;

export default class QRParallelLineDistance extends PopupBoxCollection {
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
    // this.hasTouchableElements = true;

    const coll = this._collection;
    const { colors } = this.layout;

    const modifiers = {
      line_perpendicular: click(
        coll.pulseMiddleLineAndAngles, [coll],
        colors.qrParallelLineDistance_distance,
      ),
      parallel_lines: click(
        coll.pulseParallelLines, [coll, null],
        colors.qrParallelLineDistance_lines,
      ),
    };
    this.setTitle('Parallel Line Distance');
    this.setDescription([
      'The distance between |parallel_lines| is the length of a |line_perpendicular| to both lines, and is |constant| everywhere along the lines.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const coll = this._collection;

    coll.showAll();
    this.transformToQRWindow(coll, new Rect(-2, -1.1, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRParallelLineDistance,
});
