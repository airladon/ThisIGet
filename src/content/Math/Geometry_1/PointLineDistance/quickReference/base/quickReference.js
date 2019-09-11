// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
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

export default class QRPointLineDistance extends PopupBoxCollection {
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
      point: click(
        coll.pulsePoints, [coll], colors.qrPointsLineDistance_points,
      ),
      point_: click(
        coll.pulsePointEnd, [coll], colors.qrPointsLineDistance_points,
      ),
      point__: click(
        coll.pulsePoint, [coll], colors.qrPointsLineDistance_points,
      ),
      point___: click(
        coll.pulsePoint, [coll], colors.qrPointsLineDistance_points,
      ),
      line: click(
        coll.pulseLine, [coll], colors.qrPointsLineDistance_lines,
      ),
      line_: click(
        coll.pulseLine, [coll], colors.qrPointsLineDistance_lines,
      ),
      perpendicular_line: click(
        coll.pulsePerpendicularLabel, [coll, null],
        colors.qrPointsLineDistance_distance,
      ),
      point_and_line_end: click(
        coll.pulseDistanceEnd, [coll], colors.qrPointsLineDistance_distance2,
      ),
      line_end: click(coll.pulseEnd, [coll], colors.qrPointsLineDistance_lines),
    };
    this.setTitle('Point Line Distance');
    this.setDescription('The distance between a |point| and a |line| is the |shortest distance|. When the |point_| is closest to a |line_end|, then the distance is between the |point_and_line_end|. When the |point__| is |not closest| to a line end, then the shortest distance is the |perpendicular_line| between |point___| and |line_|. ', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const coll = this._collection;
    const fig = coll._fig;
    fig.setScenario('low');
    collection.showAll();
    this.transformToQRWindow(collection, new Rect(-2, -1.1, 4, 2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRPointLineDistance,
});
