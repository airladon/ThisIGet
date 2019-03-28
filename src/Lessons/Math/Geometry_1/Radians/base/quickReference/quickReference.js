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

    const diag = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      radian: click(diag.bendRadius, [diag, null], colors.angles),
      arc_length: click(diag.pulseArc, [diag], colors.arc),
      radius: click(diag.pulseRadius, [diag], colors.lines),
      angle: click(diag.pulseAngle, [diag], colors.angles),
    };
    this.setTitle('Radian');
    this.setDescription([
      'A |radian| is the |angle| where the |arc_length| equals the |radius|.',
      'There are |2π| radians in a circle.',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const circle = collection._circle;
    circle._line1.showAll();
    circle._line2.showAll();
    circle._arc.showAll();
    circle._angle.showAll();
    collection.setAngleMarks('radians');
    circle._line1.setRotation(1.3);
    collection._equation.showForm('arc');
    collection._equation.setScenario('qr');
    circle.setScenario('qr');
    collection.updateAngle();
    circle._line1.makeTouchable();
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

