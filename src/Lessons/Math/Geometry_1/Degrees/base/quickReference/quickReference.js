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
  // highlight,
  // clickWord,
  style,
} = Fig.tools.html;

export default class QRDegrees extends PopupBoxCollection {
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

    const diag = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      full_rotation: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.angles),
      Angle: click(diag.pulseAngle, [diag], colors.angles),
      equal_portions: click(diag.pulseDegrees, [diag], colors.marks),
      lines: click(diag.pulseLines, [diag], colors.lines),
      rotation: click(diag.pushLine, [diag, null, 2, 1, null], colors.angles),
      measured: click(diag.pulseAngleText, [diag], colors.angles),
    };
    this.setTitle('Degrees');
    this.setDescription([
      style({ size: 0.9 }, '|Angle| is the amount of |rotation| between two |lines|.'),
      style({ size: 0.9 }, 'A full rotation can be split into |360| |equal_portions|, called |degrees|.'),
      style({ size: 0.9 }, 'An angle can be |measured| by counting the number of degrees within it.'),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.5, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    // collection.show();
    const circle = collection._circle;
    circle._line1.showAll();
    circle._line2.showAll();
    circle._angle.showAll();
    circle._degrees.showAll();
    circle._angleText.showAll();
    circle._line1.setRotation(1);
    circle._line1.makeTouchable();
    circle.setScenario('qr');
    collection.setAngleMarks('degrees');
    circle._angleText.setScenario('qr');
    collection.updateAngle();
    // const iso = collection;
    // iso.show();
    // collection.transform.updateScale(0.6, 0.6);
    // collection.setPosition(this.layout.position);
    this.transformToQRWindow(collection, new Rect(-2, -1, 4, 2.2));
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
    Main: QRDegrees,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();

