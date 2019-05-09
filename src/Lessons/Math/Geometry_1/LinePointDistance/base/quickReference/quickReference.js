// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from './collection';

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
//   clickWord,
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
      point: click(coll.pulsePoints, [coll], colors.points),
      point_: click(coll.pulsePointEnd, [coll], colors.points),
      point__: click(coll.pulsePoint, [coll], colors.points),
      point___: click(coll.pulsePoint, [coll], colors.points),
      line: click(coll.pulseLine, [coll], colors.lines),
      line_: click(coll.pulseLine, [coll], colors.lines),
      perpendicular_line: click(coll.pulsePerpendicularLabel, [coll, null], colors.distance),
      point_and_line_end: click(coll.pulseDistanceEnd, [coll], colors.distance2),
      line_end: click(coll.pulseEnd, [coll], colors.lines),
    };
    this.setTitle('Point Line Distance');
    this.setDescription('The distance between a |point| and a |line| is the |shortest distance|. When the |point_| is closest to a |line_end|, then the distance is between the |point_and_line_end|. When the |point__| is |not closest| to a line end, then the shortest distance is the |perpendicular_line| between |point___| and |line_|. ', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.5, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    const coll = this._collection;
    const fig = coll._fig;
    fig.setScenario('low');
    collection.showAll();
    this.transformToQRWindow(collection, new Rect(-2, -1.3, 4, 2));
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
    Main: QRPointLineDistance,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();

