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
  style,
  highlight,
  // clickWord,
} = Fig.tools.html;

export default class QRMain extends PopupBoxCollection {
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
      two_equal_angles: click(coll.pulseEqualAngles, [coll], colors.angles),
      two_equal_sides: click(coll.pulseEqualSides, [coll], colors.sides),
      _two_equal_sides: highlight(colors.sides),
      _two_equal_angles: highlight(colors.angles),
      opposite: click(coll.pulseOpposites, [coll], colors.diagram.action),
    };
    this.setTitle('Isosceles Triangle');
    this.setDescription(style({ scale: 1 }, [
      'An |isosceles triangle| has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.',
      'If a triangle has |_two_equal_sides| or |_two_equal_angles|, then it is an |isosceles triangle|.',
    ]), modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'left', xSize: 0.5 });
    super.show();
    const coll = this._collection;
    coll.show();
    const tri = coll._triangle;
    tri._line.show();
    tri._angle0.showAll();
    tri._angle2.showAll();
    tri._side01.showAll();
    tri._side12.showAll();
    // const iso = collection;
    // iso.show();
    coll.transform.updateScale(0.6, 0.6);
    coll.setPosition(this.layout.position);
    this.transformToQRWindow(coll, new Rect(-1.3, -1.4, 2.6, 2.4));
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
    Main: QRMain,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();

